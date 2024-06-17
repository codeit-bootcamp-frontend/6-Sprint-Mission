import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import axios from "@/src/lib/axios";
import User from "@/src/interfaces/User.interface";

// 인증 컨텍스트 타입
interface AuthContextType {
  user: User | null;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

// 초기 상태
const initialAuthContext: AuthContextType = {
  user: null,
  signIn: async () => {},
  signOut: () => {},
};

// AuthContext 생성
const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/users/me");
          const user = response.data;
          setUser(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          signOut(); // 사용자 정보를 가져오는데 실패하면 로그아웃 처리
        }
      };

      fetchUserData();
    }
  }, []);

  // 로그인 함수
  const signIn = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post("/auth/signIn", data);
      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(user);

      toast.success("로그인 되었습니다.");
      router.push("/boards");
    } catch (error) {
      toast.error("로그인에 실패했습니다.");
      console.error("Sign-in error:", error);
      throw error; // 상위 컴포넌트에서 에러 처리 가능하도록 throw
    }
  };

  // 로그아웃 함수
  const signOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      toast.success("로그아웃 되었습니다.");
      router.push("/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 사용자 정보 초기화
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
