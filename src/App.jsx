import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Faq from './components/Faq';
import Items from './components/Items';
import Login from './components/Login';
import Privacy from './components/Privacy';
import Signup from './components/Signup';
import './styles/Global.css';
import Community from './components/Community';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/faq"
          element={<Faq />}
        />
        <Route
          path="/items"
          element={<Items />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/privacy"
          element={<Privacy />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/community"
          element={<Community />}
        />
      </Routes>
    </Router>
  );
}

export default App;
