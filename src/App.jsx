import AuthLayout from "./layout/AuthLayout";
import HomeLayout from "./layout/HomeLayout";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          exact
          path="/*"
          element={isAuthenticated ? <HomeLayout /> : <AuthLayout />}
        />
      </Routes>
    </>
  );
};

export default App;
