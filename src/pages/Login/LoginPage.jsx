import './LoginPage.css';
import adduLogo from '../../assets/images/addu-logo.png';

function LoginPage() {
  return (
    <div className="page login-page">
      <div className="login-screen">
        <div className="login-top">
          <div className="login-brand">
            <div className="login-brand__logo">
              <img src={adduLogo} alt="Ateneo de Davao University logo" />
            </div>

            <h1 className="login-brand__title">Alumni Career Hub</h1>
            <p className="login-brand__subtitle">
              Ateneo de Davao University
            </p>
          </div>
        </div>

        <div className="login-bottom">
          <div className="login-card">
            <div className="login-card__header">
              <h2>Sign In</h2>
              <p>Welcome back. Please enter your details.</p>
            </div>

            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="login-row">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button type="button" className="text-link">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="btn-primary">
                Sign In
              </button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="btn-social">
                Google
              </button>
              <button type="button" className="btn-social">
                Facebook
              </button>
            </div>

            <p className="signup-text">
              Don&apos;t have an account? <span>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;