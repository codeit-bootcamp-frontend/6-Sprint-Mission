import React from "react";
import Link from "next/link";
import { MenuDataProps } from "@/types/menu";

const MenuItems: React.FC<MenuDataProps> = ({ menuData }) => {
  return (
    <>
      {menuData?.map((item, id) => {
        return (
          <li key={id}>
            <Link href={item.href}>{item.menuName}</Link>
          </li>
        );
      })}
    </>
  );
};

export default MenuItems;
