

// controllers/jobController.js
const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// Create a Job
const createJob  = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
  }

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
  
