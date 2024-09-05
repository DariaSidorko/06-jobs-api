

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthenticatedError } = require('../errors')

// Middleware to verify JWT and authenticate users
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        throw new UnauthenticatedError('Access Denied')
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new UnauthenticatedError('Invalid Token')
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateJWT};