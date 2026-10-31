import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Interview from '../models/Interview.js';
import Application from '../models/Application.js';
import Question from '../models/Question.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Get platform overview metrics
// @route   GET /api/admin/metrics
// @access  Private (Admin)
export const getAdminMetrics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCompanies = await Company.countDocuments();
    const verifiedCompanies = await Company.countDocuments({ verificationStatus: 'verified' });
    const pendingCompanies = await Company.countDocuments({ verificationStatus: 'pending' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalInterviews = await Interview.countDocuments();

    return res.json({
      success: true,
      data: {
        totalStudents,
        totalCompanies,
        verifiedCompanies,
        pendingCompanies,
        totalJobs,
        totalApplications,
        totalInterviews,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get companies for verification
// @route   GET /api/admin/companies
// @access  Private (Admin)
export const getCompaniesForVerification = async (req, res) => {
  try {
    const companies = await Company.find().populate('userId', 'email name phone').sort('-createdAt');
    return res.json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or reject company verification
// @route   PATCH /api/admin/companies/:id/verify
// @access  Private (Admin)
export const verifyCompany = async (req, res) => {
  try {
    const { status } = req.body; // 'verified' | 'rejected' | 'suspended'
    const company = await Company.findByIdAndUpdate(req.params.id, { verificationStatus: status }, { new: true });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    // Notify company
    await createNotification({
      recipientId: company.userId,
      title: `Company Verification: ${status.toUpperCase()}`,
      message: status === 'verified'
        ? 'Your company profile has been approved! You can now publish job openings.'
        : `Your company verification status is now: ${status}.`,
      type: 'admin',
    });

    return res.json({ success: true, message: `Company verification updated to ${status}`, data: company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin)
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-passwordHash').sort('-createdAt');
    return res.json({ success: true, count: students.length, data: students });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Manage Question Bank
// @route   GET /api/admin/questions
// @access  Private (Admin)
export const getQuestionBank = async (req, res) => {
  try {
    const questions = await Question.find().sort('-createdAt');
    return res.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return res.status(201).json({ success: true, data: question });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
