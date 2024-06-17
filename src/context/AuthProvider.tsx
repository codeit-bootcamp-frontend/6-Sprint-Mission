import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  children: React.ReactNode;
};

interface User {
  updatedAt: Date;
  createdAt: Date;
  image: string;
  nickname: string;
  id: number;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // updateUser: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const BASE_URL = "https://panda-market-api.vercel.app";

export function AuthProvider({ children }: AuthProps) {
  const [values, setValues] = useState<{
    user: User | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  async function getUser(token: string | null = null) {
    let key;
    if (token) key = token;
    else key = accessToken;

    setValues((prev) => ({
      ...prev,
      isPending: true,
    }));
    let nextUser: User | null = null;
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      if (response.ok) {
        nextUser = await response.json();
      } else if (response.status === 401) {
        return;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setValues((prev) => ({
        ...prev,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { accessToken, refreshToken } = await response.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    await getUser(accessToken);
  }

  async function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setValues((prev) => ({
      ...prev,
      user: null,
    }));
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        // updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean | null = null) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required === null) return;
    if (required && !context.user && !context.isPending) {
      navigate("/signin");
    } else if (!required && context.user && !context.isPending) {
      navigate("/");
    }
  }, [context.user, context.isPending, required, navigate]);

  return context;
}
