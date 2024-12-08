import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { formatDateTimeInternational } from '@/Utils/Index';
import React from 'react';


const path =[
    {
        href:route('welcome'),
        label: 'Home',
    },
    {
        href:route('trendings.index'),
        label: 'Topics',
    },
]
const Index = ({papers}) => {
    return (
        <WelcomeLayout path={path}>
          <section className="px-3 md:px-7 lg:mx-40 lg:mt-20 lg:my-14 lg:px-11">
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                {papers.map((paper) => (
                    <a href={route('trendings.show', paper['id'])} key={paper.id} className="relative overflow-hidden border rounded-lg shadow-md cursor-pointer group">
                        {/* Image de la bannière */}
                        <img 
                            src={paper.banner.path} 
                            alt={`Banner for ${paper.title}`} 
                            className="object-cover w-full h-40" 
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold group-hover:underline">{paper.title}</h2>
                            <p className="text-sm text-gray-500">
                            {formatDateTimeInternational(paper.created_at)}
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