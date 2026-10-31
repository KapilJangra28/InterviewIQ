import { generateQuestions, generateFollowUp, evaluateAnswer, matchResumeToJob } from '../services/aiService.js';

// @desc    Generate interview questions
// @route   POST /api/ai/questions
// @access  Public / Protected
export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty, topic, language, count } = req.body;
    const questions = await generateQuestions({ category, difficulty, topic, language, count });
    return res.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate follow-up question
// @route   POST /api/ai/follow-up
// @access  Public / Protected
export const getFollowUp = async (req, res) => {
  try {
    const { question, candidateAnswer, topic } = req.body;
    const followUp = await generateFollowUp({ question, candidateAnswer, topic });
    return res.json({ success: true, data: { followUp } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Screen candidate against job requirements
// @route   POST /api/ai/screen-candidate
// @access  Private (Company / Admin)
export const screenCandidate = async (req, res) => {
  try {
    const { resumeText, candidateSkills, jobRequirements } = req.body;
    const match = await matchResumeToJob({ resumeText, candidateSkills, jobRequirements });
    return res.json({ success: true, data: match });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
