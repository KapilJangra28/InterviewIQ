export const compileInterviewReport = ({ responses = [] }) => {
  if (responses.length === 0) {
    return {
      overallScore: 8.0,
      technicalScore: 8.0,
      relevanceScore: 8.0,
      communicationScore: 8.0,
      completenessScore: 8.0,
      structureScore: 8.0,
      strengths: ['Clear delivery and structured reasoning.'],
      weaknesses: ['Add more quantified benchmarks in responses.'],
      improvementRoadmap: ['Practice STAR technique transitions.', 'Review distributed caching patterns.'],
    };
  }

  const avg = (arr) => Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1));

  const technicalScores = responses.map((r) => r.evaluation?.technicalAccuracy || r.score || 8.0);
  const relevanceScores = responses.map((r) => r.evaluation?.relevance || r.score || 8.0);
  const communicationScores = responses.map((r) => r.evaluation?.communication || r.score || 8.0);
  const completenessScores = responses.map((r) => r.evaluation?.completeness || r.score || 8.0);
  const structureScores = responses.map((r) => r.evaluation?.answerStructure || r.score || 8.0);

  const overall = avg([
    avg(technicalScores),
    avg(relevanceScores),
    avg(communicationScores),
    avg(completenessScores),
    avg(structureScores),
  ]);

  return {
    overallScore: overall,
    technicalScore: avg(technicalScores),
    relevanceScore: avg(relevanceScores),
    communicationScore: avg(communicationScores),
    completenessScore: avg(completenessScores),
    structureScore: avg(structureScores),
    strengths: [
      'Demonstrated strong theoretical foundation and architectural clarity.',
      'Effectively broken down complex algorithmic constraints into approachable units.'
    ],
    weaknesses: [
      'Expand upon failure mitigation strategies during distributed outages.'
    ],
    improvementRoadmap: [
      'Review consensus algorithms (Raft, Paxos).',
      'Refine verbal conciseness to maximize content within 2-minute answers.'
    ]
  };
};
