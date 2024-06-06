import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ItemPage from "./pages/Items";
import MainPage from "./pages/Main";
import BoardPage from "./pages/Boards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/boards" element={<BoardPage />} />
        <Route path="/items" element={<ItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
