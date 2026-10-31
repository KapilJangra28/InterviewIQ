import { GoogleGenAI } from '@google/genai';

let client;
const getClient = () => {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
};

export async function generateQuestions({ category = 'Technical', difficulty = 'Intermediate', topic = 'General', language = 'English', count = 5 } = {}) {
  const n = Math.min(Math.max(Number(count) || 5, 1), 15);
  const ai = getClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create ${n} distinct ${difficulty} ${category} interview questions about ${topic}. Language: ${language}. Return JSON array only with objects {"question":"...","topic":"...","hint":"...","expectedPoints":["..."]}.`,
        config: { responseMimeType: 'application/json' }
      });
      const parsed = JSON.parse(response.text);
      if (Array.isArray(parsed) && parsed.length) return parsed.slice(0, n);
    } catch (error) { console.error('[Gemini question generation]', error.message); }
  }
  return Array.from({ length: n }, (_, i) => ({
    question: [
      `Explain the fundamental concepts of ${topic} and where they are useful.`,
      `Describe a challenging problem you solved involving ${topic}.`,
      `What trade-offs would you consider when designing a solution using ${topic}?`,
      `How would you test and debug a system built around ${topic}?`,
      `What common mistakes do beginners make with ${topic}?`
    ][i % 5], topic, hint: 'Structure your answer, explain your reasoning, and provide an example.', expectedPoints: ['Clear explanation', 'Relevant example', 'Trade-offs', 'Practical reasoning']
  }));
}

export async function generateFollowUp({ question = '', candidateAnswer = '', topic = 'General' } = {}) {
  const ai = getClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Asked: ${question}\nAnswer: ${candidateAnswer}\nTopic: ${topic}\nGive one concise follow-up question only.` });
      if (response.text?.trim()) return response.text.trim();
    } catch (error) { console.error('[Gemini follow-up]', error.message); }
  }
  return `Can you give a practical example and explain one limitation of your answer about ${topic}?`;
}

export async function evaluateAnswer({ question = '', candidateAnswer = '', category = 'Technical' } = {}) {
  const ai = getClient();
  if (ai && candidateAnswer.trim()) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Evaluate the candidate response for a ${category} interview. Question: ${question}\nAnswer: ${candidateAnswer}\nReturn JSON only: {"technicalAccuracy":0,"relevance":0,"communication":0,"completeness":0,"answerStructure":0,"overallScore":0,"strengths":[""],"weaknesses":[""],"feedback":"","improvementSuggestions":[""]}. Scores 0-10.`,
        config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text);
    } catch (error) { console.error('[Gemini evaluation]', error.message); }
  }
  const score = Math.min(8, Math.max(2, Number((candidateAnswer.trim().length / 35).toFixed(1))));
  return { technicalAccuracy: score, relevance: score, communication: score, completeness: score, answerStructure: score, overallScore: score, strengths: ['Response received and recorded.'], weaknesses: ['Automated AI evaluation is unavailable; add GEMINI_API_KEY for detailed feedback.'], feedback: 'This is a basic fallback score based on response length, not a measure of answer correctness.', improvementSuggestions: ['Add examples and explain your reasoning.', 'Address edge cases and trade-offs.'] };
}
