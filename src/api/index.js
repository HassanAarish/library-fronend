import axios from "axios";
import createAuthApi from "./authRoutes.js";
import userApi from "./userRoutes.js";
import { baseURL } from "@/constants/data.js";
import orderApi from "./orderRoutes.js";
import createFaqApi from "./faqRoutes.js";
import createBlogApi from "./blogRoutes.js";
import productApi from "./productRoutes.js";

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 1000,
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error?.response?.data?.data?.error ||
        error?.response?.data?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      return Promise.reject(message);
    }
  );

  return {
    ...createAuthApi(api), // Auth APIs
    ...userApi(api), // User APIs
    ...orderApi(api), // Order APIs
    ...productApi(api), // Product APIs
    ...createFaqApi(api), // FAQ APIs
    ...createBlogApi(api), // Blog APIs
  };
};

const apis = createBackendServer(baseURL);

export default apis;
