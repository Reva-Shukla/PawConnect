import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend demo — navigate to user dashboard
    sessionStorage.setItem("pawconnect_demo_authenticated", "true");
    navigate("/adoption/dashboard");
  };

  return (
    <PawPatternBackground intensity="adoption" className="paw-pattern--butter">
      <div className="login-page">
        <div className="login-card">

          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Login to continue to PawConnect</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <NavLink to="/adoption/register">Create Account</NavLink>
          </p>

        </div>
      </div>
    </PawPatternBackground>
  );
}

export default Login;