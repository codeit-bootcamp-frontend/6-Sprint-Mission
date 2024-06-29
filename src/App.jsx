import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/context/Header";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import ItemsPage from "./pages/ItemsPage";
import ItemsIdPage from "./pages/ItemsIdPage";
import Community from "./pages/Community";
import ItemsAddPage from "./pages/ItemsAddPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":id" element={<ItemsIdPage />} />
          </Route>
          <Route path="community" element={<Community />} />
          <Route path="additems" element={<ItemsAddPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
