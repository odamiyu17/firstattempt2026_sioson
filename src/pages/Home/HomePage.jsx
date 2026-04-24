import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import adduLogo from '../../assets/images/addu-logo.png';
import api from '../../api/api';
import { useEvents } from '../../context/EventsContext';
import eventsIcon from '../../assets/icons/events.png';
import documentsIcon from '../../assets/icons/documents.png';
import jobsIcon from '../../assets/icons/jobs.png';
import donateIcon from '../../assets/icons/donate.png';

import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaNewspaper,
  FaBriefcase,
  FaHeart,
  FaFileAlt
} from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { filteredEvents, loading, resetEventFilters } = useEvents();

  const quickActions = [
    { title: 'Events', badge: '2', icon: eventsIcon },
    { title: 'Documents', badge: '3', icon: documentsIcon },
    { title: 'Jobs', badge: '2', icon: jobsIcon },
    { title: 'Donate', badge: '', icon: donateIcon }
  ];

  const sidebarMenu = [
    { title: 'Home', icon: <FaHome />, action: () => navigate('/home') },
    { title: 'News & Updates', icon: <FaNewspaper />, action: () => navigate('/news-updates') },
    { title: 'My Profile', icon: <FaUser />, action: () => navigate('/profile') },
    {
  title: 'Alumni Calendar',
  icon: <FaCalendarAlt />,
  action: () => {
    resetEventFilters();
    navigate('/calendar');
  }
},
    {
      title: 'Networking & Events',
      icon: <FaCalendarAlt />,
      action: () => {
        resetEventFilters();
        navigate('/events');
      }
    },
    { title: 'Document Request', icon: <FaFileAlt />, action: () => {} },
    { title: 'Job Opportunities', icon: <FaBriefcase />, action: () => navigate('/jobs') },
    { title: 'Donation', icon: <FaHeart />, action: () => {} }
  ];

  useEffect(() => {
    fetchUsers();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    resetEventFilters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedNotificationPanel = event.target.closest('.notifications-panel');
      const clickedNotificationButton = event.target.closest('.notification-button');

      if (!clickedNotificationPanel && !clickedNotificationButton) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleGoToEvents = () => {
    resetEventFilters();
    navigate('/events');
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

  const firstName = loggedInUser?.name
    ? loggedInUser.name.split(' ')[0]
    : 'User';

  return (
    <div className="page home-page">
      {isSidebarOpen && (
        <>
          <div
            className="sidebar-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <aside className="home-sidebar">
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
                    item.title === 'Home'
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

                  {item.title === 'Home' && (
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
                <button
                  type="button"
                  className="sidebar-footer-btn"
                  onClick={() => navigate('/profile')}
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

      <div className="home-header">
        <div className="home-topbar">
          <button
            className="icon-button"
            type="button"
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="home-logo">
            <img src={adduLogo} alt="Ateneo de Davao University logo" />
          </div>

          <button
            className="icon-button notification-button"
            type="button"
            aria-label="Notifications"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            🔔
            {filteredEvents.length > 0 && (
              <span className="notification-dot"></span>
            )}
          </button>
        </div>

        {isNotificationsOpen && (
          <div className="notifications-panel">
            <div className="notifications-panel-header">
              <h3>Notifications</h3>

              <button
                type="button"
                onClick={() => setIsNotificationsOpen(false)}
              >
                ✕
              </button>
            </div>

            {filteredEvents.length > 0 ? (
              filteredEvents.slice(0, 3).map((event) => (
                <div
                  className="notification-item"
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <span>📅</span>

                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.event_date} • {event.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="notification-item">
                <span>🔔</span>

                <div>
                  <h4>No notifications</h4>
                  <p>You have no new updates right now.</p>
                </div>
              </div>
            )}

            <div
              className="notification-item"
              onClick={() => navigate('/profile')}
            >
              <span>👤</span>

              <div>
                <h4>Profile Reminder</h4>
                <p>Complete your profile to improve your alumni account.</p>
              </div>
            </div>

            <div
              className="notification-item"
              onClick={() => navigate('/news-updates')}
            >
              <span>📰</span>

              <div>
                <h4>New Update</h4>
                <p>New alumni announcements are available.</p>
              </div>
            </div>
          </div>
        )}

        <div className="home-welcome">
          <h1>Welcome back, {firstName}! 👋</h1>
          <p>Here&apos;s what&apos;s happening with your alumni account</p>
        </div>
      </div>

      <div className="home-content">
        <button
          className="logout-button"
          type="button"
          onClick={() => navigate('/my-registrations')}
        >
          My Registered Events
        </button>

 
        <section className="profile-progress-card">
          <div className="profile-progress-top">
            <div>
              <h2>Complete Your Profile</h2>
              <p>Add your career milestones and connect with alumni</p>
            </div>

            <div className="profile-progress-badge" aria-hidden="true">
              ⌘
            </div>
          </div>

          <div className="progress-row">
            <span>Profile Strength</span>
            <strong>75%</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-bar__fill"></div>
          </div>

          <button
            className="complete-profile-btn"
            type="button"
            onClick={() => navigate('/profile')}
          >
            Complete Profile
          </button>
        </section>

        <section className="home-section">
          <h3 className="home-section__title">Quick Actions</h3>

          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div
                className="quick-action-card"
                key={action.title}
                onClick={() => {
                  if (action.title === 'Events') {
                    handleGoToEvents();
                  } else if (action.title === 'Documents') {
                    navigate('/academic-records');
                  } else if (action.title === 'Jobs') {
                    setIsSidebarOpen(true);
                  }
                }}
              >
                {action.badge ? (
                  <span className="quick-action-badge">{action.badge}</span>
                ) : null}

                <div className="quick-action-icon">
                  <img src={action.icon} alt={action.title} />
                </div>

                <p>{action.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="section-header-row">
            <h3 className="home-section__title">Upcoming Events</h3>

            <button
              className="view-all-button"
              type="button"
              onClick={handleGoToEvents}
            >
              View All
            </button>
          </div>

          <div className="events-list">
            {loading ? (
              <div className="profile-link-row">
                <div className="profile-link-text">
                  <h4>Loading events...</h4>
                  <p>Please wait a moment.</p>
                </div>
              </div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.slice(0, 2).map((event) => (
                <div
                  className="upcoming-event-card"
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="event-date-box">
                    <span>{event.event_date.split(' ')[0].substring(0, 3)}</span>
                    <strong>
                      {event.event_date.split(' ')[1]?.replace(',', '')}
                    </strong>
                  </div>

                  <div className="event-info">
                    <h4>{event.title}</h4>
                    <p>{event.event_date} • {event.event_time}</p>
                    <p>{event.location}</p>
                  </div>

                  <div className="event-arrow">›</div>
                </div>
              ))
            ) : (
              <div className="profile-link-row">
                <div className="profile-link-text">
                  <h4>No upcoming events</h4>
                  <p>Check again later for new event listings.</p>
                </div>
              </div>
            )}
          </div>
        </section>


      </div>
    </div>
  );
}

export default HomePage;