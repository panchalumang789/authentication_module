"use server";

import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { mkdir, writeFile } from "fs/promises";

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
  profilePhoto: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function createUser(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await mkdir("public/products", { recursive: true });
  const profilePhotoPath = `/products/${crypto.randomUUID()}-${
    data.profilePhoto.name
  }`;
  await writeFile(
    `public${profilePhotoPath}`,
    Buffer.from(await data.profilePhoto.arrayBuffer())
  );

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
    contactNo: z
      .string()
      .min(10, { message: "Enter Valid Contact No" })
      .max(10, { message: "Enter Valid Contact No" }),
    newPassword: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function updatePassword(prevState: unknown, formData: FormData) {
  const result = updatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const userData = await db.user.findUnique({
    where: { contactNo: data.contactNo },
    select: { firstname: true, lastname: true, contactNo: true, email: true },
  });

  if (userData == null) return notFound();

  const hashedPassword = await generateHashedPassword(data.newPassword);

  await db.user.update({
    where: { contactNo: data.contactNo },
    data: { ...userData, password: hashedPassword },
  });

  redirect("/login");
}
export async function deleteUser(id: string) {
  const product = await db.user.delete({ where: { id } });
  if (product === null) return notFound();
}
