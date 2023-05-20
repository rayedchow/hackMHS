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
        content: `Give me notes and only notes about the topic: "${topic}", with a maximum amount of 250 words.`
      }
    ],
    max_tokens: 3000,
    temperature: 0,
    n: 1
  });
  res.status(200).json({ res: response.data.choices[0].message?.content });
}
