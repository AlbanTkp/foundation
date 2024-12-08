import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { NavLabels } from '@/Utils/Constants';
import { formatDateTimeInternational } from '@/Utils/Index';
import React from 'react';


const path =[
    {
        href:route('welcome'),
        label: 'Home',
    },
    {
        href:route('ideas.index'),
        label: NavLabels.IDEA,
    },
]
const Index = ({pages}) => {
    return (
        <WelcomeLayout path={path}>
          <section className="px-3 md:px-7 lg:mt-20 lg:mx-40 lg:my-14 lg:px-11">
              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                    <a href={route('ideas.show', page['id'])} key={page.id} className="relative overflow-hidden transition duration-300 border rounded-lg shadow-md cursor-pointer group hover:scale-105">
                        {/* Image de la bannière */}
                        {
                            page.banner.type == "IMAGE" &&
                            <img 
                                src={page.banner.path} 
                                alt={`Banner for ${page.title}`} 
                                className="object-cover w-full h-40" 
                            />
                        }
                        {
                            page.banner.type == "VIDEO" &&
                            <video 
                                src={page.banner.path} 
                                alt={`Banner for ${page.title}`} 
                                className="object-cover w-full h-40" 
                            />
                        }

                        <div className="p-4">
                            <h2 className="text-lg font-semibold group-hover:underline group-hover:text-primary">{page.title}</h2>
                            <p className="text-sm text-gray-500">
                            {formatDateTimeInternational(page.created_at)}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
          </section>
        </WelcomeLayout>
    );
};

export default Index;