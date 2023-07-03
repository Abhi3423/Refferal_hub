import { useState } from "react";
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  organization: "org-iOUgrhP1WtQWIQN0zQiFtLqb",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_APIKEY,
});
const openai = new OpenAIApi(configuration);
export const generateKeywords= async function(jobTitle, jobDescription) {

    const prompt = `Job title: ${jobTitle}\n\nJob description: ${jobDescription}\n\n Keywords: [Please generate array of more than 10 keywords here such that is can be converted into array using splice(,)]`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 150,
    n: 1
  });
  // var array = JSON.parse("[" +  + "]");
  var string = response.data.choices[0].text;
  console.log(string);
  var array = string.split(", ");
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

export function calculateMatchingScore(resume,keywords) {
  const resumeText = JSON.stringify(resume).toLowerCase(); // Convert the resume to lowercase string
  const keywordArray = keywords.map(keyword => keyword.toLowerCase()); // Convert the keywords to lowercase array
  console.log(keywordArray)

  let matchingScore = 0;
  for (const keyword of keywordArray) {
    if (resumeText.includes(keyword)) {
      matchingScore += 5.5366;
    }
  }
  console.log(matchingScore)
  return (matchingScore+60);
}

  