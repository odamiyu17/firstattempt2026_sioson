import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EventDetailsPage.css';
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

function EventDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      setEventDetails(response.data);
    } catch (error) {
      console.log('Error fetching event details:', error);
    }
  };

  const handleRegister = async () => {
    const storedUserRaw = localStorage.getItem('user');

    if (!storedUserRaw) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUserRaw);

    try {
      setIsRegistering(true);
      setMessage('');

      const response = await api.post('/registrations', {
        user_id: parsedUser.id,
        event_id: eventDetails.id
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Registration failed');
      }
    } finally {
      setIsRegistering(false);
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
    { title: 'Home', icon: <FaHome />, action: () => navigate('/home') },
    { title: 'News & Updates', icon: <FaNewspaper />, action: () => navigate('/news-updates') },
    { title: 'My Profile', icon: <FaUser />, action: () => navigate('/profile') },
    { title: 'Academic Records', icon: '🎓', action: () => navigate('/academic-records') },
   { title: 'Networking & Events', icon: <FaCalendarAlt />, action: () => navigate('/events') },
    { title: 'My Registered Events', icon: '🗓', action: () => navigate('/my-registrations') },
    { title: 'Admin Events', icon: '⚙', action: () => navigate('/admin/events') }
  ];

  if (!eventDetails) {
    return <div className="page event-details-page">Loading event...</div>;
  }

  return (
    <div className="page event-details-page">
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

            <div className="sidebar-divider"></div>

            <nav className="sidebar-menu">
              {sidebarMenu.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={
                    item.title === 'Networking & Events'
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
                  {item.title === 'Networking & Events' && (
                    <span className="sidebar-active-dot"></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">
                  {getInitials(storedUser?.name)}
                </div>

                <div className="sidebar-user-info">
                  <h4>{storedUser?.name || 'User'}</h4>
                  <p>Alumni</p>
                </div>
              </div>

              <div className="sidebar-footer-actions">
                <button
                  type="button"
                  className="sidebar-footer-btn"
                  onClick={() => {
                    navigate('/profile');
                    setIsSidebarOpen(false);
                  }}
                >
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

      <div className="event-details-header">
        <div className="event-details-topbar">
          <button
            className="details-icon-button"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <h1>Networking &amp; Events</h1>
        </div>
      </div>

      <div className="event-details-content">
        <section className="event-hero-card">
          <div
            className="event-hero-image"
            style={{
              backgroundImage: `linear-gradient(rgba(21, 41, 104, 0.16), rgba(21, 41, 104, 0.48)), url(${eventDetails.image_url || '/images/events/default.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button
              className="hero-close-button"
              type="button"
              onClick={() => navigate('/events')}
            >
              ✕
            </button>

            <div className="event-hero-overlay">
              <h2>{eventDetails.title}</h2>
              <p>
                {eventDetails.event_date} &nbsp; • &nbsp; {eventDetails.event_time}
              </p>
            </div>
          </div>
        </section>

        <div className="event-action-row">
          <button className="event-action-button" type="button">
            🔖 Save
          </button>
          <button className="event-action-button" type="button">
            ↗ Share
          </button>
          <span className="event-status-pill">● Spots Available</span>
        </div>

        <section className="details-section">
          <div className="details-section-title">
            <span className="details-section-icon">ⓘ</span>
            <h3>Event Description</h3>
          </div>

          <p className="details-paragraph">{eventDetails.description}</p>
        </section>

        <section className="details-section">
          <div className="details-section-title">
            <span className="details-section-icon">✈</span>
            <h3>Venue Details</h3>
          </div>

          <div className="venue-card">
            <h4>{eventDetails.location}</h4>
            <p>{eventDetails.location}</p>
          </div>
        </section>

        <section className="details-section">
          <div className="details-section-title">
            <span className="details-section-icon">⌖</span>
            <h3>Map Preview</h3>
          </div>

          <div className="map-preview-card">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventDetails.location)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(eventDetails.location)}&zoom=15&size=600x300&markers=color:red|${encodeURIComponent(eventDetails.location)}`}
                alt="Map Preview"
                className="map-preview-image"
              />
            </a>

            <div className="map-location-bar">
              <span>{eventDetails.location}</span>
            </div>
          </div>
        </section>

        {message && <p className="registration-message">{message}</p>}
      </div>

      <div className="event-register-bar">
        <button
          className="register-now-button"
          type="button"
          onClick={handleRegister}
          disabled={isRegistering}
        >
          {isRegistering ? 'Registering...' : 'Register Now ›'}
        </button>
      </div>
    </div>
  );
}

export default EventDetailsPage;