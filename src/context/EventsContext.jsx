import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/api';

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Upcoming');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.log('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    let filteredList = [...events];

    if (category && category !== 'All') {
      filteredList = filteredList.filter((event) => {
        return event.category === category;
      });
    }

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();

      filteredList = filteredList.filter((event) => {
        const titleMatch = event.title.toLowerCase().includes(lowerSearch);
        const locationMatch = event.location.toLowerCase().includes(lowerSearch);
        const descriptionMatch = event.description.toLowerCase().includes(lowerSearch);

        return titleMatch || locationMatch || descriptionMatch;
      });
    }

    return filteredList;
  }, [events, searchTerm, category]);

  const resetEventFilters = () => {
    setCategory('Upcoming');
    setSearchTerm('');
  };

  const value = {
    events,
    setEvents,
    filteredEvents,
    loading,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    fetchEvents,
    resetEventFilters
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error('useEvents must be used inside an EventsProvider');
  }

  return context;
}