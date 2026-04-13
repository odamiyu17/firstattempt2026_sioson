import './EventsPage.css';

function EventsPage() {
  const tabs = ['Upcoming', 'Past', 'Teaching', 'Seminars', 'Directory'];

  const featuredEvent = {
    title: 'AdDU Alumni Grand Homecoming 2026',
    date: 'March 15, 2026',
    location: 'Onsite',
    attendees: '348 going',
    description:
      'Reconnect with batchmates and celebrate decades of Atenean excellence. Featuring a mass, campus tour, cultural show, and grand dinner.'
  };

  const upcomingEvents = [
    {
      title: 'Career Networking Mixer',
      dateTime: 'March 28, 2026 | 6:00 PM - 9:00 PM',
      location: 'Abreeza Mall, Davao City',
      attendees: '120'
    },
    {
      title: 'Teaching Excellence Seminar',
      dateTime: 'April 10, 2026 | 1:00 PM - 4:00 PM',
      location: 'Ateneo Function Hall',
      attendees: '84'
    }
  ];

  return (
    <div className="page events-page">
      <div className="events-header">
        <div className="events-header-top">
          <button className="events-back-button" type="button">
            ←
          </button>

          <h1>Networking &amp; Events</h1>
        </div>

        <div className="events-search">
          <input type="text" placeholder="Search events..." />
        </div>
      </div>

      <div className="events-content">
        <div className="events-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? 'events-tab active' : 'events-tab'}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="featured-event-card">
          <div className="featured-event-image">
            <span className="featured-badge">☆ FEATURED</span>
            <span className="featured-attendees">{featuredEvent.attendees}</span>
          </div>

          <div className="featured-event-body">
            <h2>{featuredEvent.title}</h2>

            <div className="featured-meta">
              <span>📅 {featuredEvent.date}</span>
              <span>📍 {featuredEvent.location}</span>
            </div>

            <p>{featuredEvent.description}</p>

            <button type="button" className="featured-button">
              View Details ›
            </button>
          </div>
        </section>

        <div className="more-upcoming-label">
          <span>More Upcoming</span>
        </div>

        <div className="events-list-grid">
          {upcomingEvents.map((event) => (
            <article className="event-list-card" key={event.title}>
              <div className="event-list-image">
                <span className="event-list-tag">Onsite</span>
                <span className="event-list-attendees">{event.attendees}</span>
              </div>

              <div className="event-list-body">
                <h3>{event.title}</h3>
                <p>{event.dateTime}</p>
                <p>{event.location}</p>

                <button type="button" className="event-list-button">
                  View Details ›
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;