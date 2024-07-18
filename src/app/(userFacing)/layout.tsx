import { ReactNode } from "react";

import Nav, { NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Dashboard</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
