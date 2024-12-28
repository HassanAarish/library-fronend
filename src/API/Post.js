import axios from "axios";
import { baseURL } from "../constant/data";

export const POST = async (endpoint, body = {}, headers = {}) => {
  try {
    const response = await axios.post(endpoint, body, { headers });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("POST request failed:", error);
    throw error.response?.data || error;
  }
};

export const register = async (formData) => {
  try {
    const response = await POST(`${baseURL}/auth/register`, formData);
    if (response.success) {
      return response; // Return the data from the response
    }
  } catch (error) {
    console.error("User registration failed:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const verifyOTP = async (formData) => {
  try {
    const response = await POST(`${baseURL}/auth/verify-otp`, formData);
    return response; // Return the data from the response
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await POST(`${baseURL}/auth/forgot-password`, { email });
    return response;
  } catch (error) {
    console.error("Forgot password request failed:", error);
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await POST(`${baseURL}/auth/reset-password/${token}`, {
      password,
    });
    return response;
  } catch (error) {
    console.error("Reset password request failed:", error);
    throw error;
  }
};
