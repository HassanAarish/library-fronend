import { postWithFormData } from ".";

const createCommonApi = (api) => {
  const upload = async (formData) =>
    postWithFormData(api, "/user/upload", formData);

  return {
    upload,
  };
};

export default createCommonApi;
