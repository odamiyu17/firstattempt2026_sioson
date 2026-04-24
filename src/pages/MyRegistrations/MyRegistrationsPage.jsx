import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyRegistrationsPage.css';
import api from '../../api/api';

function MyRegistrationsPage() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    try {
      const response = await api.get(`/registrations/user/${parsedUser.id}`);
      setRegistrations(response.data);
    } catch (error) {
      console.log('Error fetching registrations:', error);
    }
  };

  const handleUnregister = async (registrationId) => {
    try {
      const response = await api.delete(`/registrations/${registrationId}`);
      setMessage(response.data.message);
      fetchRegistrations();
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Failed to cancel registration');
      }
    }
  };

  return (
    <div className="page my-registrations-page">
      <div className="my-registrations-header">
        <button
          type="button"
          className="my-registrations-back"
          onClick={() => navigate('/home')}
        >
          ←
        </button>
        <h1>My Registered Events</h1>
      </div>

      <div className="my-registrations-content">
        {message && <p className="registration-alert">{message}</p>}

        {registrations.length > 0 ? (
          registrations.map((event) => (
            <div className="my-registration-card" key={event.id}>
              <h3>{event.title}</h3>
              <p>
                {event.event_date} • {event.event_time}
              </p>
              <p>{event.location}</p>
              <span>{event.status}</span>

              <button
                type="button"
                className="cancel-registration-button"
                onClick={() => handleUnregister(event.id)}
              >
                Cancel Registration
              </button>
            </div>
          ))
        ) : (
          <p className="no-registrations-text">No registered events yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyRegistrationsPage;