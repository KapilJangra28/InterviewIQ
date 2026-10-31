import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import Company from '../models/Company.js';
import { generateToken } from '../utils/generateToken.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

// @desc    Register a new student
// @route   POST /api/auth/register/student
// @access  Public
export const registerStudent = async (req, res) => {
  const { name, email, password, phone, college, degree, branch, graduationYear, skills } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address format.' });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash: password,
      role: 'student',
      phone: phone || '',
      profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    });

    const studentProfile = await StudentProfile.create({
      userId: user._id,
      college: college || '',
      degree: degree || 'B.Tech',
      branch: branch || '',
      graduationYear: Number(graduationYear) || 2025,
      skills: Array.isArray(skills) ? skills : [],
    });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          profileImage: user.profileImage,
          studentProfile,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register a new company
// @route   POST /api/auth/register/company
// @access  Public
export const registerCompany = async (req, res) => {
  const { companyName, email, password, website, industry, description, location, contactPerson, logo } = req.body;

  if (!companyName || !email || !password || !contactPerson) {
    return res.status(400).json({ success: false, message: 'Please fill in all required company registration fields.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid corporate email format.' });
  }

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name: contactPerson,
      email: email.toLowerCase(),
      passwordHash: password,
      role: 'company',
      profileImage: logo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(companyName)}`,
    });

    const company = await Company.create({
      userId: user._id,
      companyName,
      description: description || '',
      industry: industry || 'Technology & Software',
      website: website || '',
      location: location || '',
      contactPerson,
      logo: logo || '',
      verificationStatus: 'pending', // Requires admin verification
    });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: 'Company registered. Profile submitted for admin verification.',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyProfile: company,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ success: false, message: `Access denied. Account is not registered as a '${role}'.` });
    }

    if (user.accountStatus === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by an administrator.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    let extraProfile = null;
    if (user.role === 'student') {
      extraProfile = await StudentProfile.findOne({ userId: user._id });
    } else if (user.role === 'company') {
      extraProfile = await Company.findOne({ userId: user._id });
    }

    const token = generateToken(user._id, user.role);

    return res.json({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          profileImage: user.profileImage,
          accountStatus: user.accountStatus,
          ...(user.role === 'student' ? { studentProfile: extraProfile } : {}),
          ...(user.role === 'company' ? { companyProfile: extraProfile } : {}),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let extraProfile = null;
    if (user.role === 'student') {
      extraProfile = await StudentProfile.findOne({ userId: user._id });
    } else if (user.role === 'company') {
      extraProfile = await Company.findOne({ userId: user._id });
    }

    return res.json({
      success: true,
      data: {
        user: {
          ...user.toObject(),
          ...(user.role === 'student' ? { studentProfile: extraProfile } : {}),
          ...(user.role === 'company' ? { companyProfile: extraProfile } : {}),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
