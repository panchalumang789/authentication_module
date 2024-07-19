import { NextPage } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const token = cookies().get("token");
  if (token == null) notFound();
  const userData = jwt.decode(token.value) as User | null;
  if (userData == null) notFound();

  return (
    <div className="flex gap-3 items-center">
      Welcome, {userData?.firstname}
      {userData.profilePhotoPath && (
        <Image
          className="rounded-full border aspect-square object-contain"
          src={userData.profilePhotoPath}
          height={100}
          width={100}
          alt={`${userData.firstname} Image`}
        />
      )}
    </div>
  );
};

export default Page;
