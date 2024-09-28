import { getAllFeedback } from './database.js';


export async function analyzeAllFeedback() {
  const allFeedback = await getAllFeedback();

  const averageRatings = calculateAverageRatings(allFeedback);
  const commonIssues = identifyCommonIssues(allFeedback);
  const trends = identifyTrends(allFeedback);

  return {
    averageRatings,
    commonIssues,
    trends
  };
}

export function calculateAverageRatings(feedback) {
  // Calculate average ratings for each question
  return feedback.reduce((acc, entry) => {
    entry.responses.forEach((response, index) => {
      if (!acc[index]) acc[index] = { sum: 0, count: 0 };
      acc[index].sum += parseInt(response.charAt(0));  //rating ko number mein convert
      acc[index].count++;
    });
    return acc;
  }, []).map(q => q.sum / q.count);
}

//extra hai ...as of now leave
export function identifyCommonIssues(feedback) {
  return ["Placeholder issue 1", "Placeholder issue 2"];
}


//extra hai ...as of now leave
export function identifyTrends(feedback) {
  return ["Placeholder trend 1", "Placeholder trend 2"];
}

//module.exports = { analyzeAllFeedback };