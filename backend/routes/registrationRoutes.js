const express = require('express');
const router = express.Router();

const {
  registerForEvent,
  getRegistrationsByUser,
  unregisterFromEvent
} = require('../controllers/registrationController');

router.post('/', registerForEvent);
router.get('/user/:userId', getRegistrationsByUser);
router.delete('/:registrationId', unregisterFromEvent);

module.exports = router;