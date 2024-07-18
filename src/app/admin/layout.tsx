import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="container pt-6">{children}</div>
    </>
  );
}
