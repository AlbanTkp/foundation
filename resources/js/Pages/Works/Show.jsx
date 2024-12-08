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
            href:route('works.index'),
            label: NavLabels.WORK,
        },
        {
            href:route('works.show', page['id']),
            label: page['title'],
        },
    ]

    return (
        <WelcomeLayout path={path}>            
          <div className="w-full px-3 py-10 font-sans text-white bg-primary md:px-7 lg:px-40 lg:py-20">
            <div className="grid gap-3 text-center lg:grid-cols-2 mb-14 lg:text-start">
              {/* Content you want to display over the video */}
              <h1 className="block font-serif text-4xl font-semibold lg:text-6xl">{page.title}</h1>
              <h2 className="block text-lg font-light lg:text-justify">{page.description}</h2>
            </div>
            <div className="w-full h-56 py-2 overflow-hidden lg:h-screen lg:py-5">
              {page.banner.type == "VIDEO" &&
                <video
                  className="object-cover w-full h-full"
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
                  className="relative object-cover w-full h-full"
                  src={page.banner.path} />            
              } 
            </div>
          </div>
          <section className="px-3 py-10 md:px-7 lg:px-0 lg:py-20 lg:mx-40">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </section>
      </WelcomeLayout>
    );
  };

export default Show;