import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import adduLogo from '../../assets/images/addu-logo.png';
import api from '../../api/api';

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    gradYear: '',
    program: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!agree) {
      setErrorMessage('Please accept terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/users/register', formData);

      navigate('/login');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <img src={adduLogo} alt="logo" />
      </div>

      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullName"
              placeholder="Juan dela Cruz"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="juan@addu.edu.ph"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
            />

            <input
              name="gradYear"
              placeholder="Grad Year"
              value={formData.gradYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Program / Degree</label>
            <input
              name="program"
              placeholder="BS Computer Science"
              value={formData.program}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                👁
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                👁
              </button>
            </div>
          </div>

          <div className="terms">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span>
              I agree to the <b>Terms and Conditions</b> and <b>Privacy Policy</b>
            </span>
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button className="signup-button" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="login-link">
          Already have an account?
          <button onClick={() => navigate('/login')}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;