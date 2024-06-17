import { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { IUser } from '@/interface/interface';

import axios from '@/lib/axios';

interface IAuthContext {
  user: IUser | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}
const initialAuthContext: IAuthContext = {
  user: null,
  login: async () => {},
  logout: () => {},
};
const AuthContext = createContext<IAuthContext>(initialAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: IAuthProvider) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/users/me');
          const user = await response.data;
          setUser(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
          logout();
        }
      };
      fetchUserData();
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post('/auth/signIn', data);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);
      router.push('/board');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      router.push('/');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
