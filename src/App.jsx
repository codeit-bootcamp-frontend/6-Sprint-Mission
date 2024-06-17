import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import AddItem from './pages/AddItem/AddItem';
import Items from './pages/Items/Items';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="items" element={<Items />} />
        <Route path="additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
