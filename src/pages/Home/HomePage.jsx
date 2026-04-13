import './HomePage.css';
import adduLogo from '../../assets/images/addu-logo.png';

function HomePage() {
  const quickActions = [
    { title: 'Events', badge: '2', iconSymbol: '🗓' },
    { title: 'Documents', badge: '3', iconSymbol: '📄' },
    { title: 'Jobs', badge: '2', iconSymbol: '💼' },
    { title: 'Donate', badge: '', iconSymbol: '♡' }
  ];

  const upcomingEvents = [
    {
      month: 'Mar',
      day: '15',
      title: 'AdDU Alumni',
      dateTime: '3/15/2026 • 9:00 AM - 5:00 PM',
      location: 'Finster Auditorium,'
    },
    {
      month: 'Mar',
      day: '28',
      title: 'Career Networking Mixer',
      dateTime: '3/28/2026 • 6:00 PM - 9:00 PM',
      location: 'Abreeza Mall, Davao City'
    }
  ];

  return (
    <div className="page home-page">
      <div className="home-header">
        <div className="home-topbar">
          <button className="icon-button" type="button" aria-label="Open menu">
            ☰
          </button>

          <div className="home-logo">
            <img src={adduLogo} alt="Ateneo de Davao University logo" />
          </div>

          <button
            className="icon-button notification-button"
            type="button"
            aria-label="Notifications"
          >
            🔔
            <span className="notification-dot"></span>
          </button>
        </div>

        <div className="home-welcome">
          <h1>Welcome back, Juan! 👋</h1>
          <p>Here&apos;s what&apos;s happening with your alumni account</p>
        </div>
      </div>

      <div className="home-content">
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

          <button className="complete-profile-btn" type="button">
            Complete Profile
          </button>
        </section>

        <section className="home-section">
          <h3 className="home-section__title">Quick Actions</h3>

          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div className="quick-action-card" key={action.title}>
                {action.badge ? (
                  <span className="quick-action-badge">{action.badge}</span>
                ) : null}

                <div className="quick-action-icon">
                  <span>{action.iconSymbol}</span>
                </div>

                <p>{action.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="section-header-row">
            <h3 className="home-section__title">Upcoming Events</h3>
            <button className="view-all-button" type="button">
              View All
            </button>
          </div>

          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div className="upcoming-event-card" key={event.title}>
                <div className="event-date-box">
                  <span>{event.month}</span>
                  <strong>{event.day}</strong>
                </div>

                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{event.dateTime}</p>
                  <p>{event.location}</p>
                </div>

                <div className="event-arrow">›</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;