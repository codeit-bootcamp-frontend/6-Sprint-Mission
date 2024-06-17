import React from "react";
import styles from "@/components/Header.module.scss";
import MenuItems from "@/components/MenuItems";
import { MenuDataProps } from "@/types/menu";

const Menu: React.FC<MenuDataProps> = ({ menuData }) => {
  if (!menuData) return null; // menuData가 없으면 아무것도 렌더링하지 않음
  return (
    <ul className={styles.header_menu}>
      <MenuItems menuData={menuData} />
    </ul>
  );
};

export default Menu;
