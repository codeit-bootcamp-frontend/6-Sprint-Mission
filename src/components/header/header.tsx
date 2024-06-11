import { useNavigate } from "react-router-dom";
import "./header.css";
import ImgHomeLogo from "../../assets/logo/img_logo.svg";
import NavItem from "../navitem.tsx";

function Header() {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-container">
        <a href="/" className="header-logo">
          <img src={ImgHomeLogo} alt="Logo" className="header-logo-img" />
        </a>
        <nav className="header-nav">
          <ul className="header-nav-container">
            <NavItem to="/board">자유게시판</NavItem>
            <NavItem to="/items" activePaths={["/items", "/additem"]}>
              중고마켓
            </NavItem>
          </ul>
        </nav>
        <button className="header-login-btn" onClick={handleLoginButtonClick}>
          로그인
        </button>
      </div>
    </div>
  );
}

export default Header;
