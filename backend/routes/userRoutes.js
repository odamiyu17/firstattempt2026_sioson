const express = require('express');
const router = express.Router();

const {
  getUsers,
  loginUser,
  getUserById,
  updateUserById
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);

module.exports = router;