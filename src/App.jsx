import AuthLayout from "./layout/AuthLayout";
import HomeLayout from "./layout/HomeLayout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  // const { isAuthenticated } = useAuth();

  const isAuthenticated = false;

  // Handler for search queries for navbar
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <>
      {isAuthenticated && <Navbar onSearch={handleSearch} />}
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
