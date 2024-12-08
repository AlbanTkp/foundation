import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { formatDateTime, formatDateTime2, formatDateTimeInternational } from '@/Utils/Index';
import React from 'react';

const Show = ({paper, otherPapers}) => {

    const path =[
        {
            href:route('welcome'),
            label: 'Home',
        },
        {
            href:route('trendings.index'),
            label: 'Topics',
        },
        {
            href:route('trendings.show', paper['id']),
            label: paper['title'],
        },
    ]

    return (
        <WelcomeLayout path={path}>
          <section className="px-3 my-5 md:px-7 lg:mx-40 lg:mt-20 lg:my-14 lg:px-11">
            <h1 className="mb-2 text-2xl font-bold md:text-4xl lg:text-6xl">{paper.title}</h1>
            {/* <a href="javascript:void(0);" className="inline-block my-5 font-medium text-black underline">Read the 2024 Goalkeepers report</a> */}
            
            <div className="mt-3 lg:mt-10">
              <img src={paper['banner']['path']} alt="The Race to Nourish a Warming World" className="object-cover w-full h-[200px] md:h-[400px] lg:h-[600px]" />
              <h5 className='mt-2 mb-5 font-sans text-secondary'>
              {formatDateTimeInternational(paper.created_at)}
              </h5>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-10">
              <div className='md:col-span-7'>
                <div dangerouslySetInnerHTML={{ __html: paper.content }} />
              </div>
              <div className='md:col-span-3'>
                  <div className='h-full bg-gray-100'>
                  <h1 className="p-3 mx-auto mb-2 text-3xl font-bold">Other Topics</h1> 
                  {otherPapers.map((otherPaper) => (
                      <div key={otherPaper} className="px-2 py-2 border-y">
                        {/* <img src={otherPaper['banner_path']} alt="The Race to Nourish a Warming World" className="object-cover w-full h-40" /> */}
                        <a href={route('trendings.show', otherPaper['id'])} className="mb-2 text-lg font-thin cursor-pointer hover:underline hover:text-primary">{otherPaper.title}</a>
                        <p className="mb-2 font-sans text-sm text-secondary">{formatDateTimeInternational(otherPaper.created_at)}</p>
                      </div>
                  ))}
                  </div>
              </div>
            </div>
          </section>

      </WelcomeLayout>
    );
  };

export default Show;