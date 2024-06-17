import React from "react";
import BestMarket from "../components/Market/BestMarket";
import AllMarket from "../components/Market/AllMarket";
import NavBar from "../components/Header";
import "../style/market.css";

export default function MarketPage() {
  return (
    <>
      <NavBar />
      <div className="market">
        <BestMarket />
        <AllMarket />
      </div>
    </>
  );
}
