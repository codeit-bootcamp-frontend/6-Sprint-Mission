// 최신 Typescript 버전(v5.4.5)은 기존에 설치했던 리액트 프로젝트(CRA)의 react-scripts 패키지 버전에서 서포트되지 않는다는 문제가 있어요.
// 새로운 패키지를 설치할 때, compatibility 이슈가 발생하지는 않는지 확인할 필요가 있어요. 그래서 안정적인 버전을 사용하기 위해 일부러 최신 버전이 아닌 예전 major update 버전을 설치하기도 해요.
// Typescript의 경우엔 약간의 구글링과 각 패키지 문서를 참고해 v4.9.5로 다운그레이드 해주었어요.

// 자바스크립트 파일을 타입스크립트로 점진적으로 변환하는 경우에는 jsx와 tsx 파일을 혼합해서 사용하기 위해서 `tsconfig.json` 파일이 꼭 필요해요.
// 프로젝트의 루트 디렉토리에 `tsconfig.json` 파일을 생성해놓았으니 참고해 주세요!
// + 타입스크립트 파일 내에서 자바스크립트 파일을 불러올 때는 해당 파일의 확장자까지 붙여주세요!

// TypeScript에서는 React 컴포넌트를 사용할 때 React를 명시적으로 import해야 해요. (import React from "react";)
// 만약 매번 React를 import하는 과정이 번거롭다면 `tsconfig.json` 파일에 별도로 `"allowSyntheticDefaultImports": true`를 설정해주는 방법도 있어요.

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Header from "./components/Layout/Header";
import ItemPage from "./pages/ItemPage/ItemPage";
import PolicyPage from "./pages/PolicyPage/PolicyPage";
import FaqPage from "./pages/FaqPage/FaqPage";

// useLocation 훅을 사용하기 위해 router 컴포넌트를 분리했어요.
const MainContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  // 네비게이션바를 숨김 처리하고자 하는 pathname 목록
  const hideHeader = isAuthPage;

  return (
    <>
      {!hideHeader && <Header />}

      <main className={isAuthPage ? "" : "withHeader"}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="items/:productId" element={<ItemPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
          <Route path="privacy" element={<PolicyPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
