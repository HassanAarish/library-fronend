export const baseURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:5001"
    : "http://localhost:5001";

// Public social-login identifiers (safe to ship in browser code).
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
