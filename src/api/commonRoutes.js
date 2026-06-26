import { postWithFormData } from ".";

const createCommonApi = (api) => {
  // Multipart upload — formData should append files under the "files" field.
  const upload = async (formData) => postWithFormData(api, "/common/upload", formData);

  // Remove uploaded assets. body: { public_id } or { publicIds: [...] }
  const removeFiles = async (body) => api.post("/common/remove", body);

  return {
    upload,
    removeFiles,
  };
};

export default createCommonApi;
