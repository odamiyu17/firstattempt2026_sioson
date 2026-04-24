import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import HomePage from '../pages/Home/HomePage';
import EventsPage from '../pages/Events/EventsPage';
import EventDetailsPage from '../pages/EventDetails/EventDetailsPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AcademicRecordsPage from '../pages/AcademicRecords/AcademicRecordsPage';
import MyRegistrationsPage from '../pages/MyRegistrations/MyRegistrationsPage';
import AdminEventsPage from '../pages/Admin/AdminEventsPage';
import NewsUpdatesPage from '../pages/NewsUpdates/NewsUpdatesPage';
import NewsDetailsPage from '../pages/NewsUpdates/NewsDetailsPage';
import JobsPage from '../pages/Jobs/JobsPage';
import JobDetailsPage from '../pages/Jobs/JobDetailsPage';
import CalendarPage from '../pages/Calendar/CalendarPage';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute>
            <MyRegistrationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news-updates"
        element={
          <ProtectedRoute>
            <NewsUpdatesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news/:id"
        element={
          <ProtectedRoute>
            <NewsDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <AdminEventsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/academic-records"
        element={
          <ProtectedRoute>
            <AcademicRecordsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;