import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import Faq from "./pages/faq";
import MarketPage from "./pages/market";
import ProductPage from "./pages/product";
import ItemPage from "./pages/items";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Privacy from "./pages/privacy";
import { AuthProvider } from "./context/AuthProvider";

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="items" element={<MarketPage />} />
        <Route path="items/:id" element={<ProductPage />} />
        <Route path="additem" element={<ItemPage />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="faq" element={<Faq />} />
      </Routes>
    </AuthProvider>
  );
}
