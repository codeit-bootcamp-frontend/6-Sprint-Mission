import React from "react";
import NavBar from "../components/Header";
import "../style/additem.css";
import AddItem from "../components/AddItems/AddItem";

export default function ItemPage() {
  return (
    <>
      <NavBar />
      <div className="item-container">
        <AddItem />
      </div>
    </>
  );
}
