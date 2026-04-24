import { useEffect, useState } from 'react';
import api from '../../api/api';

function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    event_date: '',
    event_time: '',
    location: '',
    description: '',
    attendees: '',
    status: '',
    category: '',
    image_url: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage('Failed to load events.');
      setEvents([]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value
      };
    });
  };

  const resetForm = () => {
    setForm({
      title: '',
      event_date: '',
      event_time: '',
      location: '',
      description: '',
      attendees: '',
      status: '',
      category: '',
      image_url: ''
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form);
        setMessage('Event updated successfully.');
      } else {
        await api.post('/events', form);
        setMessage('Event created successfully.');
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Submit error:', error);
      console.log('Backend response:', error.response?.data);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.data?.error?.sqlMessage) {
        setMessage(error.response.data.error.sqlMessage);
      } else {
        setMessage('Failed to save event.');
      }
    }
  };

  const handleEdit = (eventItem) => {
    setForm({
      title: eventItem.title || '',
      event_date: eventItem.event_date || '',
      event_time: eventItem.event_time || '',
      location: eventItem.location || '',
      description: eventItem.description || '',
      attendees: eventItem.attendees || '',
      status: eventItem.status || '',
      category: eventItem.category || '',
      image_url: eventItem.image_url || ''
    });

    setEditingId(eventItem.id);
    setMessage('');
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/events/${id}`);
      setMessage('Event deleted successfully.');

      if (editingId === id) {
        resetForm();
      }

      fetchEvents();
    } catch (error) {
      console.error('Delete error:', error);

      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Failed to delete event.');
      }
    }
  };

  return (
    <div
      className="page"
      style={{
        padding: '16px',
        background: '#f5f7ff',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '18px',
          boxShadow: '0 10px 24px rgba(17, 37, 98, 0.08)'
        }}
      >
        <h2
          style={{
            marginBottom: '16px',
            color: '#162d73',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}
        >
          Admin Events
        </h2>

        {message && (
          <p
            style={{
              marginBottom: '14px',
              padding: '10px 12px',
              borderRadius: '12px',
              background: '#eef8f0',
              color: '#2b8a3e',
              fontWeight: '600'
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="event_date"
            placeholder="Event Date (e.g. March 15, 2026)"
            value={form.event_date}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="event_time"
            placeholder="Event Time (e.g. 9:00 AM - 5:00 PM)"
            value={form.event_time}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            style={textareaStyle}
          />

          <input
            name="attendees"
            placeholder="Attendees (e.g. 120 going)"
            value={form.attendees}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="status"
            placeholder="Status (e.g. Onsite / Online)"
            value={form.status}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="category"
            placeholder="Category (Upcoming, Past, Teaching, Seminars, Directory)"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="image_url"
            placeholder="Image URL (e.g. /images/events/homecoming.jpg)"
            value={form.image_url}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={primaryButtonStyle}>
            {editingId ? 'Update Event' : 'Create Event'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={secondaryButtonStyle}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div>
          <h3
            style={{
              marginBottom: '12px',
              color: '#162d73',
              fontSize: '1.1rem'
            }}
          >
            Existing Events
          </h3>

          {events.length === 0 ? (
            <p style={{ color: '#7a859f' }}>No events found.</p>
          ) : (
            events.map((eventItem) => (
              <div
                key={eventItem.id}
                style={{
                  background: '#f8faff',
                  border: '1px solid #dde5f4',
                  borderRadius: '16px',
                  padding: '14px',
                  marginBottom: '12px'
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    color: '#162d73',
                    marginBottom: '6px'
                  }}
                >
                  {eventItem.title}
                </strong>

                <p style={{ color: '#7a859f', marginBottom: '4px' }}>
                  {eventItem.event_date} • {eventItem.event_time}
                </p>

                <p style={{ color: '#7a859f', marginBottom: '10px' }}>
                  {eventItem.location}
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(eventItem)}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(eventItem.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: '46px',
  border: '1px solid #dbe4f3',
  background: '#ffffff',
  borderRadius: '12px',
  padding: '0 14px',
  fontSize: '0.95rem',
  color: '#1f2a44'
};

const textareaStyle = {
  width: '100%',
  border: '1px solid #dbe4f3',
  background: '#ffffff',
  borderRadius: '12px',
  padding: '12px 14px',
  fontSize: '0.95rem',
  color: '#1f2a44',
  resize: 'vertical'
};

const primaryButtonStyle = {
  width: '100%',
  height: '48px',
  border: 'none',
  borderRadius: '14px',
  background: '#1f3c97',
  color: '#ffffff',
  fontWeight: '700',
  cursor: 'pointer'
};

const secondaryButtonStyle = {
  width: '100%',
  height: '44px',
  border: '1px solid #dbe4f3',
  borderRadius: '14px',
  background: '#ffffff',
  color: '#162d73',
  fontWeight: '700',
  cursor: 'pointer'
};

const editButtonStyle = {
  background: '#2563eb',
  color: '#ffffff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  background: '#dc2626',
  color: '#ffffff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default AdminEventsPage;