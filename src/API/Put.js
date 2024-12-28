import axios from "axios";

const PUT = async (endpoint, body = {}, headers = {}) => {
  try {
    const response = await axios.put(endpoint, body, { headers });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error.response?.data || error;
  }
};

export default PUT;