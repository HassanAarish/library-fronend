const createAuthApi = (api) => {
  const register = async (body) => api.post("/auth/register", body);

  const verifyOtp = async (body) => api.post("/auth/verify-otp", body);

  const resendOtp = async (body) => api.post("/auth/resend-otp", body);

  const login = async (body) => api.post("/auth/login", body);

  // Unified social sign-in: { provider, token, link? }
  const socialLogin = async (body) => api.post("/auth/social", body);

  // Two-factor authentication
  const twoFactorSetup = async () => api.post("/twofactor/setup");

  const twoFactorEnable = async (body) => api.post("/twofactor/enable", body);

  const twoFactorDisable = async (body) => api.post("/twofactor/disable", body);

  const twoFactorVerify = async (body) => api.post("/twofactor/verify", body);

  const forgotPassword = async (body) => api.post("/auth/forgot-password", body);

  const resetPassword = async (token, body) =>
    api.post(`/auth/reset-password?token=${token}`, body);

  return {
    register,
    verifyOtp,
    resendOtp,
    login,
    socialLogin,
    twoFactorSetup,
    twoFactorEnable,
    twoFactorDisable,
    twoFactorVerify,
    forgotPassword,
    resetPassword,
  };
};

export default createAuthApi;
