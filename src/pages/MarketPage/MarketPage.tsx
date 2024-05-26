import React from "react";
import BestItemsSection from "./components/BestItemsSection";
import AllItemsSection from "./components/AllItemsSection";
import "./MarketPage.css";

function MarketPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default MarketPage;
