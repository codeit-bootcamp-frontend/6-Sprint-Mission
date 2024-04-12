import "./style/Navigation.css";
import Button from "./Button";
import logo from "./assets/logo.png";
function Navigation() {
  const src = logo;
  return (
    <>
      <nav>
        <div id="nav">
          <span>
            <img src={src} alt="logo" />
          </span>
          <li>
            <a href="#">자유게시판</a>
          </li>
          <li>
            <a href="#">중고마켓</a>
          </li>
        </div>
        <Button>로그인</Button>
      </nav>
      <hr />
    </>
  );
}

export default Navigation;
