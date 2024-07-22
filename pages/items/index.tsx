import React from "react";
import style from "./styles.module.scss";
import BestItems from "../../components/ItemPage/BestItems";
import AllItems from "../../components/ItemPage/AllItems";

export default function ItemsPage() {
  return (
    <div className={style.container}>
      <BestItems />
      <AllItems />
    </div>
  );
}
