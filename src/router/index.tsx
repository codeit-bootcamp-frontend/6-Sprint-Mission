import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Items } from "../pages/items";
import { RegisterPage } from "../pages/RegisterPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/login";
import { SignupPage } from "../pages/signup";
import App from "@/app/App";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Items />} />
      <Route path="additem" element={<RegisterPage />} />
      <Route path="items">
        <Route path=":productId" element={<ProductPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>
  )
);
