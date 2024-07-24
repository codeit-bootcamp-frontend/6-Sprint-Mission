import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import axiosInstance from '../api/apiClient';
import { pandaLogo } from '../images';

export default function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    const response = await axiosInstance.post('/auth/signIn', {
      email: process.env.REACT_APP_AUTH_EMAIL,
      password: process.env.REACT_APP_AUTH_PASSWORD,
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="border-b bg-white">
      <div className="flex justify-between px-4 py-2.5 sm:px-8 lg:px-48">
        <ul className="flex items-center">
          <li>
            <NavLink to="/" className="flex items-center">
              <img
                src={pandaLogo}
                alt="pandalogo"
                className="hidden sm:block"
              />
              <span className="text-2xl font-bold text-[color:var(--btn-blue1)] sm:ml-1">
                판다마켓
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <span className="ml-4 text-lg font-bold text-[#4B5563] sm:ml-9 sm:text-base lg:ml-12">
                자유게시판
              </span>
            </NavLink>
          </li>
          <li>
            {/* 클릭 시 디자인을 변경하도록 NavLink를 이용하였습니다 */}
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive || location.pathname === '/additem'
                  ? 'text-[color:var(--btn-blue1)]'
                  : 'text-[#4B5563]'
              }
            >
              <span className="ml-2 text-lg font-bold sm:ml-10 sm:text-base lg:ml-10">
                중고마켓
              </span>
            </NavLink>
          </li>
        </ul>
        {isLoggedIn ? (
          <button
            className="rounded-lg bg-[var(--btn-blue1)] px-6 py-3 text-white"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <button
            className="rounded-lg bg-[var(--btn-blue1)] px-6 py-3 text-white"
            onClick={handleLogin}
          >
            로그인
          </button>
        )}
      </div>
    </nav>
  );
}
