import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import Roadmap from '../models/Roadmap.js';
import { parseResumeBuffer } from '../services/resumeService.js';

// @desc    Get current student profile
// @route   GET /api/student/profile
// @access  Private (Student)
export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const profile = await StudentProfile.findOne({ userId }).populate('userId', 'name email phone profileImage');
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }
    return res.json({ success: true, data: profile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private (Student)
export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, phone, college, degree, branch, graduationYear, skills, projects, certifications } = req.body;

    if (name || phone) {
      await User.findByIdAndUpdate(userId, { ...(name && { name }), ...(phone && { phone }) });
    }

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      {
        ...(college !== undefined && { college }),
        ...(degree !== undefined && { degree }),
        ...(branch !== undefined && { branch }),
        ...(graduationYear !== undefined && { graduationYear: Number(graduationYear) }),
        ...(skills !== undefined && { skills }),
        ...(projects !== undefined && { projects }),
        ...(certifications !== undefined && { certifications }),
      },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: 'Profile updated successfully.', data: updatedProfile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload & parse resume
// @route   POST /api/student/resume
// @access  Private (Student)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please provide a resume file.' });
    }

    const userId = req.user._id || req.user.id;
    const parsed = await parseResumeBuffer(req.file.buffer);

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      {
        resume: req.file.originalname,
        ...(parsed.extractedSkills.length > 0 && { $addToSet: { skills: { $each: parsed.extractedSkills } } }),
      },
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: 'Resume parsed and skills extracted successfully!',
      data: {
        resumeFilename: req.file.originalname,
        extractedSkills: parsed.extractedSkills,
        profile: updatedProfile,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get learning roadmap
// @route   GET /api/student/roadmap
// @access  Private (Student)
export const getRoadmap = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let roadmap = await Roadmap.findOne({ studentId: userId });

    if (!roadmap) {
      // Create initial roadmap
      roadmap = await Roadmap.create({
        studentId: userId,
        goals: ['Master Distributed Systems & Caching', 'Achieve 8.8+ Mock Rubric Score'],
        weakTopics: ['Distributed Concurrency', 'Redis Lua Scripts', 'STAR Behavioral Transitions'],
        tasks: [
          { day: 'Day 1', title: 'Distributed Concurrency & Redis Lua Scripts', topic: 'System Design', duration: '25 mins', completed: true },
          { day: 'Day 2', title: 'STAR Method: Resolving Senior Architectural Deadlocks', topic: 'Behavioral', duration: '20 mins', completed: false },
          { day: 'Day 3', title: 'Database B+ Tree Indexing & Range Scan Optimization', topic: 'Databases', duration: '30 mins', completed: false },
        ],
        progress: 33,
      });
    }

    return res.json({ success: true, data: roadmap });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
