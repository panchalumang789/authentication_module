"use server";

import { z } from "zod";
import db from "@/db/db";
import bcrypt from "bcrypt";
import { mkdir, writeFile } from "fs/promises";
import { notFound, redirect } from "next/navigation";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { headers } from "next/headers";

const generateHashedPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));

const addSchema = z.object({
  firstname: z.string().min(3, { message: "Enter Valid First Name" }),
  lastname: z.string().min(3, { message: "Enter Valid Last Name" }),
  contactNo: z
    .string()
    .min(10, { message: "Enter Valid Contact No" })
    .max(10, { message: "Enter Valid Contact No" }),
  email: z.string().min(1).email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
  profilePhoto: imageSchema,
});

export async function createUser(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  let profilePhotoPath = null;

  if (data.profilePhoto.size > 0) {
    await mkdir("public/products", { recursive: true });
    profilePhotoPath = `/products/${crypto.randomUUID()}-${
      data.profilePhoto.name
    }`;
    await writeFile(
      `public${profilePhotoPath}`,
      Buffer.from(await data.profilePhoto.arrayBuffer())
    );
  }
  const hashedPassword = await generateHashedPassword(data.password);

  await db.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
      contactNo: data.contactNo,
      profilePhotoPath,
    },
  });

  redirect("/login");
}

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be 8 characters long" });

const confirmPasswordSchema = z
  .string()
  .min(8, { message: "Password must be 8 characters long" });

const updatePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function updatePassword(
  email: string,
  prevState: unknown,
  formData: FormData
) {
  const result = updatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const hashedPassword = await generateHashedPassword(data.newPassword);
  await db.user.update({
    where: { email: email },
    data: { password: hashedPassword },
  });

  redirect("/login");
}
export async function deleteUser(id: string) {
  const product = await db.user.delete({ where: { id } });
  if (product === null) return notFound();
}

const forgotPasswordEmailSchema = z.object({
  email: z.string().min(1).email("This is not a valid email."),
});

export const forgotPassword = async (
  prevState: unknown,
  formData: FormData
) => {
  const headersList = headers();
  const path = headersList.get("referer");
  const result = forgotPasswordEmailSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const userData = await db.user.findUnique({ where: { email: data.email } });

  let transporter = nodemailer.createTransport({
    port: 587,
    host: "mail.mailtest.radixweb.net",
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "testdotnet@mailtest.radixweb.net",
      pass: "Radix@web#8",
    },
  });

  var mailOptions = {
    from: "Forgot Password testdotnet@mailtest.radixweb.net",
    to: data.email,
    subject: "Forgot Password",
    html: `<html>
            <head>
              <title>Forgot Password</title>
            </head>
            <body style="padding: 0; margin: 0">
              <div style="height: 100%; width: 100%; padding: 30px; color: black">
                Forgot Password <a href="${path + "/" + userData?.id}">here</a>
              </div>
            </body>
          </html>`,
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, result: SentMessageInfo): void => {
      if (error) {
        throw new Error(error.message);
      } else {
        console.log(
          "Mail sended successfully to customer.",
          JSON.stringify(result)
        );
      }
    }
  );
};
