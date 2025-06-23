const createAuthApi = (api) => {
  const login = async (formData) => api.post("/auth/login", formData);
  return {
    login,
  };
};

export default createAuthApi;
