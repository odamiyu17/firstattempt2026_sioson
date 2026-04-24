import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import './NewsDetailsPage.css';

function NewsDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  const newsData = [
    {
      id: '1',
      type: 'Announcement',
      title: 'Alumni Career Hub Now Open',
      date: 'May 2026',
      content:
        'The Alumni Career Hub is now officially open. Alumni can access events, academic records, profile services, and other alumni-related features in one convenient platform.',
      cta: 'Explore Events',
      ctaPath: '/events'
    },
    {
      id: '2',
      type: 'Events',
      title: 'New Networking Events Added',
      date: 'May 2026',
      content:
        'New networking and seminar events have been added for alumni. These events are designed to help graduates reconnect, build professional relationships, and discover new opportunities.',
      cta: 'View Networking Events',
      ctaPath: '/events',
      showEvents: true
    },
    {
      id: '3',
      type: 'Reminder',
      title: 'Profile Update Reminder',
      date: 'April 2026',
      content:
        'Please keep your alumni profile updated. Updated information helps the university provide better event recommendations, career opportunities, and alumni services.',
      cta: 'Update Profile',
      ctaPath: '/profile'
    }
  ];

  const news = newsData.find((item) => item.id === id);

  if (!news) {
    return <div className="page news-details-page">News not found</div>;
  }

  const relatedEvents = events.slice(0, 2);

  return (
    <div className="page news-details-page">
      <div className="news-details-header">
        <button
          className="news-back-button"
          type="button"
          onClick={() => navigate('/news-updates')}
        >
          ←
        </button>

        <span className="news-details-type">{news.type}</span>
        <h1>{news.title}</h1>
        <p>{news.date}</p>
      </div>

      <div className="news-details-content">
        <div className="news-details-card">
          <p>{news.content}</p>

          <button
            className="news-details-primary-button"
            type="button"
            onClick={() => navigate(news.ctaPath)}
          >
            {news.cta} ›
          </button>
        </div>

        {news.showEvents && (
          <section className="related-events-section">
            <h2>Related Events</h2>

            {relatedEvents.map((event) => (
              <div className="related-event-card" key={event.id}>
                <div
                  className="related-event-image"
                  style={{
                    backgroundImage: `linear-gradient(rgba(21, 41, 104, 0.18), rgba(21, 41, 104, 0.32)), url(${event.image_url || '/images/events/default.jpg'})`
                  }}
                ></div>

                <div className="related-event-body">
                  <h3>{event.title}</h3>
                  <p>{event.event_date} • {event.event_time}</p>
                  <p>{event.location}</p>

                  <button
                    type="button"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    View Details ›
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default NewsDetailsPage;