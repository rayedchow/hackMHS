import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async(req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') return res.status(404).send("only POST allowed");
  const { topic } = req.body;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Give me one medium-sized open ended question about the topic "${topic}".`
      }
    ],
    max_tokens: 3000,
    temperature: 0,
    n: 1
  });
  res.status(200).json({ openEnded: response.data.choices[0].message?.content });
}