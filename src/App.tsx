import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "pages/Home";
import Login from "pages/users/Login";
import Signup from "pages/users/Signup";
import FleaMarket from "pages/market/FleaMarket";
import FAQ from "pages/supply/FAQ";
import Privacy from "pages/supply/Privacy";
import FreeBoard from "pages/supply/FreeBoard";
import AddItemPage from "pages/market/AddItem";
import ItemPage from "pages/market/Item";
import useScrollTop from "hooks/useScrollTop";
import GlobalStyle from "styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import EditItemPage from "pages/market/EditItem";

const queryClient = new QueryClient();

export default function App() {
  useScrollTop();

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer autoClose={500} hideProgressBar newestOnTop />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<FleaMarket />} />
          <Route path="/items/:productId" element={<ItemPage />} />
          <Route path="/free-board" element={<FreeBoard />} />
          <Route path="/additem" element={<AddItemPage />} />
          <Route path="/edititem/:productId" element={<EditItemPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </QueryClientProvider>
    </Provider>
  );
}
