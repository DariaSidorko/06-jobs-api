


const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobs');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');

// Protect task routes with authentication
router.post('/job', authenticateJWT, authorizeRole('user'), createJob);
router.get('/jobs', authenticateJWT, getAllJobs);
router.get('/job/:id', authenticateJWT, getJobById);
router.patch('/job/:id', authenticateJWT, authorizeRole('user'), updateJob);
router.delete('/job/:id', authenticateJWT, authorizeRole('user'), deleteJob);

module.exports = router;
