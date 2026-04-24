import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import api from '../../api/api';
import adduLogo from '../../assets/images/addu-logo.png';
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaNewspaper,
  FaBriefcase,
  FaHeart,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

function ProfilePage() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    batch: '',
    program: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
      fetchUserDetails(parsedUser.id);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      setFormData(response.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/${formData.id}`, formData);

      const updatedUser = {
        ...loggedInUser,
        ...formData
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
      setIsEditing(false);
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.log('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';

    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const sidebarMenu = [
    { title: 'Home', icon: '⌂', action: () => navigate('/home') },
    { title: 'News & Updates', icon: '📰', action: () => navigate('/news-updates') },
    { title: 'My Profile', icon: '◌', action: () => navigate('/profile') },
    { title: 'Academic Records', icon: '🎓', action: () => navigate('/academic-records') },
    { title: 'Networking & Events', icon: '☰', action: () => navigate('/events') },
    { title: 'My Registered Events', icon: '🗓', action: () => navigate('/my-registrations') },
    { title: 'Admin Events', icon: '⚙', action: () => navigate('/admin/events') }
  ];

  const nameParts = formData.name ? formData.name.split(' ') : ['User'];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const initials = getInitials(formData.name);

  return (
    <div className="page profile-page">
      {isSidebarOpen && (
        <>
          <div
            className="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <aside className="page-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-brand">
                <div className="sidebar-logo">
                  <img src={adduLogo} alt="Ateneo de Davao University logo" />
                </div>

                <div className="sidebar-brand-text">
                  <h3>Alumni Portal</h3>
                  <p>Ateneo de Davao</p>
                </div>
              </div>

              <button
                className="sidebar-close-btn"
                type="button"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="sidebar-menu">
              {sidebarMenu.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={
                    item.title === 'My Profile'
                      ? 'sidebar-menu-item active'
                      : 'sidebar-menu-item'
                  }
                  onClick={() => {
                    item.action();
                    setIsSidebarOpen(false);
                  }}
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  <span className="sidebar-menu-text">{item.title}</span>
                  {item.title === 'My Profile' && (
                    <span className="sidebar-active-dot"></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">
                  {getInitials(loggedInUser?.name)}
                </div>

                <div className="sidebar-user-info">
                  <h4>{loggedInUser?.name || 'User'}</h4>
                  <p>Alumni</p>
                </div>
              </div>

              <div className="sidebar-footer-actions">
                <button type="button" className="sidebar-footer-btn">
                  ⚙ Settings
                </button>

                <button
                  type="button"
                  className="sidebar-footer-btn"
                  onClick={handleLogout}
                >
                  ⇥ Sign Out
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      <div className="profile-topbar">
        <button
          className="profile-menu-button"
          type="button"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        <h1>My Profile</h1>

        <button
          className="edit-profile-button"
          type="button"
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
              setMessage('');
            }
          }}
        >
          {isEditing ? '💾 Save' : '✎ Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        {message && <p className="profile-message">{message}</p>}

        <section className="profile-hero-card">
          <div className="profile-avatar">{initials}</div>

          <div className="profile-hero-info">
            <h2>{formData.name}</h2>
            <p>
              {formData.batch} • {formData.program}
            </p>
          </div>

          <div className="profile-hero-divider"></div>

          <div className="profile-meta-grid">
            <div className="profile-meta-item">
              <span>✉</span>
              <p>{formData.email}</p>
            </div>

            <div className="profile-meta-item">
              <span>☎</span>
              <p>{formData.phone}</p>
            </div>

            <div className="profile-meta-item">
              <span>⌖</span>
              <p>{formData.address}</p>
            </div>

            <div className="profile-meta-item">
              <span>💼</span>
              <p>{formData.role}</p>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <h3>Personal Information</h3>

          <div className="personal-info-grid">
            <div className="info-field">
              <label>First Name</label>
              <input type="text" value={firstName} readOnly />
            </div>

            <div className="info-field">
              <label>Last Name</label>
              <input type="text" value={lastName} readOnly />
            </div>

            <div className="info-field">
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="info-field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="info-field full-width">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-field full-width">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-field full-width">
            <label>Batch</label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="info-field full-width">
            <label>Program</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;