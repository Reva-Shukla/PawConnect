import "./register.css";

function Register() {
  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join PawConnect and help pets find a home</p>
        </div>

        <form className="register-form">

          <div className="register-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First name"
                required
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <label className="terms-checkbox">
            <input type="checkbox" required />
            <span>
              I agree to the <a href="#">Terms & Conditions</a>
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
          <a href="/adoption/login">Log in</a>
        </p>

      </div>
    </div>
  );
}

export default Register;