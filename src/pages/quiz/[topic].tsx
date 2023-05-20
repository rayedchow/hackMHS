import Image from 'next/image'
import logo from '../../../public/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function Topic({ topic }: InferGetServerSidePropsType<GetServerSideProps>) {
  const router = useRouter();
	const [quiz, setQuiz] = useState([]);
  const [selected, setSelected] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [submitted, setSubmitted] = useState(false);
  const [generated, setGenerated] = useState(0);

  useEffect(() => {
    if((quiz.length === 0) && (generated === 0)) {
      setGenerated(1);
      const body = { topic }
      console.log(body);
      axios.post('/api/quiz', body)
				.then(res => {
					setQuiz(res.data.questions);
				})
				.catch(err => {
					console.log(err);
				});
    }
  }, []);

  const select = (i: number, j: number) => {
    const tempSelected = [...selected];
    tempSelected[i] = j;
    setSelected(tempSelected);
  }
	
  return (
    <>
      <div className="flex flex-col w-full h-full">
      <div className="flex m-10 cursor-pointer" onClick={() => router.push('/')}>
        <Image src={logo} className='w-8 h-8 mr-3' alt='logo' />
          <div className="text-[#34ACE0] text-3xl font-semibold">
            EDUGUIDE
          </div>
        </div>
        <div className="text-xl text-[#34ACE0] ml-12 font-semibold mb-2">{topic.toUpperCase()} QUIZ</div>
          {(quiz.length === 0) ? 
            <svg className="animate-spin h-24 w-24 text-white ml-16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            :
            <pre><div className="text-md text-[#d1ccc0] ml-16 mb-5">
              {quiz.map((question: any, i: number) => (
                <div className="mb-5">
                  <div className="font-semibold">{question.question}</div>
                  {(question.options.map((option: any, j: number) => (
                    <div className={(selected[i] === j) ? 'text-[#34ACE0] cursor-pointer' : 'cursor-pointer'} onClick={() => select(i, j)}>
                      {option}
                    </div>
                  )))}
                  {submitted && <div className={(question.answer.toLowerCase().charCodeAt(0)-97 === selected[i]) ? 'text-[#3ae374]' : 'text-[#ff3838]'}>Answer: {question.answer}</div>}
                </div>
              ))}
              <div className="w-48 h-8 bg-[#34ACE0] flex justify-center items-center text-[#2f3542] rounded-xl cursor-pointer" onClick={() => setSubmitted(true)}>SUBMIT QUIZ</div>
            </div></pre>
          }
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  return { props: { topic: context.query.topic } };
}