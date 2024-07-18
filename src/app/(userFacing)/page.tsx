import { NextPage } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const token = cookies().get("token");
  if (token == null) notFound();
  const userData = jwt.decode(token.value) as User | null;

  return <div>Welcome, {userData?.firstname}</div>;
};

export default Page;
