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
        content: `Give me 10 multiple choice questions about the topic "${topic}" and provide options and answers for each. Put it in this format: "(Question)\\n(Options separated by \\n)\\n(Answer)"`
      }
    ],
    max_tokens: 3000,
    temperature: 0,
    n: 1
  });
  const plaintext = response.data.choices[0].message?.content;
  const split1 = plaintext?.split('\n');
  if(!split1) return res.status(400).json({ err: 'Invalid' });
  const questions: any[] = [];
  console.log(split1);
  for(let i = 0; i+1 < split1.length; i+=7) {
    questions.push({
      question: split1[i],
      options: [split1[i+1], split1[i+2], split1[i+3], split1[i+4]],
      answer: (split1[i+5].split('Answer: ').length === 1) ? split1[i+5].split('Answer: ')[0] : split1[i+5].split('Answer: ')[1]
    });
  }
  console.log(questions);
  res.status(200).json({ questions });
}
