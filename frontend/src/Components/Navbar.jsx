import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand-box">
        <img src={logo} alt="logo" className="brand-logo" />
        <h2>SocialSphere</h2>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/profile">Profile</Link>

        {user?.username && (
          <div className="nav-user-box">
            <img
              src={user.profilePic || defaultPic}
              alt="user"
              className="nav-user-pic"
              onError={(e) => (e.target.src = defaultPic)}
            />
            <span>{user.username}</span>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;