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
            href:route('about.index'),
            label: NavLabels.ABOUT,
        },
        {
            href:route('about.show', page['id']),
            label: page['title'],
        },
    ]
    

    return (
        <WelcomeLayout path={path}>            
          <section className="px-3 py-10 md:px-7 lg:mx-40">
            <h1 className="text-3xl font-bold text-center md:text-5xl mb-7 lg:mb-14">{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </section>
      </WelcomeLayout>
    );
  };

export default Show;