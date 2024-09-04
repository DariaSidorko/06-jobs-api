

const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// Create a Job
// POST api/job
const createJob  = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
};

// Get All jobs 
// GET api/jobs
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
  }

// Get job by ID
// GET api/job/:id
  const getJobById = async (req, res) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req
    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId,
    })
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
  }

  // Update the job
  // PATCH api/job/:id
  const updateJob = async (req, res) => {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req
  
    if (company === '' || position === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
  }
  
  // Delete the job
  // DELETE api/job/:id
  const deleteJob = async (req, res) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req
  
    const job = await Job.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    })
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
  }


module.exports = {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    getJobById,
  }
  
