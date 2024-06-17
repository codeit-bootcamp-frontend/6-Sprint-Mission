import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
