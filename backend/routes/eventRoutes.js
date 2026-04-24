const express = require('express');
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// ✅ GET all events
router.get('/', getEvents);

// ✅ GET single event
router.get('/:id', getEventById);

// 🔥 ADD THIS (missing!)
router.post('/', createEvent);

// 🔥 ADD THIS (for edit)
router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;