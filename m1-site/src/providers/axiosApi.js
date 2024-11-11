import axios from "axios";

export const baseURL = true
  ? "http://localhost:3001"
  : "http://192.168.1.24:3001";

const axiosApi = axios.create({
  baseURL: baseURL,
});

axiosApi.defaults.baseURL = baseURL;

export default axiosApi;