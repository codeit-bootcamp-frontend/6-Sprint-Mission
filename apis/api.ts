import axios from "axios";
const panda_market_backend_api = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: panda_market_backend_api,
  timeout: 20000,
});
