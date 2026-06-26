import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flip, ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "@/context/AuthContext";
import { GOOGLE_CLIENT_ID } from "@/constants";
import { ModalProvider } from "./context/ModalContext";

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <ModalProvider>
              <AppRoutes />
              <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Flip}
                toastClassName={() =>
                  "relative flex items-center text-white font-outfit text-sm md:text-base px-4 py-3 rounded-lg gap-x-2 shadow-lg border border-white/10 bg-primary"
                }
                bodyClassName={() => "flex items-center gap-3"}
                toastStyle={{
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                closeButton={({ closeToast }) => (
                  <button
                    onClick={closeToast}
                    className="text-white cursor-pointer hover:text-red-200 transition duration-200 text-lg ml-auto"
                  >
                    ✖
                  </button>
                )}
              />
            </ModalProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
