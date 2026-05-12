export const baseURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5001"
    : "https://app.designdistrict.digital";
