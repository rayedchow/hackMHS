import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') return res.status(404).send("only POST allowed");
  const { topic, openEnded } = req.body;
  const openResponse = req.body.response;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'system',
        content: `A student answers the open ended question about "${topic}": ${openEnded} with the response "${openResponse}". Give this student a good amount of feedback for this response to the question and accurately grade this response out of 100. Be extremely strict and make sure the response completely answers the question in detail. Limit the feedback to 150 words.`
      }
    ],
    max_tokens: 3000,
    temperature: 0,
    n: 1
  });
  res.status(200).json({ feedback: response.data.choices[0].message?.content.replaceAll('Feedback: ', '') });
}