import Interview from '../models/Interview.js';
import { generateQuestions, generateFollowUp, evaluateAnswer } from '../services/aiService.js';

export async function questions(req, res, next) {
  try { const data = await generateQuestions(req.body); res.json({ success: true, count: data.length, data }); }
  catch (e) { next(e); }
}
export async function followUp(req, res, next) {
  try { const followUp = await generateFollowUp(req.body); res.json({ success: true, data: { followUp } }); }
  catch (e) { next(e); }
}
export async function evaluate(req, res, next) {
  try { const data = await evaluateAnswer(req.body); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
export async function startInterview(req, res, next) {
  try {
    const payload = { ...req.body, studentId: req.user._id };
    const questionsList = await generateQuestions(payload);
    const interview = await Interview.create({ studentId: req.user._id, title: payload.title || `${payload.category || 'Mock'} Interview`, category: payload.category, difficulty: payload.difficulty, topic: payload.topic, questions: questionsList });
    res.status(201).json({ success: true, data: interview });
  } catch (e) { next(e); }
}
export async function submitInterview(req, res, next) {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, studentId: req.user._id });
    if (!interview) return res.status(404).json({ success: false, message: 'Interview not found.' });
    const responses = Array.isArray(req.body.responses) ? req.body.responses : [];
    const evaluations = [];
    for (const answer of responses) evaluations.push(await evaluateAnswer({ question: answer.question || '', candidateAnswer: answer.answer || '', category: interview.category }));
    const score = evaluations.length ? Number((evaluations.reduce((sum, x) => sum + Number(x.overallScore || 0), 0) / evaluations.length).toFixed(1)) : 0;
    interview.responses = responses.map((x, i) => ({ ...x, evaluation: evaluations[i] }));
    interview.score = score; interview.feedback = { evaluations }; interview.status = 'completed';
    await interview.save(); res.json({ success: true, data: interview });
  } catch (e) { next(e); }
}
export async function interviewHistory(req, res, next) {
  try { const data = await Interview.find({ studentId: req.user._id }).sort({ createdAt: -1 }); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
export async function interviewById(req, res, next) {
  try { const data = await Interview.findOne({ _id: req.params.id, studentId: req.user._id }); if (!data) return res.status(404).json({ success: false, message: 'Interview not found.' }); res.json({ success: true, data }); }
  catch (e) { next(e); }
}
