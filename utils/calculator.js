import { useState } from "react";
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
export const generateKeywords= async function(jobTitle, jobDescription) {

    const prompt = `Job title: ${jobTitle}\n\nJob description: ${jobDescription}\n\nKeywords:`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: '\n\n',
  });
  // var array = JSON.parse("[" +  + "]");
  var string = response.data.choices[0].text;
  var array = string.split(",");
  console.log(array);
  return array;
  }
  
  // import { generateKeywords } from "@/utils/calculator";

  // const [keywords, setKeywords] = useState([]); 
  // const jobTitle = 'Software Engineer';
  // const jobDescription = 'We are looking for a skilled Software Engineer with experience in JavaScript, React, and Node.js. The ideal candidate should have a strong understanding of web development principles and be able to work in an agile team environment.';
  

  // useEffect(() => {
  //   generateKeywords(jobTitle, jobDescription)
  //   .then(keywords => {
  //     setKeywords(keywords);
  //   })
  //   .catch(err => {
  //     console.error('Error:', err);
  //   });
  // }, []);

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

  