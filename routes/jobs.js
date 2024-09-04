
const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobs');
const { authenticateJWT } = require('../middleware/auth');

// Protect task routes with authentication
router.post('/job', authenticateJWT, createJob);
router.get('/jobs', authenticateJWT, getAllJobs);
router.get('/job/:id', authenticateJWT, getJobById);
router.patch('/job/:id', authenticateJWT, updateJob);
router.delete('/job/:id', authenticateJWT, deleteJob);

module.exports = router;
