import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Header from "./components/Layout/Header";
import ItemPage from "./pages/ItemPage/ItemPage";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="withHeader">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="items/:productId" element={<ItemPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
