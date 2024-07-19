import axios, { AxiosRequestConfig } from "axios";
// git push origin Next.js-김민재-sprint10  실수하지않을려고 push config설정 안했는데 브랜치이름 너무 치기어려워서 넣었습니다.
const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://panda-market-api.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
