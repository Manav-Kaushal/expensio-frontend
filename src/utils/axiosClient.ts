import axios from "axios";
import Cookies from "js-cookie";
import { page } from "./config";
import cookies from "next-cookies";
import { getCookie } from "./lib";

const axiosClient = axios.create({
  baseURL: `${page.apiBaseUrl}`,
  timeout: 10000,
  // headers: { token: Cookies.get("token") },
  transformRequest: [
    function (data, headers) {
      const token = getCookie("token");
      if (token) {
        headers.token = token;
      }
      return data;
    },
  ],
});

export default axiosClient;
