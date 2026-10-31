import Job from '../models/Job.js';

export async function listJobs(req, res, next) {
  try {
    const filter = { status: 'open' };
    if (req.query.search) filter.$or = [
      { title: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { companyName: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
    ];
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(100).populate('companyId', 'name email');
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (e) { next(e); }
}

export async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id).populate('companyId', 'name email');
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, data: job });
  } catch (e) { next(e); }
}

export async function createJob(req, res, next) {
  try {
    const { title, description, location, employmentType, experience, salary, skills } = req.body;
    if (!title || !description) return res.status(400).json({ success: false, message: 'Title and description are required.' });
    const job = await Job.create({ companyId: req.user._id, companyName: req.user.name, title, description, location, employmentType, experience, salary, skills: Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : [] });
    res.status(201).json({ success: true, data: job });
  } catch (e) { next(e); }
}

export async function myJobs(req, res, next) {
  try { const jobs = await Job.find({ companyId: req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, data: jobs }); }
  catch (e) { next(e); }
}

export async function updateJob(req, res, next) {
  try {
    const job = await Job.findOne({ _id: req.params.id, companyId: req.user._id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    const allowed = ['title', 'description', 'location', 'employmentType', 'experience', 'salary', 'skills', 'status'];
    allowed.forEach(k => { if (req.body[k] !== undefined) job[k] = req.body[k]; });
    await job.save(); res.json({ success: true, data: job });
  } catch (e) { next(e); }
}

export async function deleteJob(req, res, next) {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.user._id });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found.' });
    res.json({ success: true, message: 'Job deleted.' });
  } catch (e) { next(e); }
}
