

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth');

// Public routes for authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;