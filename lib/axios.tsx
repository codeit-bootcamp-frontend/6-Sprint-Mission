import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

export default baseURL;
