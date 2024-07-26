import axios from 'axios'

const axiosGetInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default axiosGetInstance
