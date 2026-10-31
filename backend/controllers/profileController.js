import StudentProfile from '../models/StudentProfile.js';
import Company from '../models/Company.js';
import User from '../models/User.js';

export async function getProfile(req, res, next) {
  try {
    const profile = req.user.role === 'student' ? await StudentProfile.findOne({ userId: req.user._id }) : req.user.role === 'company' ? await Company.findOne({ userId: req.user._id }) : null;
    res.json({ success: true, data: { user: req.user, profile } });
  } catch (e) { next(e); }
}

export async function updateProfile(req, res, next) {
  try {
    const userFields = ['name', 'phone', 'profileImage'];
    userFields.forEach(k => { if (req.body[k] !== undefined) req.user[k] = req.body[k]; });
    await req.user.save();
    let profile = null;
    if (req.user.role === 'student') {
      const allowed = ['college', 'degree', 'branch', 'graduationYear', 'skills', 'projects', 'certifications', 'resume'];
      const update = Object.fromEntries(allowed.filter(k => req.body[k] !== undefined).map(k => [k, req.body[k]]));
      profile = await StudentProfile.findOneAndUpdate({ userId: req.user._id }, { $set: update, $setOnInsert: { userId: req.user._id } }, { upsert: true, new: true });
    } else if (req.user.role === 'company') {
      const allowed = ['companyName', 'description', 'industry', 'website', 'location', 'contactPerson', 'logo'];
      const update = Object.fromEntries(allowed.filter(k => req.body[k] !== undefined).map(k => [k, req.body[k]]));
      profile = await Company.findOneAndUpdate({ userId: req.user._id }, { $set: update, $setOnInsert: { userId: req.user._id, companyName: req.user.name } }, { upsert: true, new: true });
    }
    res.json({ success: true, data: { user: req.user, profile } });
  } catch (e) { next(e); }
}
