import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PawPatternBackground from "../../components/PawPatternBackground";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Frontend demo — navigate to user dashboard
    sessionStorage.setItem("pawconnect_demo_authenticated", "true");
    navigate("/adoption/dashboard");
  };

  return (
    <PawPatternBackground intensity="adoption" className="paw-pattern--butter">
      <div className="register-page">
        <div className="register-card">

          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join PawConnect and help pets find a home</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>

            <div className="register-row">
              <div className="input-group">
                <label htmlFor="reg-first-name">First Name</label>
                <input
                  id="reg-first-name"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="reg-last-name">Last Name</label>
                <input
                  id="reg-last-name"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-phone">Phone Number</label>
              <input
                id="reg-phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <input
                id="reg-confirm-password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <span>
                I agree to the <a href="#">Terms &amp; Conditions</a>
              </span>
            </label>

            <button type="submit" className="register-button">
              Create Account
            </button>

          </form>

          <div className="register-divider">
            <span>OR</span>
          </div>

          <p className="login-text">
            Already have an account?{" "}
            <NavLink to="/adoption/login">Log in</NavLink>
          </p>

        </div>
      </div>
    </PawPatternBackground>
  );
}

export default Register;