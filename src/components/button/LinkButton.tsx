import Link from "next/link";
import React, { PropsWithChildren } from "react";
import type { UrlObject } from "url";

interface LinkButtonProps {
  href: string | UrlObject;
}

const LinkButton = ({ children, href }: PropsWithChildren<LinkButtonProps>) => {
  return (
    <Link
      href={href}
      className="py-3 px-[23px] rounded-lg font-semibold bg-blue text-white flex justify-center items-center leading-[1.1]"
    >
      {children}
    </Link>
  );
};

export default LinkButton;
