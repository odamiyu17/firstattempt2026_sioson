import { useNavigate } from 'react-router-dom';
import './NewsUpdatesPage.css';

function NewsUpdatesPage() {
  const navigate = useNavigate();

  const updates = [
    {
      id: 1,
      title: 'Alumni Career Hub Now Open',
      date: 'May 2026',
      type: 'Announcement',
      description:
        'Alumni may now access events, academic records, and profile services through the Alumni Career Hub.'
    },
    {
      id: 2,
      title: 'New Networking Events Added',
      date: 'May 2026',
      type: 'Events',
      description:
        'More networking and seminar events are now available for alumni registration.'
    },
    {
      id: 3,
      title: 'Profile Update Reminder',
      date: 'April 2026',
      type: 'Reminder',
      description:
        'Please keep your alumni profile updated to receive better recommendations and event invitations.'
    }
  ];

  return (
    <div className="page news-page">
      <div className="news-header">
        <div className="news-topbar">
          <button
            className="news-icon-button"
            type="button"
            onClick={() => navigate('/home')}
          >
            ←
          </button>

          <h1>News &amp; Updates</h1>
        </div>

        <p>Latest announcements and alumni updates</p>
      </div>

      <div className="news-content">
        {updates.map((item) => (
          <div className="news-card" key={item.id}>
            <div className="news-card-top">
              <span className="news-type">{item.type}</span>
              <span className="news-date">{item.date}</span>
            </div>

            <h2>{item.title}</h2>
            <p>{item.description}</p>
<button
  className="news-read-button"
  type="button"
  onClick={() => navigate(`/news/${item.id}`)}
>
  Read More ›
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsUpdatesPage;