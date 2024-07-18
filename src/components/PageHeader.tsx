import { NextPage } from "next";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {};

const PageHeader: NextPage<Props> = ({ children }) => {
  return <h1 className="text-4xl mb-4">{children}</h1>;
};

export default PageHeader;
