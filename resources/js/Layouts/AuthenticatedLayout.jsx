import Dropdown from '@/Components/Dropdown';
import SideBar from '@/Components/SideBar';
import useScreenSize from '@/Hooks/useScreenSize';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Authenticated({ user, pageTitle, path, children }) {
    const { notifications } = usePage().props;
    const { width, height } = useScreenSize();
    const smallScreen = width < 768;

    const [mleft, setMLeft] = useState('md:ml-20');
    const [left, setLeft] = useState('md:left-20');

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSideBarToggle = (sidebarOpen)=>{
        setLeft(sidebarOpen?'md:left-[6.5rem]':'md:left-20')
        setMLeft(sidebarOpen?'md:ml-[6.5rem]':'md:ml-20')
        setSidebarOpen(sidebarOpen)
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar user={user} path={path} onToggle={onSideBarToggle}/>
            <div className={`flex-1 ${mleft} mt-20 md:mt-0 transition-width duration-300`}>
                <header className={`fixed top-20 md:top-0 left-0 ${left} right-0 w-screen md:w-auto transition-width duration-300 bg-white shadow flex justify-between items-center pl-3 z-20`}>
                    <div className="px-4 py-6 sm:px-6 lg:px-8">
                        <div className="breadcrumbs">
                            <ul>
                                {path && path.map((element, index) => (
                                    <li key={'bread_'+index} className='text-wrap'>
                                        <Link href={element.href} className={`text-sm md:text-xl font-bold ${index+1 == path.length?'text-secondary':'text-primary'}`}>
                                            {element.icon}&nbsp;{(!smallScreen || smallScreen && index+1 == path.length) && element.label}
                                        </Link>
                                    </li> 
                                ))}
                            </ul>
                        </div>
                    </div>
                    {!smallScreen &&
                    <div className="flex items-center">
                        <div className="relative ml-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    }
                </header>
                
                <main className="h-10 pt-20 md:px-5 bg-info">
                    {children}                    
                </main>
            </div>
        </div>
    );
}
