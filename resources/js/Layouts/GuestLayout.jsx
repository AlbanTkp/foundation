import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ pageTitle, children }) {
    // const logoUrl = 'https://i.postimg.cc/mrgPMqpP/logo.png'
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    return (
        <>
        {/* <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
                </Link>
            </div>

            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md dark:bg-gray-800 sm:rounded-lg">
            </div>
        </div> */}
            {/* <div className="relative items-center justify-center flex-auto hidden h-full p-10 overflow-hidden text-white bg-blue-500 bg-no-repeat bg-cover sm:w-1/2 xl:w-3/5 md:flex" style={{ backgroundImage: `url(${ApplicationLogo})` }}>                 */}

        <div className="relative grid min-h-screen bg-primary ">
            <div className="flex flex-col items-center flex-auto min-w-0 sm:flex-row md:items-start sm:justify-center md:justify-start ">
                <div className="relative items-center justify-center flex-auto hidden h-full p-10 overflow-hidden text-white bg-no-repeat bg-cover bg-primary sm:w-1/2 xl:w-3/5 md:flex">
                    <div className="absolute inset-0 z-0 bg-black opacity-25"></div>
                    <div className="z-10 items-center w-full text-center lg:max-w-2xl md:max-w-md ">
                        <div className="items-center content-center w-full mx-auto mb-6 font-bold leading-tight ">
                            {/* Your content here */}
                            <h1 className="text-4xl font-bold text-white ">
                                <ApplicationLogo className='w-56 h-56 mx-auto mb-10' />
                                {appName}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="w-full p-8 md:flex md:items-center md:justify-left sm:w-auto md:h-full xl:w-1/2 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
                    <div className="w-full max-w-xl space-y-12">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center ">
                                <div className="flex flex-col px-8 py-10 border border-gray-900 rounded-lg bg-primary-content w-80">
                                    <h1 className="text-4xl font-bold text-center uppercase">
                                        {pageTitle}
                                    </h1>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>
    );
}
