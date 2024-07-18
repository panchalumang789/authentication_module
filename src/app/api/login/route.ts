"use server";
import db from "@/db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const decryptPassword = async (hashedPassword: string, password: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const POST = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();

  const userData = await db.user.findUnique({
    where: { email: body.email },
  });

  if (userData == null) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const password = await decryptPassword(userData.password, body.password);

  if (!password) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const token = jwt.sign(userData, process.env.JWT_SECRET as string);
  cookies().set("token", token);

  return new NextResponse(token, { status: 200 });
};
