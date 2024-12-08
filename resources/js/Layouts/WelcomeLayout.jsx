import React, { useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { SiFacebook as Facebook } from '@icons-pack/react-simple-icons';
import { Search, ChevronDown, ChevronRight, Twitter, Linkedin, Youtube, Instagram, ChevronUp, LogOutIcon} from 'lucide-react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { NavLabels } from '@/Utils/Constants';
import useScreenSize from '@/Hooks/useScreenSize';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaSearch } from "react-icons/fa";
import NavLink from '@/Components/NavLink';
import { IoArrowBack } from 'react-icons/io5';
import GTranslate from '@/Components/GTranslate';

const WelcomeLayout = ({path = null, children}) => {
  const { width, height } = useScreenSize();
  const smallScreen = width < 1024;

  const { props } = usePage();
  const pages = props.allPages;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const logoUrl = ""
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
  const navs = [
    {
      'label':NavLabels.ABOUT,
      'desc':'We are dedicated to unlocking human potential through innovative initiatives and partnerships. Our mission is to empower individuals and communities, driving meaningful change for a better future.',
      'link-text':'Learn more about us',
      'href':route('about.index'),
      'label2':"Farid DANKO",
      'href2':'#',
      'desc2':'',
      'image':'https://wallstreettimes.com/wp-content/uploads/2024/09/Farid-Danko-Transforming-the-Lives-of-Children-in-Africa.png',
      'img-class': 'w-24 h-24 rounded-full object-cover',
      'children':pages[NavLabels.ABOUT]
    },
    {
      'label':NavLabels.WORK,
      'desc':'Learn about our impactful initiatives and projects dedicated to empowering individuals and fostering community growth.',
      'link-text':'Explore our work',
      'href':route('works.index'),
      'label2':"Our Activities",
      'href2':route('trendings.index'),
      'desc2':'We engage in various initiatives designed to empower individuals and strengthen communities, fostering growth and collaboration.',
      'image':'https://www.gatesfoundation.org/-/media/gfo/4our-work/programs/global-development/programs_globaldev_immunization_ga16086315_sc614367_1600x1000.jpg?rev=73f84a4f4c9641dd83ce07a402de78aa&w=270&hash=F2C9E15F199D2C6EEAF8C9B0B82FB373',
      'img-class': false,
      'children':pages[NavLabels.WORK]
    },
    {
      'label':NavLabels.IDEA,
      'desc':'Explore our innovative concepts and strategies aimed at unlocking human potential. We believe creativity and collaboration can drive meaningful change.',
      'link-text':'Discover our ideas',
      'href':route('ideas.index'),
      'label2':"Our Partners",
      'href2':'#partners',
      'desc2':'We collaborate with visionary organizations and individuals dedicated to fostering human potential and driving positive change in communities.',
      'image':'https://www.gatesfoundation.org/-/media/gfo/5ideas_articles/portraits-of-potential/bmgf_thumbnail_manifesto_1600x1000.png?rev=320fa51085e6429d87c0c08ec52c3d95&w=270&hash=D5035E5B1EADE0B27FD1F139BBDA1E58',
      'img-class': false,
      'children':pages[NavLabels.IDEA]
    },
    ]

  const breadcrumbsFonts = ['font-bold','font-medium','font-light','font-extralight']
  const [navOpened, setNavOpened] = useState(-1)
  const handleMenuClick = (index)=>{
    index == navOpened ? setNavOpened(-1): setNavOpened(index)
  }
  const [navSubMenu, setNavSubMenu] = useState(null)
  
  useEffect(() => {
    if(!smallScreen){
      if(navOpened != -1){
        setNavSubMenu(
          <div className="absolute z-20 grid grid-cols-3 py-12 bg-white border-b mt-30 border-b-gray-300">
            <div className="ps-44 px-14">
              <h3 className="font-sans text-xl font-semibold">{navs[navOpened].label}</h3>
              <p className="my-5 text-justify text-wrap text-md">
              {navs[navOpened].desc}
              </p>
              <a href={navs[navOpened].href} className='font-sans font-semibold underline hover:text-primary'>{navs[navOpened]['link-text']}</a>
            </div>
            <div className="grid grid-cols-2 gap-5 px-6 text-md">
              {navs[navOpened].children &&
                <div className="flex flex-col gap-3">
                {navs[navOpened].children.slice(0, Math.ceil(navs[navOpened].children.length / 2)).map((child, index) => (
                <a href={
                  navs[navOpened].label == NavLabels.ABOUT ?
                  route('about.show',child.id) :
                  navs[navOpened].label == NavLabels.WORK ?
                  route('works.show',child.id) :
                  route('ideas.show',child.id) 
                } className="block mb-3 break-words hover:underline text-wrap hover:text-primary">{child.title}</a>
              ))}            
              </div>
              }
              <div className="flex flex-col gap-3">
              {navs[navOpened].children.slice(Math.ceil(navs[navOpened].children.length / 2)).map((child, index) => (
                <a href={
                  navs[navOpened].label == NavLabels.ABOUT ?
                  route('about.show',child.id) :
                  navs[navOpened].label == NavLabels.WORK ?
                  route('works.show',child.id) :
                  route('ideas.show',child.id) 
                } className="block mb-3 break-words hover:underline text-wrap hover:text-primary">{child.title}</a>
              ))}            
              </div>
            </div>
            <div className="px-16 border-l border-gray-300 pe-44">
              <img src={navs[navOpened].image} className={navs[navOpened]['img-class']} alt="" srcset=""/>
              <a href={navs[navOpened].href2} className="inline-block my-5 font-sans text-lg font-semibold hover:underline hover:text-primary">{navs[navOpened].label2}</a>
              <p>{navs[navOpened].desc2}</p>
            </div>
          </div>
          )
      }else{
        setNavSubMenu(null)
      }
    }else{
      if(navOpened >= 0){
        setNavSubMenu(
          <div className="z-20 w-full h-full px-3 bg-whites top-[4rem] overflow-y-scroll pb-40">
            <div className="fixed z-50 w-full py-1 bg-white border-y">
              <button
                type="button"
                className="items-center block px-1 py-5 font-sans text-lg font-medium transition duration-150 ease-in-out bg-white border border-dashed text-primary border-primary text-md"
                onClick={(e)=>setNavOpened(-1)}
                >
                  <div className="flex items-center justify-between gap-2">
                  <IoArrowBack className="w-5 h-5 ml-1" />
                  <span className='font-sans text-xl font-semibold underline'>Back</span>
                  </div>
              </button>
            </div>
            <div className="relative overflow-y-scroll pe-10 top-20">
              <h3 className="my-5 font-serif text-xl font-semibold">{navs[navOpened].label}</h3>
              <p className='text-lg font-extralight'>{navs[navOpened].desc}</p>
              <a href={navs[navOpened].href} className="inline-block my-5 font-medium underline text-md hover:text-primary">{navs[navOpened]['link-text']}</a>
              <div className="mt-4">
                {
                  navs[navOpened].children.map((child)=>{
                    return <a 
                            href={
                                navs[navOpened].label == NavLabels.ABOUT ?
                                route('about.show',child.id) :
                                navs[navOpened].label == NavLabels.WORK ?
                                route('works.show',child.id) :
                                route('ideas.show',child.id) 
                              }
                              className="block mb-5 font-extralight hover:underline text-md hover:text-primary">{child.title}</a>
                  })
                }
              </div>
            </div>
          </div>
        )
      }else{
        setNavSubMenu(
        <div className="relative z-40 w-full h-full px-3">
          {navs.map((nav, index)=>{
            return <button
                    type="button"
                    className="items-center block w-full font-sans text-lg font-medium text-primary transition duration-150 ease-in-out bg-white border-t-[0.1px] border-gray-300 py-6 text-md focus:border-dashed focus:border-primary focus:border px-1"
                    onClick={(e)=>setNavOpened(index)}
                >
                <div className="flex justify-between">
                {nav.label} <ChevronRight className="w-6 h-6 ml-1" />
                </div>
            </button>
          })}
        </div>
        )
      }
    }
  
    return () => {
    }
  }, [navOpened, sidebarOpen])
  

  const handleLangChange = (newLang)=>{
    setLang(newLang)
  }

  const [lang, setLang] = useState("EN")

  return (
    <div className="mx-auto " style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div class={`${sidebarOpen?'fixed z-20 w-full h-full top-0':'relative'} bg-white overflow-auto`}>
      <header className={`relative bg-white grid items-center order-3 grid-cols-10 px-2 border-b lg:gap-8 lg:px-8 lg:grid-cols-3 lg:mx-36`}>
        {smallScreen &&
        <button className='flex col-span-1 p-1 border rounded w-min' onClick={(e)=>{
          if(sidebarOpen) setNavOpened(-1)
          setSidebarOpen(!sidebarOpen)
        }}>
            <Bars3Icon className={`${!sidebarOpen ? 'block' : 'hidden'} h-7 w-7`}></Bars3Icon>
            <XMarkIcon className={`${sidebarOpen ? 'block' : 'hidden'} h-7 w-7`}></XMarkIcon>
        </button>}


        <div className="flex items-center col-span-6 gap-2 font-bold md:col-span-7 text-primary ps-6 lg:col-span-1 text-md md:text-3xl lg:text-xl">
          <ApplicationLogo lang={lang} className='w-12 h-12 lg:h-[55px] lg:w-[55px] my-2'/>
          <span>{appName}</span>
        </div>

        {!smallScreen &&
        <nav className="flex items-center py-0 space-x-4 font-semibold">
        {navs.map((nav, index) => (
          <div onClick={(e)=>handleMenuClick(index)} className={`relative  ml-3 hover:border-b-2 border-primary ${navOpened == index && 'border-b-2'}`}>
            <div className={`${navOpened == index && ' border-x border-dashed border-primary'} py-[1.2rem]`}>
              <span className="inline-flex rounded-md">
                  <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 font-sans leading-4 transition duration-150 ease-in-out bg-white border border-transparent rounded-md text-primary text-md focus:outline-none"
                  >
                  {nav.label}{navOpened == index ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>
              </span>
            </div>
          </div>
        ))}

        </nav>}
        <div className="flex flex-wrap items-center justify-end order-3 col-span-3 gap-2 font-sans text-lg font-medium md:col-span-2 lg:col-span-1">
          {/* Search
          <FaSearch className='w-5 h-5' /> */}
          <GTranslate onChange={handleLangChange}/>
        </div>
      </header>
      {!smallScreen && navOpened != -1 && 
      navSubMenu
      }

      {smallScreen && sidebarOpen &&
          <>
          <hr/>
          {navSubMenu && navSubMenu}
          </>
      }
      </div>
      
      {/* Main Content */}
      <main  className=''>
      {path &&
      <div className="border-b breadcrumbs">
          <ul className='px-3 py-5 lg:px-40'>
               {path.map((element, index) => (
                <li key={'bread_'+index}>
                    <Link 
                    href={element.href}
                    className={`text-sm lg:text-lg text-wrap ${breadcrumbsFonts[index]} ${index+1 == path.length?'text-primary':'text-black'}`}
                    >
                        &nbsp;{element.label}
                    </Link>
                </li> 
              ))}
          </ul>
      </div>
    }
      <div className="font-sans">
      {children}
      </div>
      </main>
        {/* Footer */}
      <footer className="px-3 py-4 font-sans text-gray-400 bg-primary md:px-7 lg:px-40 lg:py-8">
        <div className="grid grid-cols-1 gap-8 py-5 md:py-10 lg:grid-cols-5">
          <div className="px-5 md:px-0 md:col-span-5 lg:col-span-2">
            <h1 className="flex items-center justify-center gap-5 text-2xl font-bold text-center text-white md:gap-0 lg:block md:text-3xl lg:text-4xl lg:text-start">
            <ApplicationLogo lang={lang} className='w-20 h-20 mx-auto md:w-32 md:h-32 lg:mb-10 lg:w-56 lg:h-56' />
            <span className="">{appName}</span>
            </h1>
          </div>
          <br className='lg:hidden'/>
          <div className="md:col-span-5 lg:col-span-3">
            <div className="grid grid-cols-1 gap-8 pb-8 border-b border-white md:gap-16 md:grid-cols-2">
              <div className='col-span-1'>
                <p className="mb-6 text-center text-white md:mb-12 md:text-start">
                  We are a nonprofit fighting poverty, disease, and inequity around the world.
                </p>
                <div className="flex justify-between mx-10 font-serif text-white md:mx-0">
                  {/* Replace '#' with your actual links */}
                  <a href="javascript:void(0);" className="text-lg font-semibold underline">
                  About
                  </a>
                  <span className='text-xl text-white'>-</span>
                  <a href="javascript:void(0);" className="text-lg font-semibold underline">
                  Our Work
                  </a>
                  <span className='text-xl text-white'>-</span>
                  <a href="javascript:void(0);" className="text-lg font-semibold underline">
                  Ideas
                  </a>
                </div>
              </div>
              {/* Social Media Icons */}
              <div className="flex justify-between col-span-1 mx-10 space-x-6 text-white md:mx-0 lg:justify-start">
                {/* Replace '#' with your actual links */}
                <a href="javascript:void(0);" className="">
                  <Facebook/>
                </a>
                <a href="javascript:void(0);" className="">
                <Twitter/>
                </a>
                <a href="javascript:void(0);" className="">
                <Linkedin/>
                </a>
                <a href="javascript:void(0);" className="">
                <Instagram/>
                </a>
                <a href="javascript:void(0);" className="">
                <Youtube/>
                </a>
              </div>
            </div>
            <div className="flex flex-col flex-wrap justify-between gap-4 mt-10 font-light text-white md:gap-2 md:flex-row text-md">
              <a href="javascript:void(0);" className="text-center underline">Contact</a>
              <span className='hidden text-xl md:block'>-</span>
              <a href="javascript:void(0);" className="text-center underline">Media Center</a>
              <span className='hidden text-xl md:block'>-</span>
              <a href="javascript:void(0);" className="text-center underline">Careers</a>
              <span className='hidden text-xl md:block'>-</span>
              <a href="javascript:void(0);" className="text-center underline">Discovery Center</a>
              <span className='hidden text-xl md:block'>-</span>
              <a href="javascript:void(0);" className="text-center underline">Give with us</a>
              <span className='hidden text-xl md:block'>-</span>
              <a href="javascript:void(0);" className="text-center underline">Goalkeepers</a>
            </div>
            <div className="flex flex-col flex-wrap justify-between gap-3 mt-5 font-light text-gray-400 md:gap-2 md:flex-row text-md">
              <a href="javascript:void(0);" className="text-center underline">Reporting scams</a>
              <span className='hidden text-xl md:block'>|</span>
              <a href="javascript:void(0);" className="text-center underline">Ethics reporting</a>
              <span className='hidden text-xl md:block'>|</span>
              <a href="javascript:void(0);" className="text-center underline">Privacy & Cookies Notice</a>
              <span className='hidden text-xl md:block'>|</span>
              <a href="javascript:void(0);" className="text-center underline">Terms of Use</a>
              <span className='hidden text-xl md:block'>|</span>
              <a href="javascript:void(0);" className="text-center underline">Brand guidelines</a>
            </div>
            <div className="pt-4 mt-8 text-sm text-center text-gray-300 md:text-left">
            © {new Date().getFullYear()} Farid Danko Foundation. All rights reserved.
              </div>

          </div>

        </div>
      </footer>
    </div>
  );
};

export default WelcomeLayout;