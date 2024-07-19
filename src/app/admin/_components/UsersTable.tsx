import db from "@/db/db";
import { NextPage } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./UserActions";
import Image from "next/image";

interface Props {}

const UsersTable: NextPage<Props> = async ({}) => {
  const users = await db.user.findMany({ orderBy: { id: "asc" } });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>E-Mail</TableHead>
          <TableHead>Contact-No</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center gap-2">
              {user.firstname}
              {user.profilePhotoPath && (
                <Image
                  src={user.profilePhotoPath}
                  height={50}
                  width={50}
                  className="aspect-square rounded-full object-contain border"
                  alt={user.firstname}
                />
              )}
            </TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.contactNo}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
