// ... (your imports and other code)

import { Help } from "@/components/Help";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Needhelp() {
  const [clicked, setClicked] = useState<any>(false)

  const toggle = (index: any)=> {
    if(clicked === index ) {
            return setClicked(null)
    }

    setClicked(index)
  }

  // const [questions, setQuestions] = useState([
  //   {
  //     question: 'How to contact with Customer Service?',
  //     answer: 'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!',
  //   },
  //   {
  //     question: 'App installation failed, how to update system information?',
  //     answer: 'Please read the documentation carefully. We also have some online video tutorials regarding this issue. If the problem remains, please open a ticket in the support forum.',
  //   },
  //   {
  //     question: 'Website response taking time, how to improve?',
  //     answer: 'At first, please check your internet connection. We also have some online video tutorials regarding this issue. If the problem remains, please open a ticket in the support forum.',
  //   },
  //   {
  //     question: 'How do I create an account?',
  //     answer: 'If you want to open an account for personal use, you can do it over the phone or online. Opening an account online should only take a few minutes.',
  //   },
  // ]);

  // const [selectedQuestion, setSelectedQuestion] = useState('');

  // const handleQuestionClick = (question: string) => {
  //   setSelectedQuestion((prev) => (prev === question ? '' : question));
  // };

  // const renderContent = (question: string, answer: string) => (
  //   <div onClick={() => handleQuestionClick(question)} className="flex flex-col gap-8 quest-container cursor-pointer ">
  //     <div  className="flex justify-between font-bold quest ">  
  //     <p  >
  //       {question}
  //     </p>
  //     <h2>{selectedQuestion === question ? <AiOutlineMinus /> : <AiOutlinePlus />}</h2> 
  //     </div>
     
  //     {selectedQuestion === question && <p className='question'>{answer}</p>}
  //   </div>
  // );

  return (
    <div className='border-0 help-container'>'
              <h1 className="faq">F.A.Q</h1>
      {/* <div className='help-container'>
        {questions.map((q) => (
          <div className='help-second-container' key={q.question}>
            <div className='flex '>
              {selectedQuestion === q.question ? (
                <div className="flex " onClick={() => setSelectedQuestion('')} >
                  {renderContent(q.question, q.answer)}
                </div>
              ) : (
                <div onClick={() => setSelectedQuestion(q.question)}>
                  {renderContent(q.question, q.answer)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div> */}
            {Help.map((item, index: any) => (
              <div
              key={index}
              className='mb-[10px] border border-secondary-shade1 rounded bg-white overflow-hidden  transition-all duration-100 ease-out w-10/12'>
              <div
                onClick={() => toggle(index)}
                className='flex items-center py-[23px] pr-[25px] pl-[30px] cursor-pointer focus:outline-none relative justify-between transition-all duration-100 ease-out'>
                <h3 className='my-0 text-base font-bold text-[#0d1136]'>
                  {item.question}
                </h3>
                <span className='order-2 w-[22px] h-[22px] flex-shrink-0 text-[#0d1136] item-center justify-center'>
                  {clicked === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
              </div>
              {clicked === index ? (
                <div className='overflow text-[#666]  bg-white transition-all duration-100 ease-out'>
                  <div className='box-border mt-0 mb-0 px-[30px] pb-[23px] transition-all duration-100 ease-out'>
                    <p className='text-base text-[#77798c] font-normal'>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          
            ))}
    </div>
  );
}

export default Needhelp;
