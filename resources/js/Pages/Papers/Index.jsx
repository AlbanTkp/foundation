import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/outline';
// import ProductsTable from './Partials/ProductsTable';
import { IoNewspaper } from "react-icons/io5";
import { formatDateTime2, formatDateTimeInternational } from '@/Utils/Index';

const pageTitle = "Articles"
const path =[{
    href:route('papers.index'),
    icon: <IoNewspaper className="w-6 h-6" />,
    label: pageTitle,
}]


const Index = ({ auth, papers }) => {

  const { delete: destroy, processing } = useForm();

    const handleDelete = (e, paper) => {
        e.preventDefault();
        if (confirm(`Voulez-vous supprimer l'article "${paper.title}"?`)) {
        destroy(route('papers.destroy', paper.id), {
            onSuccess: () => {
                alert('Article supprimé avec succès');
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
                    <Link href={route('papers.create')}>
                        <button className="rounded-full sm:ms-0 ms-2 btn btn-primary hover:text-white btn-outline">
                            <span className='text-md'>Nouvel Article</span>
                            <PlusIcon className='w-6 h-6 ' />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/*show list of papers with card, img banner and title */}
                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {papers.map((paper) => (
                                <div key={paper.id} className="relative overflow-hidden border rounded-lg shadow-md group">
                                    {/* Image de la bannière */}
                                    <img 
                                        src={paper.banner.path} 
                                        alt={`Banner for ${paper.title}`} 
                                        className="object-cover w-full h-40" 
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{paper.title}</h2>
                                        <p className="text-sm text-gray-500">
                                        {formatDateTimeInternational(paper.created_at, 'fr-FR')}
                                        </p>
                                    </div>
                                    {/* Boutons apparaissant sur hover */}
                                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                                                    
                                        <a href={route('papers.edit', paper.id)}
                                            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                                        >
                                            Modifier
                                        </a>
                                        <button 
                                            onClick={(e) => handleDelete(e, paper)} 
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