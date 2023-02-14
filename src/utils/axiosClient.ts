import axios from "axios";
import Cookies from "js-cookie";
import { page } from "./config";

const axiosClient = axios.create({
  baseURL: `${page.apiBaseUrl}`,
  timeout: 2000,
  headers: { token: Cookies.get("token") },
});

export default axiosClient;
