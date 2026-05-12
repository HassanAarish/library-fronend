const createUserApi = (api) => {
  const fetchProfile = async () => api.get("/user/profile");

  const updateProfile = async (body) => api.put("/user/profile-update", body);

  const updatePassword = async (body) =>
    api.patch("/user/password-update", body);

  const profilePicture = async (body) =>
    api.patch("/user/profile-picture", body);

  const removeProfilePicture = async (body) =>
    api.delete("/user/remove-profile-picture", body);

  return {
    fetchProfile,
    updateProfile,
    updatePassword,
    profilePicture,
    removeProfilePicture,
  };
};

export default createUserApi;
