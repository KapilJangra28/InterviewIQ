import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Company from '../models/Company.js';
import StudentProfile from '../models/StudentProfile.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Apply for a job
// @route   POST /api/applications/apply
// @access  Private (Student)
export const applyForJob = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.id;
    const { jobId, resume } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opening not found.' });
    }

    // Check duplicate
    const existing = await Application.findOne({ studentId, jobId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already applied for this position.' });
    }

    const application = await Application.create({
      studentId,
      companyId: job.companyId,
      jobId,
      resume: resume || '',
      status: 'Applied',
    });

    // Notify company recruiter
    const company = await Company.findById(job.companyId);
    if (company) {
      await createNotification({
        recipientId: company.userId,
        title: 'New Candidate Application Received',
        message: `A candidate submitted an application for ${job.title}.`,
        type: 'application',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current student's applications
// @route   GET /api/applications/my-applications
// @access  Private (Student)
export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.id;
    const applications = await Application.find({ studentId })
      .populate('jobId', 'title location salary workMode employmentType')
      .populate('companyId', 'companyName logo location')
      .sort('-appliedAt');

    return res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applicants for a company
// @route   GET /api/applications/company-applicants
// @access  Private (Company)
export const getCompanyApplicants = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const applications = await Application.find({ companyId: company._id })
      .populate('studentId', 'name email phone profileImage')
      .populate('jobId', 'title skills')
      .sort('-appliedAt');

    return res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Shortlist, Reject, Schedule, etc.)
// @route   PATCH /api/applications/:id/status
// @access  Private (Company)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, recruiterNotes } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(recruiterNotes !== undefined && { recruiterNotes }),
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Notify student of status update
    await createNotification({
      recipientId: application.studentId,
      title: `Application Status: ${status}`,
      message: recruiterNotes || `Your application status has progressed to ${status}.`,
      type: 'application',
    });

    return res.json({ success: true, message: `Status updated to ${status}`, data: application });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
