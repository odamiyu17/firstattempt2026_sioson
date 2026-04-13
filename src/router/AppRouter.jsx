import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import EventsPage from '../pages/Events/EventsPage';
import EventDetailsPage from '../pages/EventDetails/EventDetailsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AcademicRecordsPage from '../pages/AcademicRecords/AcademicRecordsPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/academic-records" element={<AcademicRecordsPage />} />
    </Routes>
  );
}

export default AppRouter;