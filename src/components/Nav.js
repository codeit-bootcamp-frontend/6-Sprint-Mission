import "../styles/Navbar.css";
import HomeIcon from "../images/logo/favicon.ico";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  return (
    <nav>
      <ul>
      <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <img src={HomeIcon} alt="판다마켓" />
          </Link>
        </li>
        <li className={location.pathname === "/자유게시판" ? "active" : ""}>
          <Link to="/board">자유게시판</Link>
        </li>
        <li className={location.pathname === "/중고마켓" ? "active" : ""}>
          <Link to="/items">중고마켓</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;