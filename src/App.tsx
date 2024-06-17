import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./Layout";
import AddItem from "./pages/AddItem/AddItem";
import FreeBoard from "./pages/FreeBoard/FreeBoard";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Items from "./pages/Items/Items";
import { AuthProvider } from "./contexts/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/products/:id" element={<ItemDetail />} />
            <Route path="/freeboard" element={<FreeBoard />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </Providers>
  );
};

export default App;
