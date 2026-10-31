import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import Company from '../models/Company.js';
import { generateToken } from '../utils/generateToken.js';

const publicUser = (u, extra = {}) => ({ _id: u._id, name: u.name, email: u.email, role: u.role, phone: u.phone, profileImage: u.profileImage, accountStatus: u.accountStatus, ...extra });

export async function registerStudent(req, res, next) {
  try {
    const { name, email, password, phone, college, degree, branch, graduationYear, skills } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ success: false, message: 'Email already registered.' });
    const user = await User.create({ name, email, passwordHash: password, phone, role: 'student' });
    const profile = await StudentProfile.create({ userId: user._id, college, degree, branch, graduationYear: Number(graduationYear) || undefined, skills: Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map(x => x.trim()).filter(Boolean) : [] });
    res.status(201).json({ success: true, data: { token: generateToken(user._id, user.role), user: publicUser(user, { studentProfile: profile }) } });
  } catch (e) { next(e); }
}

export async function registerCompany(req, res, next) {
  try {
    const { companyName, email, password, website, industry, description, location, contactPerson, logo } = req.body;
    if (!companyName || !email || !password || !contactPerson) return res.status(400).json({ success: false, message: 'Company name, contact person, email and password are required.' });
    if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ success: false, message: 'Email already registered.' });
    const user = await User.create({ name: contactPerson, email, passwordHash: password, role: 'company', profileImage: logo || '' });
    const companyProfile = await Company.create({ userId: user._id, companyName, website, industry, description, location, contactPerson, logo });
    res.status(201).json({ success: true, data: { token: generateToken(user._id, user.role), user: publicUser(user, { companyProfile }) } });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    if (role && role !== user.role) return res.status(403).json({ success: false, message: `This account is not registered as ${role}.` });
    if (user.accountStatus !== 'active') return res.status(403).json({ success: false, message: 'Account is not active.' });
    const extra = user.role === 'student' ? { studentProfile: await StudentProfile.findOne({ userId: user._id }) } : user.role === 'company' ? { companyProfile: await Company.findOne({ userId: user._id }) } : {};
    res.json({ success: true, data: { token: generateToken(user._id, user.role), user: publicUser(user, extra) } });
  } catch (e) { next(e); }
}

export async function getMe(req, res) {
  let extra = {};
  if (req.user.role === 'student') extra.studentProfile = await StudentProfile.findOne({ userId: req.user._id });
  if (req.user.role === 'company') extra.companyProfile = await Company.findOne({ userId: req.user._id });
  res.json({ success: true, data: { user: publicUser(req.user, extra) } });
}
