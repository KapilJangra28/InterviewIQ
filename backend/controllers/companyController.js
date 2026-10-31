import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Interview from '../models/Interview.js';

export async function dashboard(req, res, next) {
  try {
    const jobs = await Job.find({ companyId: req.user._id }).select('_id');
    const jobIds = jobs.map(j => j._id);
    const [applications, completedInterviews] = await Promise.all([
      Application.countDocuments({ jobId: { $in: jobIds } }),
      Interview.countDocuments({ status: 'completed' })
    ]);
    res.json({ success: true, data: { totalJobs: jobs.length, activeJobs: jobs.length, totalApplicants: applications, completedInterviews } });
  } catch (e) { next(e); }
}
export async function getCompanyProfile(req, res, next) {
  try { const data = await Company.findOne({ userId: req.user._id }); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
