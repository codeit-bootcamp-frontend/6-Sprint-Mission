import postSignin from "@/apis/auth/postSignin";
import postSignup from "@/apis/auth/postSignup";

import { User, UserAccount, UserData } from "@/types/auth";
import { saveTokenToLocalStorage } from "@/utils/localStorageToken";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (userData: UserData) => Promise<void>;
  createAccount: (userData: UserAccount) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  createAccount: async () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = async (userData: UserData): Promise<void> => {
    try {
      const response = await postSignin(userData);
      saveTokenToLocalStorage(response);
      setUser(response.user as User);
      router.push("/");
    } catch (error) {
      alert(`로그인 실패: ${error}`);
      throw error;
    }
  };

  const createAccount = async (userData: UserAccount): Promise<void> => {
    try {
      await postSignup(userData);
      router.push("/signin");
    } catch (error) {
      alert(`회원가입 실패: ${error}`);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, createAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")?.replace(/"/gi, "");
    if (
      (router.pathname === "/signin" || router.pathname === "/signup") &&
      accessToken
    ) {
      router.push("/");
    }
  }, [context.user]);

  return context;
}
export default AuthProvider;
