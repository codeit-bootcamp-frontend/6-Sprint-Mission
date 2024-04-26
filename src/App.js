import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import ProductPage from "./pages/MarketPage/ProductPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation Bar */}
      <Header />

      <div className="withHeader">
        <Routes>
          <Route path="/">
            {/* React Router v6부터는 path="/" 대신 간단하게 `index`라고 표기하면 돼요 */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="items">
              <Route index element={<MarketPage />} />
              <Route path=":productsId" element={<ProductPage />} />
            </Route>
            <Route path="additem" element={<AddItemPage />} />
            <Route path="community" element={<CommunityFeedPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
