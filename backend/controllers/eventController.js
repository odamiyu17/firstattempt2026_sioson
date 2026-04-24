const db = require('../config/db');

exports.getEvents = (req, res) => {
  const sql = 'SELECT * FROM events ORDER BY id ASC';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching events',
        error: err
      });
    }

    res.json(result);
  });
};

exports.getEventById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM events WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching event',
        error: err
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    res.json(result[0]);
  });
};

exports.createEvent = (req, res) => {
  const {
    title,
    description,
    event_date,
    event_time,
    location,
    category,
    attendees,
    status,
    image_url
  } = req.body;

  const sql = `
    INSERT INTO events
    (title, event_date, event_time, location, description, attendees, status, category, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      event_date,
      event_time,
      location,
      description,
      attendees,
      status,
      category,
      image_url
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error creating event',
          error: err
        });
      }

      res.json({
        message: 'Event created',
        id: result.insertId
      });
    }
  );
};

exports.updateEvent = (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    event_date,
    event_time,
    location,
    category,
    attendees,
    status,
    image_url
  } = req.body;

  const sql = `
    UPDATE events
    SET
      title = ?,
      event_date = ?,
      event_time = ?,
      location = ?,
      description = ?,
      attendees = ?,
      status = ?,
      category = ?,
      image_url = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      event_date,
      event_time,
      location,
      description,
      attendees,
      status,
      category,
      image_url,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error updating event',
          error: err
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Event not found'
        });
      }

      res.json({
        message: 'Event updated'
      });
    }
  );
};

exports.deleteEvent = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM events WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error deleting event',
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    res.json({
      message: 'Event deleted successfully'
    });
  });
};