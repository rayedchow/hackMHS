import Image from 'next/image'
import { AiOutlineArrowRight } from "react-icons/ai";
import { VscChecklist } from 'react-icons/vsc';
import { FaPencilAlt } from 'react-icons/fa';
import { RiFileUnknowFill } from 'react-icons/ri';
import logo from '../../public/logo.png';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex m-10 cursor-pointer" onClick={() => setSubmitted(false)}>
          <Image src={logo} className='w-8 h-8 mr-3' alt='logo' />
          <div className="text-[#34ACE0] text-3xl font-semibold">
            EDUGUIDE
          </div>
        </div>
        {submitted ? 
          <div className="flex flex-col w-full justify-center items-center mt-16">
            <div className="text-3xl text-[#487eb0] font-medium">
              Select Format
            </div>
            <div className="flex gap-10 mt-8">
              <div className="h-80 w-64 bg-[#d1ccc0] rounded-xl flex flex-col justify-center items-center cursor-pointer" onClick={() => router.push(`/notes/${topic}`)}>
                <div className="text-3xl text-[#3d3d3d] font-semibold">NOTES</div>
                <VscChecklist size={100} />
              </div>
              <div className="h-80 w-64 bg-[#d1ccc0] rounded-xl flex flex-col justify-center items-center cursor-pointer" onClick={() => router.push(`/open/${topic}`)}>
                <div className="text-3xl text-[#3d3d3d] font-semibold">OPEN ENDED</div>
                <FaPencilAlt size={100} />
              </div>
              <div className="h-80 w-64 bg-[#d1ccc0] rounded-xl flex flex-col justify-center items-center cursor-pointer" onClick={() => router.push(`/quiz/${topic}`)}>
                <div className="text-3xl text-[#3d3d3d] font-semibold">QUIZ</div>
                <RiFileUnknowFill size={100} />
              </div>
            </div>
          </div>
          :
        <div className="flex flex-col w-full justify-center items-center mt-16">
          <div className="text-3xl text-[#487eb0] font-medium">
            Type in your topic...
          </div>
          <div className="flex relative items-center w-2/5">  
            <input value={topic} onChange={e => setTopic(e.target.value)} className="w-full mt-5 h-10 bg-[#d1ccc0] outline-none rounded-xl p-5 text-lg" />
            <AiOutlineArrowRight className="absolute ml-[30rem] mt-5 cursor-pointer" size={30} onClick={() => setSubmitted(true)} />
          </div>
          <div className='text-2xl text-[#487eb0] font-medium mt-16'>
            Examples
          </div>
          <div className="flex gap-10 mt-8">
            <div className="w-64 h-64 bg-[#d1ccc0] rounded-xl flex justify-center items-center text-2xl font-semibold text-center cursor-pointer" onClick={() => {setTopic('Unit Circles in Precalculus'); setSubmitted(true)}}>
              Unit Circles in Precalculus
            </div>
            <div className="w-64 h-64 bg-[#d1ccc0] rounded-xl flex justify-center items-center text-2xl font-semibold text-center cursor-pointer" onClick={() => {setTopic('Enzymes in Biology'); setSubmitted(true)}}>
              Enzymes in Biology
            </div>
            <div className="w-64 h-64 bg-[#d1ccc0] rounded-xl flex justify-center items-center text-2xl font-semibold text-center cursor-pointer" onClick={() => {setTopic('Python Fundamentals'); setSubmitted(true)}}>
              Python Fundamentals
            </div>
          </div>
        </div>
        }
      </div>
    </>
  )
}
