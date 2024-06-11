import "./Header.css";
import { Link } from "react-router-dom";
import PandaIcon from "../../assets/images/Panda-Icon.svg";
const Header = () => {
  return (
    <>
      <div className="container">
        <div className="leftLinks">
          <Link className="link toHome" to="/">
            <img className="pandaIcon" src={PandaIcon} alt="Panda Icon" />
            <h1 className="pandaMarket">판다마켓</h1>
          </Link>

          <div className="bannerLink">
            <Link className="link linkTo community" to="community">
              자유게시판
            </Link>
            <Link className="link linkTo items" to="items">
              중고마켓
            </Link>
          </div>
        </div>

        <div className="loginButton">
          <Link className="link login" to="login">
            로그인
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
