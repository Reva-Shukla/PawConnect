import "./login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Login to continue to PawConnect</p>
        </div>

        <form className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
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
          <a href="#">Create Account</a>
        </p>

      </div>
    </div>
  );
}

export default Login;