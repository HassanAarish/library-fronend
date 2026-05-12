const createAuthApi = (api) => {
  const register = async (body) => api.post("/auth/register", body);

  const verifyOtp = async (body) => api.post("/auth/verify-otp", body);

  const login = async (body) => api.post("/auth/login", body);

  const forgotPassword = async (body) =>
    api.post("/auth/forgot-password", body);

  const resetPassword = async (token) =>
    api.post(`/auth/reset-password?token=${token}`);

  return {
    register,
    verifyOtp,
    login,
    forgotPassword,
    resetPassword,
  };
};

export default createAuthApi;
