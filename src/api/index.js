import axios from "axios";
import createAuthApi from "./authRoutes.js";
import { baseURL } from "@/constants/index.js";
import createCommonApi from "./commonRoutes.js";
import createUserApi from "./userRoutes.js";

export const postWithFormData = async (api, url, formData) => {
  if (!api || typeof api.post !== "function") {
    throw new Error("Invalid Axios instance provided to postWithFormData.");
  }
  return api.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

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
    ...createCommonApi(api), // Common APIs
    ...createAuthApi(api), // Auth APIs
    ...createUserApi(api), // User APIs
  };
};

const apis = createBackendServer(baseURL);

export default apis;
