import Interview from '../models/Interview.js';
import Response from '../models/Response.js';
import Evaluation from '../models/Evaluation.js';
import { compileInterviewReport } from '../services/evaluationService.js';
import { evaluateAnswer } from '../services/aiService.js';

// @desc    Start an interview session
// @route   POST /api/interviews/start
// @access  Private (Student)
export const startInterview = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.id;
    const { interviewType, difficulty, duration, jobId, companyId } = req.body;

    const interview = await Interview.create({
      studentId,
      interviewType: interviewType || 'Technical Interview',
      difficulty: difficulty || 'Intermediate',
      duration: Number(duration) || 20,
      jobId: jobId || null,
      companyId: companyId || null,
      status: 'InProgress',
    });

    return res.status(201).json({ success: true, data: interview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit an answer for evaluation
// @route   POST /api/interviews/:id/response
// @access  Private (Student)
export const submitAnswerResponse = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const { questionText, answerText, topic, category } = req.body;

    const evalResult = await evaluateAnswer({
      question: questionText,
      candidateAnswer: answerText,
      topic,
      category,
    });

    const responseRecord = await Response.create({
      interviewId,
      questionText,
      answerText,
      evaluation: evalResult.feedback,
      score: evalResult.overallScore,
    });

    return res.json({ success: true, data: { response: responseRecord, evaluation: evalResult } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Conclude interview and generate report
// @route   POST /api/interviews/:id/finish
// @access  Private (Student)
export const finishInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const responses = await Response.find({ interviewId });

    const report = compileInterviewReport({ responses });

    const evaluation = await Evaluation.create({
      interviewId,
      technicalAccuracy: report.technicalScore,
      relevance: report.relevanceScore,
      communication: report.communicationScore,
      completeness: report.completenessScore,
      answerStructure: report.structureScore,
      overallScore: report.overallScore,
      strengths: report.strengths,
      weaknesses: report.weaknesses,
      improvementSuggestions: report.improvementRoadmap,
      feedback: 'Full evaluation compiled from responses.',
    });

    await Interview.findByIdAndUpdate(interviewId, {
      status: 'Completed',
      overallScore: report.overallScore,
    });

    return res.json({ success: true, message: 'Interview concluded. Report ready.', data: { report, evaluation } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's past interviews
// @route   GET /api/interviews/history
// @access  Private (Student)
export const getInterviewHistory = async (req, res) => {
  try {
    const studentId = req.user._id || req.user.id;
    const history = await Interview.find({ studentId }).sort('-createdAt');
    return res.json({ success: true, count: history.length, data: history });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
