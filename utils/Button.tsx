import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  href?: string;
}

export default function LinkButton({ children, href = "/" }: LinkButtonProps) {
  return (
    <Link href={href} className="button">
      {children}
    </Link>
  );
}
