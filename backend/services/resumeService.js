import pdfParse from 'pdf-parse';

export const parseResumeBuffer = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    const rawText = data.text;

    // Simple keyword extraction for key technical domains
    const commonKeywords = [
      'React', 'Node.js', 'Python', 'TypeScript', 'JavaScript', 'Java', 'C++',
      'Go', 'SQL', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS',
      'System Design', 'Git', 'GraphQL', 'REST API', 'Redis', 'Machine Learning'
    ];

    const detectedSkills = commonKeywords.filter((kw) =>
      new RegExp(`\\b${kw}\\b`, 'i').test(rawText)
    );

    return {
      text: rawText,
      extractedSkills: detectedSkills,
      numPages: data.numpages,
    };
  } catch (error) {
    console.warn('[Resume Parser Warning] Failed to parse PDF buffer:', error.message);
    return {
      text: '',
      extractedSkills: [],
      numPages: 0,
    };
  }
};
