import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Header from "./components/Layout/Header";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation Bar */}
      <Header />

      <div className="withHeader">
        <Routes>
          {/* React Router v6부터는 path="/" 대신 간단하게 `index`라고 표기하면 돼요 */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items">
            <Route index element={<MarketPage />} />
            <Route path=":itemId" element={<ItemDetailPage />} />
          </Route>
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
