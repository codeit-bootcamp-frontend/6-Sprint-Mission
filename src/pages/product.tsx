import NavBar from "../components/Header";
import React from "react";
import Product from "../components/Product/Product";

export default function ProductPage() {
  return (
    <>
      <NavBar />
      <div className="ProductPage">
        <Product />
      </div>
    </>
  );
}
