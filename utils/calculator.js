import { Configuration, OpenAIApi } from "openai";

export function calculateMatchingScore(resume, keywords) {
    const resumeText = JSON.stringify(resume).toLowerCase(); // Convert the resume to lowercase string
    const keywordArray = keywords.map(keyword => keyword.toLowerCase()); // Convert the keywords to lowercase array
  
    let matchingScore = 0;
    for (const keyword of keywordArray) {
      if (resumeText.includes(keyword)) {
        matchingScore++;
      }
    }
  

    return (matchingScore/keywords.length)*100;
}

  