import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import logo from "../assets/logo.png";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-box">
          <img src={logo} alt="logo" className="auth-logo" />
          <h1>SocialSphere</h1>
        </div>

        <p className="auth-subtitle">Welcome back! Login to continue</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <p className="auth-back-home">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;