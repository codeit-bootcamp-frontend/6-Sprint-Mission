import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MarketPage from "./pages/MarketPage";
import AddItemPage from "./pages/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage";
import Header from "./components/Header";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <BrowserRouter>
      {}
      <Header />

      <div className="withHeader">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<MarketPage />} />
          {}

          <Route path="items/ :productId" element={<ItemPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Routes>
      </div>

      {/* <div className="목록으로 돌아가기"> */}
      {/* <Route path="items" element={<MarketPage />}/> */}
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
