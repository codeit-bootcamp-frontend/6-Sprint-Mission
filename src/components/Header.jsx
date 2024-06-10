import { Link, NavLink } from "react-router-dom";
import logo from "../imgs/logo/logo.svg";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue50)" : undefined };
}

function Header() {
  return (
    <header className="shadow-md">
      {" "}
      {/* shadow-md 클래스를 추가하여 그림자 효과 적용 */}
      <div className="flex min-w-[375px] max-w-[1200px] items-center justify-between list-none gap-[8px] text-[18px] font-[700] text-[#4b5563] m-auto px-[24px] py-[15px]">
        <div className="flex gap-[32px]">
          <Link className="w-[153px]" to="/">
            <img src={logo} alt="판다마켓 로고" />
          </Link>
          <div className="flex items-center gap-[24px]">
            <li className="w-[90px] hover:text-[var(--blue50)]">
              <NavLink to="/freeboard" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li className="w-[75px] hover:text-[#3692ff]">
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </div>
        </div>
        <div className="flex">
          <button className="w-[88px] h-[42px] p-[12px 23px] gap-[10px] rounded-md bg-[#3692ff] text-[16px] font-[600] text-[#fff] hover:bg-[var(--blue70)]">
            <Link to="/login">로그인</Link>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
