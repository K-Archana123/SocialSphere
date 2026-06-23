import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import logo from "../assets/logo.png";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo-box">
          <img src={logo} alt="logo" className="auth-logo" />
          <h1>SocialSphere</h1>
        </div>

        <p className="auth-subtitle">Create your account and start connecting</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            required
          />

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

          <button type="submit" className="auth-btn">Register</button>
        </form>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <p className="auth-back-home">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;