import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Product";
import AddItem from "./AddItem";
import Header from "../component/Header";
import Login from "../component/member/Login";
import NotFound from "./NotFound";
import Join from "../component/member/Join";
import Footer from "../component/Footer";
import HomePage from "./HomePage";
import ProductDetail from "./ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route index element={<HomePage />} />
          <Route path="Product">
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="addItem" element={<AddItem />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
