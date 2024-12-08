import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {Bars3Icon, ClipboardDocumentCheckIcon, CubeIcon, HomeIcon, ShoppingCartIcon, TagIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/solid';
import NavLink from '@/Components/NavLink';
import { FaHandshake } from "react-icons/fa";
import useScreenSize from "@/Hooks/useScreenSize";
import { PiInvoiceBold, PiInvoiceThin } from 'react-icons/pi';
import { IoNewspaper } from "react-icons/io5";
import { LogOutIcon } from 'lucide-react';
import { VscPreview } from "react-icons/vsc";

const navRoutes = [
    { name: 'pages.index', label: 'Pages', icon: <VscPreview className="w-6 h-6" /> },
    { name: 'papers.index', label: 'Articles', icon: <IoNewspaper className="w-6 h-6" /> },
];
const appName = import.meta.env.VITE_APP_NAME;

const SideBar = ({ user, path, onToggle }) => {

    const { width, height } = useScreenSize();
    const smallScreen = width < 768;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        onToggle(sidebarOpen)
        return () => {

        };
    }, [sidebarOpen]);

    const handleMouse = (s)=>{
        if(!smallScreen){
            setSidebarOpen(s)
        }
    }

    return (
        <div className="flex" onMouseOver={()=>handleMouse(true)} onMouseLeave={()=>handleMouse(false)}>
            <div className={`fixed md:h-full w-screen md:w-auto flex flex-col bg-primary text-white duration-300 z-50 ease-in-out ${!smallScreen && (sidebarOpen ? 'w-64' : 'w-20')}`}>
                {!smallScreen &&
                <div className="flex items-center justify-between h-16 p-4 py-10 mt-1 mb-3">
                    <Link href="/" className='w-full'>
                        {/* <ApplicationLogo className="block w-auto text-gray-200 fill-current h-9" full={sidebarOpen}/> */}
                        <ApplicationLogo className="block w-auto mx-auto text-gray-200 fill-current h-14" />
                    </Link>
                    {/* {sidebarOpen && <h1 className='text-xl font-bold uppercase ms-5'>{appName}</h1>} */}
                </div>} 
                {smallScreen &&
                <div className="top-0 flex justify-between h-20 p-5 border-b-2">
                    {/* <div className="flex"> */}
                        <Link href="/">
                            <ApplicationLogo className="block w-auto text-gray-200 fill-current h-[3rem]" />
                        </Link>
                        <h1 className='my-auto font-bold uppercase lg:text-2xl'>{appName}</h1>
                    {/* </div> */}
                    <button className='p-1 border rounded' onClick={()=>setSidebarOpen(!sidebarOpen)}>
                        <Bars3Icon className={`${!sidebarOpen ? 'block' : 'hidden'} h-7 w-7`}></Bars3Icon>
                        <XMarkIcon className={`${sidebarOpen ? 'block' : 'hidden'} h-7 w-7`}></XMarkIcon>
                    </button>
                </div>
                }

                {(!smallScreen || (smallScreen && sidebarOpen)) &&
                <nav className="px-2 py-5 space-y-1">
                    {navRoutes.map((navRoute, index) => (
                        <div className="block text-white" key={'nav_'+index}>

                        <NavLink key={index} href={route(navRoute.name)} active={path ? path.filter((elmnt)=>elmnt.href == route(navRoute.name)).length > 0 : route().current(navRoute.name)} className={`items-center p-2 rounded-md hover:bg-secondary w-full justify-${(!smallScreen && sidebarOpen || smallScreen)?'between':'center'}`}>
                        {(!smallScreen && sidebarOpen || smallScreen) && <span className="mx-2 text-white">{navRoute.label}</span>}
                            <span className="text-lg text-white">{navRoute.icon}</span>
                        </NavLink>
                        </div>
                    ))}
                    {smallScreen &&
                        <div className="block text-white">
                            <NavLink href={route('logout')} className={`items-center p-2 rounded-md hover:bg-secondary w-full justify-between`}>
                                <span className="mx-2 text-white">Déconnexion</span>
                                <span className="text-lg text-white"><LogOutIcon/></span>
                            </NavLink>
                        </div>
                    }
                </nav>}
            </div>
        </div>
    );
};

export default SideBar;
