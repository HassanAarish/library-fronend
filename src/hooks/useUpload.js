import { useMutation } from "@tanstack/react-query";
import apis from "@/api/index";

/**
 * Reusable file upload to the single upload endpoint (POST /common/upload).
 * Centralises the FormData building + response unwrapping so components never
 * repeat that boilerplate.
 *
 * Single File in  → resolves to a single { name, url, public_id }.
 * Array of Files  → resolves to an array of those objects.
 *
 * @param {object} [options] - extra react-query useMutation options (onSuccess…).
 * @returns {{
 *   upload: Function,        // upload(fileOrFiles, { onSuccess }) — callback style
 *   uploadAsync: Function,   // const f = await uploadAsync(file) — promise style
 *   isUploading: boolean,
 *   error: unknown,
 *   reset: Function,
 * }}
 */
const performUpload = async (input) => {
  const files = Array.isArray(input) ? input : [input];
  if (!files.length || !files[0]) throw new Error("No file provided");

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const { data } = await apis.upload(formData);
  const uploaded = data?.data || [];
  if (!uploaded.length) throw new Error("Upload failed");

  // Mirror the input shape: one file → one result, many → array.
  return Array.isArray(input) ? uploaded : uploaded[0];
};

export const useUpload = (options = {}) => {
  const mutation = useMutation({ mutationFn: performUpload, ...options });

  return {
    upload: mutation.mutate,
    uploadAsync: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};
