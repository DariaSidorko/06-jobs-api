
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  res.status(' get all jobs')
}

const getJob = async (req, res) => {
    res.status(' getJob')
  }

  const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
  }

const updateJob = async (req, res) => {
    res.status(' updateJob')
  }
  
  const deleteJob = async (req, res) => {
    res.status(' deleteJob')
  }

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
