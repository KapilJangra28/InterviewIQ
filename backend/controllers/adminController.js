import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';

export async function dashboard(req, res, next) {
  try {
    const [students, companies, jobs, pendingCompanies] = await Promise.all([
      User.countDocuments({ role: 'student' }), User.countDocuments({ role: 'company' }),
      Job.countDocuments(), Company.countDocuments({ verificationStatus: 'pending' })
    ]);
    res.json({ success: true, data: { students, companies, jobs, pendingCompanies } });
  } catch (e) { next(e); }
}
export async function listCompanies(req, res, next) {
  try { const data = await Company.find().sort({ createdAt: -1 }).populate('userId', 'name email accountStatus'); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
export async function verifyCompany(req, res, next) {
  try {
    const status = req.body.status;
    if (!['verified', 'rejected', 'pending'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid verification status.' });
    const data = await Company.findByIdAndUpdate(req.params.id, { verificationStatus: status }, { new: true });
    if (!data) return res.status(404).json({ success: false, message: 'Company not found.' });
    res.json({ success: true, data });
  } catch (e) { next(e); }
}
export async function listStudents(req, res, next) {
  try { const data = await User.find({ role: 'student' }).select('-passwordHash').sort({ createdAt: -1 }); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
export async function listAllJobs(req, res, next) {
  try { const data = await Job.find().sort({ createdAt: -1 }).populate('companyId', 'name email'); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
export async function moderateJob(req, res, next) {
  try {
    const data = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!data) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, data });
  } catch (e) { next(e); }
}
