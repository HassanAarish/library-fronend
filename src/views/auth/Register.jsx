import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    authType: "email",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to register
      // Example: const response = await api.post('/register', formData);
      // login(response.data.user, response.data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select name="authType" onChange={handleChange}>
          <option value="email">Email</option>
          <option value="google">Google</option>
          <option value="apple">Apple</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
