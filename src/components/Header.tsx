import { useEffect, useState } from "react";
import logo_text from "../assets/logo_text.png";
import logo from "../assets/logo.png";
import icon_profile from "../assets/icon_profile.png";
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLogoutBoxVisible, setIsLogoutBoxVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleProfileClick = () => {
    setIsLogoutBoxVisible(prev => !prev);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setIsLogoutBoxVisible(false);
    navigate("/");
  };

  const goToMain = () => navigate("/");
  const goToSignin = () => navigate("/signin");

  const pathName = location.pathname;

  return (
    <div className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 py-0 lg:px-12 lg:py-4">
      <div className="flex items-center gap-4">
        <div
          onClick={goToMain}
          className="flex cursor-pointer items-center"
        >
          <picture>
            <source
              srcSet={logo_text.src}
              media="(max-width: 768px)"
              width={81}
              height={40}
            />
            <img src={logo} alt="로고" width={153} />
          </picture>
        </div>
        {accessToken && (
          <nav className="flex gap-2 text-lg font-bold md:gap-8">
            <Link
              to="/boards"
              className={`hover:text-main ${
                pathName.includes("/boards") || pathName.includes("/addBoards") ? "text-blue-500" : ""
              }`}
            >
              자유게시판
            </Link>
            <Link
              to="/items"
              className={`hover:text-main ${pathName === "/items" ? "text-main" : ""}`}
            >
              중고마켓
            </Link>
          </nav>
        )}
      </div>
      {accessToken && (
        <img
          src={icon_profile}
          alt="프로필"
          width={48}
          height={48}
          onClick={handleProfileClick}
          className="cursor-pointer"
        />
      )}
      {isLogoutBoxVisible && (
        <div className="absolute right-5 top-14 z-50 rounded-lg bg-white px-4 py-2 shadow-md lg:right-12 lg:top-16">
          <button className="text-gray-700 hover:text-main" onClick={logout}>
            로그아웃
          </button>
        </div>
      )}
      {!accessToken && (
        <button
          id="btn_small"
          onClick={goToSignin}
          className="inline-flex items-center justify-center rounded-md bg-main px-6 py-2 text-white hover:bg-btn-2"
        >
          로그인
        </button>
      )}
    </div>
  );
}
