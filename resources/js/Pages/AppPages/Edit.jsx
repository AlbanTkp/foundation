import React, { useEffect, useState } from 'react';
import Editor from '@/Components/Editor/Editor';
import { VscPreview } from "react-icons/vsc";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import TextArea from '@/Components/Form/TextArea';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import InputError from '@/Components/Form/InputError';
import Select from '@/Components/Form/Select';
import { NavLabels } from '@/Utils/Constants';

const Edit = ({ auth, pageCategories, page }) => {


    const pageTitle = page?"Modification de page":"Ajout de page"
    const path =[
        {
            href: route('pages.index'),
            icon: <VscPreview className="w-6 h-6" />,
            label: "Pages",
        },
        {
            href:"#",
            icon: page?<PencilSquareIcon className="w-6 h-6" />:<PlusCircleIcon className="w-6 h-6" />,
            label: pageTitle,
        }
    ]

    const { data, setData, post, put, processing, errors, reset } = useForm({
        banner: null,
        title: page? page.title:'',
        content: page? page.content:'',
        description: (page && page.description)? page.description:'',
        category: (page && page.category)? page.category:'',
    });

    const [pageType, setPageType] = useState(null)

    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const onContentChange = (data)=>{
        setData('content', data)
    }
    
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if(file){
            if (file.type.startsWith('image/')) {
                setData('banner', file)
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                    setVideoPreview(null);
                };
                reader.readAsDataURL(file);
            } else if(file.type.startsWith('video/')){
                setData('banner', file)
                const reader = new FileReader();
                reader.onloadend = () => {
                    setVideoPreview(reader.result);
                    setImagePreview(null);
                };
                reader.readAsDataURL(file);
            }else{
                setImagePreview(null);
                setVideoPreview(null);
            }
        }else{
            setImagePreview(null);
            setVideoPreview(null);
        }
    }

    useEffect(() => {
        if(page){
            if(page.category){
                if(pageCategories[NavLabels.IDEA]){
                    setPageType(NavLabels.IDEA)
                }else{
                    setPageType(NavLabels.WORK)
                }
            }else{
                setPageType(NavLabels.ABOUT)
            }
        }
        
        return () => {
            reset('banner','title','content', 'description', 'type');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        
        let routeBase = 'workPages'
        if(pageType == NavLabels.ABOUT){
            routeBase = 'aboutPages'
        }else if(pageType == NavLabels.IDEA){
            routeBase = 'ideaPages'
        }

        page ?
        put(route(routeBase+'.update', page.id), {
            onSuccess:(res)=>{
                console.log(res);
                alert('Page "'+page.title+'" modifiée avec succès');
            },
            onError:(res)=>{
                console.log(res);
                // onNextStep()
            },
        }):
        post(route(routeBase+'.store'), {
            onSuccess:(res)=>{
                alert('Page "'+data['title']+'" créée avec succès');
            },
            onError:(res)=>{
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
                            {!page &&
                            <div className="my-2">
                                <div className='grid md:grid-cols-3'>
                                    <div className="flex items-center">
                                        <InputLabel value="Type de page:" />
                                    </div>
                                    <Select
                                        items={[
                                            {"value": NavLabels.ABOUT},
                                            {"value": NavLabels.IDEA},
                                            {"value": NavLabels.WORK},
                                            ]}
                                        valueField="value"
                                        className="block col-span-2 mt-1"
                                        textField="value"
                                        isFocused={true}
                                        onChange={(v) => {
                                            setPageType(v.value)
                                        }}
                                    />
                                </div>
                            </div>
                            }
                            <div className="my-2">
                                <div className='grid md:grid-cols-3'>
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="title" value="Titre de la page:" />
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
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            {
                                pageType && pageType != NavLabels.ABOUT &&
                                <>
                                <div className="my-2">
                                    <div className='grid md:grid-cols-3'>
                                        <div className="flex items-center">
                                            <InputLabel value="Catégorie de page:" />
                                        </div>
                                        <Select
                                            // value={product && categories.find(cat=>cat.id == data.category)}
                                            value={page && {'value':pageCategories[pageType].find(v=>v == data['category'])}}
                                            items={
                                                pageCategories[pageType].map((v)=>{ return {'value':v}})
                                                }
                                            valueField="value"
                                            className="block col-span-2 mt-1"
                                            textField="value"
                                            isFocused={true}
                                            onChange={(v) => {
                                                setData('category', v.value)
                                            }}
                                        />
                                    </div>
                                    <InputError message={errors.category} className="mt-2" />
                                </div>
                                <div className="my-2">
                                    <div className='grid md:grid-cols-3'>
                                        <div className="flex items-center">
                                            <InputLabel htmlFor="title" value="Description de la page:" />
                                        </div>
                                        <TextArea
                                            rows={5}
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.description}
                                            className="block col-span-2 mt-1"
                                            autoComplete="title"
                                            isFocused={true}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="my-2">
                                    <div className='grid md:grid-cols-3'>
                                        <div className="flex items-center">
                                            <InputLabel htmlFor="banner" value="Bannière (Image ou Vidéo):" />
                                        </div>
                                        <TextInput
                                            id="banner"
                                            type="file"
                                            accept="image/*,video/*" 
                                            name="banner"
                                            className="block col-span-2 mt-1"
                                            isFocused={true}
                                            onChange={handleBannerChange}
                                        />
                                    </div>
                                    <div className="flex justify-center w-full lg:px-52">
                                        <div className='flex flex-wrap items-center justify-center w-full gap-6 '>
                                            {page && page.banner.type == "IMAGE" &&
                                                <img 
                                                src={page.banner.path} 
                                                alt="Selected" 
                                                className="object-cover w-40 h-40 p-2 mt-2 bg-red-400"
                                                />
                                            }
                                            {page && page.banner.type == "VIDEO" &&
                                                <video 
                                                    autoPlay
                                                    loop
                                                    src={page.banner.path} 
                                                    alt="Selected" 
                                                    className="object-cover w-40 h-40 p-2 mt-2 bg-red-400"
                                                />
                                            }
                                            {imagePreview && (
                                                <>
                                                {page && 
                                                <h3 className='w-full text-center md:w-auto'>Remplacer par</h3>
                                                }
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Selected" 
                                                    className="object-cover w-40 h-40 p-2 mt-2 bg-green-500"
                                                />
                                                </>
                                            )}
                                            {videoPreview && (
                                                <>
                                                {page && 
                                                <h3 className='w-full text-center md:w-auto'>Remplacer par</h3>
                                                }
                                                <video 
                                                    autoPlay
                                                    loop
                                                    src={videoPreview} 
                                                    alt="Selected" 
                                                    className="object-cover w-40 h-40 p-2 mt-2 bg-green-500"
                                                />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <InputError message={errors.banner} className="mt-2" />
                                </div>
                                </>
                            }
                            <div className="my-2">                            
                                <InputLabel className='my-3 text-center uppercase' value="Contenu de la page" />
                                <Editor htmlContent={data.content} onContentChange={onContentChange}/>
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                            <div className="my-2">                            
                                <div id='editorjs'></div>
                            </div>
                            <button className="text-lg font-bold text-white mt-7 md:mt-0 ms-4 btn btn-primary" disabled={processing}>
                                {page ? 'Modifier' : 'Créer'}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
};

export default Edit;