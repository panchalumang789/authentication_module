import PageHeader from "@/components/PageHeader";
import { NextPage } from "next";
import UsersTable from "./_components/UsersTable";

interface Props {}

const AdminDashboardPage: NextPage<Props> = ({}) => {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Users</PageHeader>
      </div>
      <UsersTable />
    </>
  );
};

export default AdminDashboardPage;
