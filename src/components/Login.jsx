import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo/logo.svg';
import eyeInvisible from '../assets/images/icons/eye-invisible.svg';
import kakaoLogo from '../assets/images/social/kakao-logo.png';
import googleLogo from '../assets/images/social/google-logo.png';
import '../styles/Global.css';
import '../styles/Auth.css';

function Login() {
  return (
    <div>
      <main className="auth-container">
        <Link
          to="/"
          className="logo-home-link"
          aria-label="홈으로 이동"
        >
          <img
            src={Logo}
            alt="판다마켓 로고"
          />
        </Link>

        <form
          id="loginForm"
          method="post"
        >
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              required
            />
            <span
              id="emailEmptyError"
              className="error-message"
            >
              이메일을 입력해 주세요
            </span>
            <span
              id="emailInvalidError"
              className="error-message"
            >
              잘못된 이메일 형식입니다
            </span>
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 보기"
              >
                <img
                  className="password-toggle-icon"
                  src={eyeInvisible}
                  alt="비밀번호 숨김 상태 아이콘"
                />
              </button>
            </div>
            <span
              id="passwordEmptyError"
              className="error-message"
            >
              비밀번호를 입력해 주세요
            </span>
            <span
              id="passwordInvalidError"
              className="error-message"
            >
              비밀번호를 8자 이상 입력해 주세요
            </span>
          </div>

          <button
            type="submit"
            className="button pill-button full-width"
          >
            로그인
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img
                src={googleLogo}
                alt="구글 로그인"
                width="42"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img
                src={kakaoLogo}
                alt="카카오톡 로그인"
                width="42"
              />
            </a>
          </div>
        </div>

        <div className="auth-switch">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </div>
      </main>

      <script src="scripts/auth.js"></script>
    </div>
  );
}

export default Login;
