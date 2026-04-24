const db = require('../config/db');

exports.registerForEvent = (req, res) => {
  const { user_id, event_id } = req.body;

  if (!user_id || !event_id) {
    return res.status(400).json({
      message: 'User ID and Event ID are required'
    });
  }

  const sql = 'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)';

  db.query(sql, [user_id, event_id], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          message: 'You are already registered for this event'
        });
      }

      return res.status(500).json({
        message: 'Error registering for event',
        error: err
      });
    }

    res.status(201).json({
      message: 'Registration successful'
    });
  });
};

exports.getRegistrationsByUser = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      registrations.id,
      events.id AS event_id,
      events.title,
      events.event_date,
      events.event_time,
      events.location,
      events.status,
      events.attendees
    FROM registrations
    INNER JOIN events ON registrations.event_id = events.id
    WHERE registrations.user_id = ?
    ORDER BY registrations.registered_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching registrations',
        error: err
      });
    }

    res.json(result);
  });
};

exports.unregisterFromEvent = (req, res) => {
  const { registrationId } = req.params;

  const sql = 'DELETE FROM registrations WHERE id = ?';

  db.query(sql, [registrationId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error cancelling registration',
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Registration not found'
      });
    }

    res.json({
      message: 'Registration cancelled successfully'
    });
  });
};