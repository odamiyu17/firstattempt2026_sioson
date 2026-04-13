import './EventDetailsPage.css';

function EventDetailsPage() {
  const eventDetails = {
    title: 'AdDU Alumni Grand Homecoming 2026',
    status: 'ONSITE',
    attendees: '348 going',
    date: 'March 15, 2026',
    time: '9:00 AM - 5:00 PM',
    description:
      'Reconnect with batchmates and celebrate decades of Atenean excellence. Featuring a mass, campus tour, cultural show, and grand dinner.',
    venueTitle: 'Finster Auditorium',
    venueAddress:
      'Ateneo de Davao University, E. Jacinto Street, Davao City, 8000 Philippines'
  };

  return (
    <div className="page event-details-page">
      <div className="event-details-header">
        <div className="event-details-topbar">
          <button className="details-icon-button" type="button">
            ←
          </button>

          <h1>Networking &amp; Events</h1>
        </div>
      </div>

      <div className="event-details-content">
        <section className="event-hero-card">
          <div className="event-hero-image">
            <div className="event-hero-badges">
              <span className="hero-chip primary">{eventDetails.status}</span>
              <span className="hero-chip muted">{eventDetails.attendees}</span>
            </div>

            <button className="hero-close-button" type="button">
              ✕
            </button>

            <div className="event-hero-overlay">
              <h2>{eventDetails.title}</h2>
              <p>
                {eventDetails.date} &nbsp; • &nbsp; {eventDetails.time}
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
            <h4>{eventDetails.venueTitle}</h4>
            <p>{eventDetails.venueAddress}</p>
          </div>
        </section>

        <section className="details-section">
          <div className="details-section-title">
            <span className="details-section-icon">⌖</span>
            <h3>Map Preview</h3>
          </div>

          <div className="map-preview-card">
            <div className="map-image">
              <div className="map-pin">📍</div>
            </div>

            <div className="map-location-bar">
              <span>{eventDetails.venueTitle}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="event-register-bar">
        <button className="register-now-button" type="button">
          Register Now ›
        </button>
      </div>
    </div>
  );
}

export default EventDetailsPage;