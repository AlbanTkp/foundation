import React, { useEffect, useState } from 'react';
import Editor from '@/Components/Editor/Editor';
import { IoNewspaper } from "react-icons/io5";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import TextArea from '@/Components/Form/TextArea';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import InputError from '@/Components/Form/InputError';

const Edit = ({ auth, paper }) => {


    const pageTitle = paper?"Modification d'article":"Ajout d'article"
    const path =[
        {
            href: route('papers.index'),
            icon: <IoNewspaper className="w-6 h-6" />,
            label: "Articles",
        },
        {
            href:"#",
            icon: paper?<PencilSquareIcon className="w-6 h-6" />:<PlusCircleIcon className="w-6 h-6" />,
            label: pageTitle,
        }
    ]

    const { data, setData, post, put, processing, errors, reset } = useForm({
        banner: null,
        title: paper? paper.title:'',
        content: paper? paper.content:'',
    });

    const [imagePreview, setImagePreview] = useState(null);

    const onContentChange = (data)=>{
        setData('content', data)
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('banner', file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
        console.log(data);
        
    }

    useEffect(() => {
        return () => {
            reset('banner','title','content');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        paper ?
        put(route('papers.update', paper.id), {
            onSuccess:(res)=>{
                console.log(res);
            },
            onError:(res)=>{
                console.log(res);
                // onNextStep()
            },
        }):
        post(route('papers.store'), {
            onSuccess:(res)=>{
                console.log(res);
            },
            onError:(res)=>{
                console.log(res);
                // onNextStep()
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            pageTitle={pageTitle}
            path={path} 
        >
            <Head title={pageTitle} />

            <div className="md:py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="p-3 overflow-hidden bg-white shadow-sm sm:rounded-lg lg:px-20">
                        <h2 className="my-2 text-2xl font-bold text-center uppercase">{pageTitle}</h2>
                        <hr />
                        <form className="flex flex-col mt-10 md:space-y-8" encType='multipart/form-data' onSubmit={submit}>
                        <div className="my-2">
                                <div className='grid md:grid-cols-3'>
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="title" value="Titre de l'article:" />
                                    </div>
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="block col-span-2 mt-1"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="my-2">
                                <div className='grid md:grid-cols-3'>
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="banner" value="Image bannière:" />
                                    </div>
                                    <TextInput
                                        id="banner"
                                        type="file"
                                        accept="image/*" 
                                        name="banner"
                                        className="block col-span-2 mt-1"
                                        isFocused={true}
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="flex justify-center w-full lg:px-52">
                                    <div className='flex flex-wrap items-center justify-center w-full gap-6 '>
                                        {paper &&
                                            <img 
                                            src={paper.banner.path} 
                                            alt="Selected" 
                                            className="object-cover w-40 h-40 p-2 mt-2 bg-red-400"
                                            />
                                        }
                                        {imagePreview && (
                                            <>
                                            <h3 className='w-full text-center md:w-auto'>Remplacer par</h3>
                                            <img 
                                                src={imagePreview} 
                                                alt="Selected" 
                                                className="object-cover w-40 h-40 p-2 mt-2 bg-green-500"
                                            />
                                            </>
                                        )}
                                        </div>
                                    </div>

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="my-2">                            
                                <InputLabel className='my-3 text-center uppercase' value="Contenu de l'article" />
                                <Editor htmlContent={data.content} onContentChange={onContentChange}/>
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                            <div className="my-2">                            
                                <div id='editorjs'></div>
                            </div>
                            <button className="text-lg font-bold text-white mt-7 md:mt-0 ms-4 btn btn-primary" disabled={processing}>
                                {paper ? 'Modifier' : 'Créer'}
                            </button>

                        </form>

                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
};

export default Edit;