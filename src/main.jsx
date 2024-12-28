import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="bottom-left" // Position of the toast
            autoClose={5000} // Auto close after 5 seconds
            hideProgressBar={false} // Show the progress bar
            newestOnTop={false} // New toasts appear at the bottom of the stack
            closeOnClick // Allow users to close by clicking on the toast
            pauseOnHover // Pause timer when hovered
            draggable // Allow users to drag to close
            theme="dark" // Choose a theme (colored, dark, or light)
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
