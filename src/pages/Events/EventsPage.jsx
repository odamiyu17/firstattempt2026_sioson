import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventsPage.css';
import { useEvents } from '../../context/EventsContext';
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

function EventsPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = ['Upcoming', 'Past', 'Teaching', 'Seminars', 'Directory'];

  const {
    filteredEvents,
    searchTerm,
    setSearchTerm,
    category,
    setCategory
  } = useEvents();

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const featuredEvent = filteredEvents.length > 0 ? filteredEvents[0] : null;
  const otherEvents = filteredEvents.length > 1 ? filteredEvents.slice(1) : [];

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
 {
  title: 'Alumni Calendar',
  icon: <FaCalendarAlt />,
  action: () => {
    resetEventFilters();
    navigate('/calendar');
  }
},
  { title: 'Networking & Events', icon: <FaCalendarAlt />, action: () => navigate('/events') },
  { title: 'Document Request', icon: <FaFileAlt />, action: () => {} },
  { title: 'Job Opportunities', icon: <FaBriefcase />, action: () => {} },
  { title: 'Donation', icon: <FaHeart />, action: () => {} }
];

  return (
    <div className="page events-page">
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

      <div className="events-header">
        <div className="events-header-top">
          <button
            className="events-back-button"
            type="button"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <h1>Networking &amp; Events</h1>
        </div>

        <div className="events-search">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="events-content">
        <div className="events-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={category === tab ? 'events-tab active' : 'events-tab'}
              onClick={() => setCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {featuredEvent ? (
          <>
            <section className="featured-event-card">
              <div
                className="featured-event-image"
                style={{
                  backgroundImage: `linear-gradient(rgba(21, 41, 104, 0.18), rgba(21, 41, 104, 0.28)), url(${featuredEvent.image_url || '/images/events/default.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <span className="featured-badge">☆ FEATURED</span>
                <span className="featured-attendees">
                  {featuredEvent.attendees}
                </span>
              </div>

              <div className="featured-event-body">
                <h2>{featuredEvent.title}</h2>

                <div className="featured-meta">
                  <span>📅 {featuredEvent.event_date}</span>
                  <span>📍 {featuredEvent.status}</span>
                </div>

                <p>{featuredEvent.description}</p>

                <button
                  type="button"
                  className="featured-button"
                  onClick={() => navigate(`/events/${featuredEvent.id}`)}
                >
                  View Details ›
                </button>
              </div>
            </section>

            {otherEvents.length > 0 && (
              <>
                <div className="more-upcoming-label">
                  <span>More {category}</span>
                </div>

                <div className="events-list-grid">
                  {otherEvents.map((event) => (
                    <article className="event-list-card" key={event.id}>
                      <div
                        className="event-list-image"
                        style={{
                          backgroundImage: `linear-gradient(rgba(21, 41, 104, 0.16), rgba(21, 41, 104, 0.24)), url(${event.image_url || '/images/events/default.jpg'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <span className="event-list-tag">{event.status}</span>
                        <span className="event-list-attendees">
                          {event.attendees}
                        </span>
                      </div>

                      <div className="event-list-body">
                        <h3>{event.title}</h3>
                        <p>
                          {event.event_date} | {event.event_time}
                        </p>
                        <p>{event.location}</p>

                        <button
                          type="button"
                          className="event-list-button"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          View Details ›
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="no-events-message">
            No events found for <strong>{category}</strong>.
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;