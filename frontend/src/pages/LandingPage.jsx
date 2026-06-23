import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="SocialSphere Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to SocialSphere</h1>
        <p style={styles.subtitle}>
          Connect • Share • Grow
        </p>
        <p style={styles.desc}>
          A mini social media platform where users can create posts, like,
          comment, follow others, and manage their profile.
        </p>

        <div style={styles.buttonContainer}>
          <Link to="/login">
            <button style={styles.loginBtn}>Login</button>
          </Link>
          <Link to="/register">
            <button style={styles.registerBtn}>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    padding: "20px",
  },
  card: {
    textAlign: "center",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    maxWidth: "700px",
    width: "100%",
  },
  logo: {
    width: "250px",
    maxWidth: "100%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#222",
  },
  subtitle: {
    fontSize: "22px",
    color: "#7b2cbf",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  desc: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  loginBtn: {
    padding: "12px 28px",
    border: "none",
    borderRadius: "10px",
    background: "#7b2cbf",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  registerBtn: {
    padding: "12px 28px",
    border: "none",
    borderRadius: "10px",
    background: "#ff4d6d",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default LandingPage;