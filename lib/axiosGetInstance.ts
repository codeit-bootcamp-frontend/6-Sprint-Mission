import axios from "axios";

const axiosGetInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default axiosGetInstance;
