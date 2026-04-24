import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';
import api from '../../api/api';

function CalendarPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.log('Error fetching events:', error);
      setEvents([]);
    }
  };

  const monthName = currentDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentDate]);

  const formatDateKey = (date) => {
    if (!date) return '';

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const selectedDateKey = formatDateKey(selectedDate);

  const getEventsByDate = (date) => {
    const dateKey = formatDateKey(date);

    return events.filter((event) => {
      return event.event_date === dateKey;
    });
  };

  const selectedEvents = getEventsByDate(selectedDate);

  const goPreviousMonth = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  };

  const goNextMonth = () => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  };

  return (
    <div className="page calendar-page">
      <div className="calendar-header">
        <div className="calendar-topbar">
          <button
            className="calendar-icon-button"
            type="button"
            onClick={() => navigate('/home')}
          >
            ←
          </button>

          <h1>Alumni Calendar</h1>
        </div>

        <p>View upcoming alumni events by date</p>
      </div>

      <div className="calendar-content">
        <section className="calendar-card">
          <div className="calendar-month-row">
            <button type="button" onClick={goPreviousMonth}>
              ‹
            </button>

            <h2>{monthName}</h2>

            <button type="button" onClick={goNextMonth}>
              ›
            </button>
          </div>

          <div className="calendar-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((date, index) => {
              const dayEvents = getEventsByDate(date);
              const isSelected =
                date &&
                formatDateKey(date) === selectedDateKey;

              return (
                <button
                  key={index}
                  type="button"
                  className={
                    isSelected
                      ? 'calendar-day selected'
                      : dayEvents.length > 0
                        ? 'calendar-day has-event'
                        : 'calendar-day'
                  }
                  disabled={!date}
                  onClick={() => setSelectedDate(date)}
                >
                  {date ? <span>{date.getDate()}</span> : null}

                  {dayEvents.length > 0 && (
                    <div className="event-dot"></div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="calendar-events-section">
          <h3>{selectedDateKey}</h3>

          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <div className="calendar-event-card" key={event.id}>
                <div className="calendar-event-date">
                  <span>{event.event_date.split(' ')[0].substring(0, 3)}</span>
                  <strong>{event.event_date.split(' ')[1]?.replace(',', '')}</strong>
                </div>

                <div className="calendar-event-info">
                  <h4>{event.title}</h4>
                  <p>{event.event_time}</p>
                  <p>{event.location}</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  ›
                </button>
              </div>
            ))
          ) : (
            <div className="calendar-empty-card">
              <h4>No events on this date</h4>
              <p>Select another date or check the events page.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CalendarPage;