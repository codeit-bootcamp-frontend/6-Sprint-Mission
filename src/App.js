import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UsedMarket from "./pages/MarketPage/MarketPage";
import AddItem from "./pages/AddItemPage/AddItemPage";
import Header from "./components/Header";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Login from "./pages/LoginPage/LoginPage";
import ItemPage from "./pages/ItemPage/ItemPage";

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="/community" element={<CommunityFeedPage />} />
          <Route path="/items" element={<UsedMarket />} />
          <Route path="/items/:productId" element={<ItemPage />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Main;
