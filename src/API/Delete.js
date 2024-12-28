import axios from "axios";

const DELETE = async (endpoint, headers = {}) => {
  try {
    const response = await axios.delete(endpoint, { headers });
    return response.data; // Return the data directly
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error.response?.data || error;
  }
};

export default DELETE;