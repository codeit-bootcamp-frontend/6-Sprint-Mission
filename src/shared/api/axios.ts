import { useUserStore } from "@/app/store";
import { BASE_URL } from "../constants/constants";

import axios, {
  AxiosError,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { postAuthRefreshToken } from "./api";

// 재시도 확인 프로퍼티 설정
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 기본 설정
const baseConfig: CreateAxiosDefaults = {
  baseURL: `${BASE_URL}`,
};

// 쿠키 드러내고 인증 필요없는 인스턴스
export const instanceWithoutInterceptors = axios.create(baseConfig);

// 인증 필요한 인스턴스
export const instance = axios.create({ ...baseConfig, withCredentials: true });

instance.interceptors.request.use(
  // 요청 전에 실행
  function (config) {
    // 토큰 가져오기
    const accessToken = useUserStore.getState().user?.accessToken;

    // 헤더에 토큰 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 설정 반환
    return config;
  },
  // 요청 에러 발생 시 실행
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답 성공 시 실행
  function (response) {
    return response;
  },
  // 응답 에러 발생 시 실행
  async function (error: AxiosError) {
    // 에러 정보 가져오기
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    // 토큰 만료 시 재시도
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // 토큰 재발급
        const response = await postAuthRefreshToken();

        // 토큰 갱신
        useUserStore.setState({
          user: { accessToken: response.accessToken },
        });

        // 헤더에 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

        // 재시도
        return instance(originalRequest);
      } catch (error) {
        // 토큰이 만료되었을 때
        if (error instanceof AxiosError && error.response?.status === 403) {
          // 로그아웃
          useUserStore.getState().logout();
          return;
        }
      }
    }

    return Promise.reject(error);
  }
);
