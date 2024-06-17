import React from 'react';
import { Link } from 'react-router-dom';
import pandaLogo from '../assets/img/panda_logo.svg';
import '../style/signup.css';
import SignupForm from '../components/Signup/SignupForm';
import SocialLogin from '../components/SocialLogin';

export default function Signup() {
  return (
    <div className="signin-container">
      <div className="signin-logo">
        <Link to="/">
          <img src={pandaLogo} alt="판다마켓" width="396px" />
        </Link>
      </div>
      <SignupForm />
      <SocialLogin />
      <div className="switch-signup">
        이미 회원이신가요? <Link to="/signin">로그인</Link>
      </div>
    </div>
  );
}
