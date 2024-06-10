import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  timeout: 10000,
});

export default instance;
