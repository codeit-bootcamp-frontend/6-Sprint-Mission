import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/AuthPages/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage/PrivacyPolicy";
import FAQ from "./pages/FAQPage/FAQ";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="privacy" element={<PrivacyPolicy/>} />
          <Route path="faq" element={<FAQ/>} />
          {/* 
            동적 라우팅 (Dynamic Routing)
            - `:` 뒤에 상품 아이디를 `path parameter`로 추가해주어 각 상품의 상세 페이지를 생성할 수 있어요.
            - 해당 페이지의 컴포넌트 내에서 useParams 훅을 이용하면 path parameter의 값을 사용할 수 있어요
          */}
          <Route path="items/:productId" element={<ItemPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Route>
        
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
