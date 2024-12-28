import axios from "axios";

const GET = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await axios.get(endpoint, {
      params,
      headers,
    });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("GET request failed:", error);
    throw error.response?.data || error;
  }
};

export default GET;