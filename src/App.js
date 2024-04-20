import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/LoginPage/SignupPage";
import MarketPage from "./pages/MarketPage/MarketPage";
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
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
