import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { NavLabels } from '@/Utils/Constants';
import { formatDateTime, formatDateTime2, formatDateTimeInternational } from '@/Utils/Index';
import React from 'react';

const Show = ({page}) => {

    const path =[
        {
            href:route('welcome'),
            label: 'Home',
        },
        {
            href:route('ideas.index'),
            label: NavLabels.IDEA,
        },
        {
            href:route('ideas.show', page['id']),
            label: page['title'],
        },
    ]

    return (
        <WelcomeLayout path={path}>
          <div className="relative w-full h-screen overflow-hidden">
            {page.banner.type == "VIDEO" &&
            <video
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
              autoPlay
              muted
              loop
            >
              <source src={page.banner.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            }
            {page.banner.type == "IMAGE" &&
            <img
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
              src={page.banner.path} />            
            }
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 text-center text-white md:px-7 lg:px-40">
              <h1 className="block text-3xl font-bold lg:text-6xl">{page.title}</h1>
              <br/>
              <h2 className="block font-light text-justify text-md lg:text-xl">{page.description}</h2>
            </div>
          </div>
          <section className="px-3 py-10 md:px-7 lg:px-0 lg:py-20 lg:mx-40">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </section>

      </WelcomeLayout>
    );
  };

export default Show;