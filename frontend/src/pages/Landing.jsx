import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-card">
        <img src={logo} alt="SocialSphere Logo" className="landing-logo" />

        <h1 className="landing-title">SocialSphere</h1>
        <p className="landing-subtitle">
          Connect, share and explore your social world
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="landing-main-btn login-home-btn">
            Login
          </Link>

          <Link to="/register" className="landing-main-btn register-home-btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;