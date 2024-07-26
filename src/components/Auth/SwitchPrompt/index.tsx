import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

interface AuthSwitchPromptProps {
  type: '로그인' | '회원가입';
}

const AuthSwitchPrompt = ({ type }: AuthSwitchPromptProps) => {
  return (
    <nav>
      {type === '로그인' ? (
        <p className={styles.already}>
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      ) : (
        <p className={styles.already}>
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </p>
      )}
    </nav>
  );
};

export default AuthSwitchPrompt;
