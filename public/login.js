// import ( useState, useEffect ) from React;
// import { useRouter } from "next/router";
// import Head from "next/head";
import styles from "../styles/style_login.module.css";
import React from "react";
import ReactDom from "react-dom";

// const SignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVerify, setPasswordVerify] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordMismatchError, setPasswordMismatchError] = useState(false);
//   const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
//   const [signinButtonDisabled, setSigninButtonDisabled] = useState(true);

//   useEffect(() => {
//     const emailInput = document.getElementById('email_input');
//     const emailErrorMessage = document.getElementById('emailErrorMessage');
//     const nicknameInput = document.getElementById('nickname');
//     const passwordInput = document.getElementById('pw_input');
//     const passwordErrorMessage = document.getElementById('passwordErrorMessage');
//     const passwordInput2 = document.getElementById('pw_input2');
//     const passwordMismatchMessage = document.getElementById('passwordMismatchError');
//     const loginButton = document.getElementById('loginButton');
//     const signupButton = document.getElementById('signupButton');

//     emailInput.addEventListener('focusout', handleEmailFocusOut);
//     passwordInput.addEventListener('focusout', handlePasswordFocusOut);
//     passwordInput2.addEventListener('input', checkPasswordMatch);

//     loginButton.addEventListener('click', handleLoginClick);
//     signupButton.addEventListener('click', handleSignupClick);
//   }, []);

//   const handleEmailFocusOut = () => {
//     if (!validateEmail(email)) {
//       setEmailError(true);
//     } else {
//       setEmailError(false);
//     }
//     updateLoginButton();
//   };

//   const handlePasswordFocusOut = () => {
//     if (!validatePassword(password)) {
//       setPasswordError(true);
//     } else {
//       setPasswordError(false);
//     }
//     updateLoginButton();
//   };

//   const checkPasswordMatch = () => {
//     if (password!== passwordVerify) {
//       setPasswordMismatchError(true);
//     } else {
//       setPasswordMismatchError(false);
//     }
//     updateSigninButton();
//   };

//   const updateLoginButton = () => {
//     if (email && validateEmail(email) && password && validatePassword(password)) {
//       setLoginButtonDisabled(false);
//     } else {
//       setLoginButtonDisabled(true);
//     }
//   };

//   const updateSignupButton = () => {
//     if (
//       email &&
//       validateEmail(email) &&
//       nickname &&
//       validateNickname(nickname) &&
//       password &&
//       validatePassword(password) &&
//       passwordVerify &&
//       password === passwordVerify
//     ) {
//       setSignupButtonDisabled(false);
//     } else {
//       setSignupButtonDisabled(true);
//     }
//   };

//   const handleLoginClick = () => {
//     window.location.href = './items';
//   };

//   const handleSignupClick = () => {
//     window.location.href = './signup';
//   };

//   const validateEmail = (email) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 8;
//   };

//   const validateNickname = (nickname) => {
//     return nickname.trim()!== '';
//   };

//   const handleSignupClick = () => {
//     axios.post('/auth/signUp',{
//       email,

//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         //Redirect to /login page after successful signup
//         window.location.href='/login';
//       } else {
//         //Handle error case
//         console.error('Signup failed:', data.error);
//       }
//     })
//     .catch(error => {
//       console.error('Error signing up:',error);
//     });
//   };

//   return (
//     <div>
//       {/* Your JSX code here */}
//       <input
//         type="text"
//         id="email_input"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         id="nickname"
//         value={nickname}
//         onChange={(e) => setNickname(e.target.value)}
//       />
//       <input
//         type="password"
//         id="pw_input"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <input
//         type="password"
//         id="pw_input2"
//         value={passwordVerify}
//         onChange={(e) => setPasswordVerify(e.target.value)}
//       />
//       <button id="loginButton" disabled={loginButtonDisabled}>
//         Login
//       </button>
//       <button id="signupButton" disabled={signupButtonDisabled}>
//         Signup
//       </button>
//     </div>
//   );
// };

// export default SignupPage;

function LoginForm() {
  return (
    <form>
      <label htmlFor="email_input">이메일</label>
      <input
        type="email"
        id="email_input"
        className="email_input"
        placeholder="이메일을 입력하세요"
        required
      />
      <p id="emailErrorMessage" className="error_message">
        잘못된 이메일 형식입니다
      </p>
      <label htmlFor="pw_input">비밀번호</label>
      <div className="input-wrapper">
        <input
          type="password"
          id="pw_input"
          className="pw_input"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <img
          src="Image/btn_visibility_off.png"
          alt="비밀번호 숨김"
          className="toggle-password"
        />
      </div>
      <p id="passwordErrorMessage" className="error_message">
        비밀번호를 8자 이상 입력해주세요
      </p>
      <div className="loginButton" id="loginButton" disabled>
        로그인
      </div>
      <div className="easyloginbox">
        <div className="easylogin">간편 로그인하기</div>
        <div className="image">
          <a href="https://www.google.com/">
            <img src="Image/google.png" />
          </a>
          <a href="https://www.kakaocorp.com/page/">
            <img src="Image/kakao.png" />
          </a>
        </div>
      </div>
      <div className="signup">
        <span className="p">판다마켓은 처음이신가요?</span>
        <a href="signup.html">회원가입</a>
      </div>
    </form>
  );
}

ReactDOM.render(<LoginForm />, document.getElementById("loginFormContainer"));
