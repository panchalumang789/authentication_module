"use client";
import { deleteUser } from "@/app/_actions/users";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  id: string;
}

export const DeleteDropDownItem: NextPage<Props> = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUser(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
};
