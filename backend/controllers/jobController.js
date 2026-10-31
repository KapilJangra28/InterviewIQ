import Job from '../models/Job.js';
import Company from '../models/Company.js';

// @desc    Get all jobs (public browse with search and filtering)
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const { search, workMode, employmentType, location } = req.query;

    const query = { status: 'Active' };

    if (workMode && workMode !== 'All') {
      query.workMode = workMode;
    }

    if (employmentType && employmentType !== 'All') {
      query.employmentType = employmentType;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(query).populate('companyId', 'companyName logo location verificationStatus');
    return res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('companyId', 'companyName logo location website description verificationStatus');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    return res.json({ success: true, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create job posting
// @route   POST /api/jobs
// @access  Private (Company - Verified only)
export const createJob = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const company = await Company.findOne({ userId });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found.' });
    }

    // Strict rule: Companies must undergo admin verification before publishing job openings
    if (company.verificationStatus !== 'verified') {
      return res.status(403).json({
        success: false,
        message: 'Action forbidden: Your company has not been verified by an Administrator yet.',
      });
    }

    const {
      title,
      description,
      skills,
      qualifications,
      experience,
      salary,
      location,
      workMode,
      employmentType,
      vacancies,
      deadline,
    } = req.body;

    const skillList = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim())
      : [];

    const job = await Job.create({
      companyId: company._id,
      title,
      description,
      skills: skillList,
      qualifications: qualifications || '',
      experience: experience || '0-2 years',
      salary: salary || 'Competitive',
      location: location || company.location,
      workMode: workMode || 'Hybrid',
      employmentType: employmentType || 'Full-time',
      vacancies: Number(vacancies) || 1,
      deadline: deadline ? new Date(deadline) : null,
      status: 'Active',
    });

    return res.status(201).json({ success: true, message: 'Job opening published successfully!', data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get jobs posted by the logged in company
// @route   GET /api/jobs/my-jobs
// @access  Private (Company)
export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const jobs = await Job.find({ companyId: company._id }).sort('-createdAt');
    return res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update / Close job
// @route   PATCH /api/jobs/:id/status
// @access  Private (Company)
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.json({ success: true, message: `Job status updated to ${status}`, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
