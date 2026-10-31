import Application from '../models/Application.js';
import Job from '../models/Job.js';

export async function applyToJob(req, res, next) {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, status: 'open' });
    if (!job) return res.status(404).json({ success: false, message: 'Open job not found.' });
    const application = await Application.create({ jobId: job._id, studentId: req.user._id, coverLetter: req.body.coverLetter || '', resumeUrl: req.body.resumeUrl || '' });
    res.status(201).json({ success: true, data: application });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ success: false, message: 'You have already applied to this job.' });
    next(e);
  }
}

export async function myApplications(req, res, next) {
  try { const apps = await Application.find({ studentId: req.user._id }).sort({ createdAt: -1 }).populate('jobId'); res.json({ success: true, data: apps }); }
  catch (e) { next(e); }
}

export async function jobApplicants(req, res, next) {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, companyId: req.user._id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    const apps = await Application.find({ jobId: job._id }).sort({ createdAt: -1 }).populate('studentId', 'name email phone profileImage');
    res.json({ success: true, data: apps });
  } catch (e) { next(e); }
}

export async function updateApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application || String(application.jobId.companyId) !== String(req.user._id)) return res.status(404).json({ success: false, message: 'Application not found.' });
    const allowed = ['reviewing', 'shortlisted', 'rejected', 'hired'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: 'Invalid application status.' });
    application.status = req.body.status; await application.save();
    res.json({ success: true, data: application });
  } catch (e) { next(e); }
}
