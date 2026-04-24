import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import adduLogo from '../../assets/images/addu-logo.png';
import api from '../../api/api';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await api.post('/users/login', {
        email: formData.email,
        password: formData.password
      });

      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/home');
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">


      <div className="login-header">
        <div className="login-decor decor-left"></div>
        <div className="login-decor decor-right"></div>

        <img src={adduLogo} alt="Ateneo de Davao University logo" className="login-logo" />

        <h1>Alumni Career Hub</h1>
        <p>Ateneo de Davao University</p>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Sign in to continue to your career passport</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span className="input-icon">✉</span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">🔒</span>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>

            <button type="button" className="forgot-button">
              Forgot Password?
            </button>
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider-row">
          <span></span>
          <p>or continue with</p>
          <span></span>
        </div>

        <div className="social-login-row">
          <button type="button" className="social-button">
            <span className="google-icon">G</span>
            Google
          </button>

          <button type="button" className="social-button">
            <span className="facebook-icon">f</span>
            Facebook
          </button>
        </div>

<p className="signup-text">
  Don&apos;t have an account?
  <button type="button" onClick={() => navigate('/signup')}>
    Sign Up
  </button>
</p>
      </div>
    </div>
  );
}

export default LoginPage;