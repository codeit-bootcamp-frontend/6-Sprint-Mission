import { STORAGE_KEYS } from 'constants/storageKey';
import { useEffect, useState } from 'react';

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.accessToken);
    if (token) setIsLogin(true);
  }, []);

  return isLogin;
};
