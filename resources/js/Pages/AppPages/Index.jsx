import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/outline';
// import ProductsTable from './Partials/ProductsTable';
import { VscPreview } from "react-icons/vsc";
import { formatDateTime2, formatDateTimeInternational } from '@/Utils/Index';
import { NavLabels } from '@/Utils/Constants';
import { FcAbout } from "react-icons/fc";

const pageTitle = "Pages"
const path =[{
    href:route('pages.index'),
    icon: <VscPreview className="w-6 h-6" />,
    label: pageTitle,
}]


const Index = ({ auth, workPages, ideaPages, aboutPages }) => {

    const { delete: destroy, processing } = useForm();

    const handleWorkPageDelete = (e,page) => {
        e.preventDefault();
        handleDelete(route('workPages.destroy', page.id), page.title)
    }

    const handleAboutPageDelete = (e,page) => {
        e.preventDefault();
        handleDelete(route('aboutPages.destroy', page.id), page.title)
    }

    const handleIdeaPageDelete = (e,page) => {
        e.preventDefault();
        handleDelete(route('ideaPages.destroy', page.id), page.title)
    }

    const handleDelete = (route, title) => {
        if (confirm(`Voulez-vous supprimer la page "${title}"?`)) {
        destroy(route, {
            onSuccess: () => {
                alert('Page supprimée avec succès');
            },
        });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            pageTitle={pageTitle}
            path={path} 
        >
            <Head title={pageTitle} />

            <div className="mt-6 md:mt-12">
                <div className="sm:px-6 lg:px-8">
                    <Link href={route('pages.create')}>
                        <button className="rounded-full sm:ms-0 ms-2 btn btn-primary hover:text-white btn-outline">
                            <span className='text-md'>Nouvelle page</span>
                            <PlusIcon className='w-6 h-6 ' />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/*show list of about pages with card, img banner and title */}
                        <h3 className="m-5 text-lg font-bold uppercase">{NavLabels.ABOUT}</h3>
                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {aboutPages.map((aboutPage) => (
                                <div key={aboutPage.id} className="relative overflow-hidden border rounded-lg shadow-md group">
                                    <FcAbout className='w-24 h-24 mx-auto'/>
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{aboutPage.title}</h2>
                                        <p className="text-sm text-gray-500">
                                        {formatDateTimeInternational(aboutPage.created_at)}
                                        </p>
                                    </div>
                                    {/* Boutons apparaissant sur hover */}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                                    
                                        <a href={route('aboutPages.edit', aboutPage.id)}
                                            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                                        >
                                            Modifier
                                        </a>
                                        <button 
                                            onClick={(e) => handleAboutPageDelete(e, aboutPage)} 
                                            className="px-4 py-2 text-white bg-red-500 rounded"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/*show list of about pages with card, img banner and title */}
                        <h3 className="m-5 text-lg font-bold uppercase">{NavLabels.WORK}</h3>
                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {workPages.map((workPage) => (
                                <div key={workPage.id} className="relative overflow-hidden border rounded-lg shadow-md group">
                                    {
                                        workPage.banner.type == "IMAGE" &&
                                        <img 
                                            src={workPage.banner.path} 
                                            alt={`Banner for ${workPage.title}`} 
                                            className="object-cover w-full h-40" 
                                        />
                                    }
                                    {
                                        workPage.banner.type == "VIDEO" &&
                                        <video 
                                            src={workPage.banner.path} 
                                            alt={`Banner for ${workPage.title}`} 
                                            className="object-cover w-full h-40" 
                                        />
                                    }
        
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{workPage.title}</h2>
                                        <p className="text-sm text-gray-500">
                                        {formatDateTimeInternational(workPage.created_at)}
                                        </p>
                                    </div>
                                    {/* Boutons apparaissant sur hover */}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                                    
                                        <a href={route('workPages.edit', workPage.id)}
                                            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                                        >
                                            Modifier
                                        </a>
                                        <button 
                                            onClick={(e) => handleWorkPageDelete(e, workPage)} 
                                            className="px-4 py-2 text-white bg-red-500 rounded"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/*show list of about pages with card, img banner and title */}
                        <h3 className="m-5 text-lg font-bold uppercase">{NavLabels.IDEA}</h3>
                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {ideaPages.map((ideaPage) => (
                                <div key={ideaPage.id} className="relative overflow-hidden border rounded-lg shadow-md group">
                                   {
                                        ideaPage.banner.type == "IMAGE" &&
                                        <img 
                                            src={ideaPage.banner.path} 
                                            alt={`Banner for ${ideaPage.title}`} 
                                            className="object-cover w-full h-40" 
                                        />
                                    }
                                    {
                                        ideaPage.banner.type == "VIDEO" &&
                                        <video 
                                            src={ideaPage.banner.path} 
                                            alt={`Banner for ${ideaPage.title}`} 
                                            className="object-cover w-full h-40" 
                                        />
                                    }
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{ideaPage.title}</h2>
                                        <p className="text-sm text-gray-500">
                                        {formatDateTimeInternational(ideaPage.created_at)}
                                        </p>
                                    </div>
                                    {/* Boutons apparaissant sur hover */}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                                    
                                        <a href={route('ideaPages.edit', ideaPage.id)}
                                            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                                        >
                                            Modifier
                                        </a>
                                        <button 
                                            onClick={(e) => handleIdeaPageDelete(e, ideaPage)} 
                                            className="px-4 py-2 text-white bg-red-500 rounded"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;