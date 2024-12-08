import React, { useEffect, useState } from 'react';
import WelcomeLayout from '@/Layouts/WelcomeLayout'; 
import { SiFacebook as Facebook } from '@icons-pack/react-simple-icons';
import { Search, ChevronDown, ChevronRight, Twitter, Linkedin, Youtube, Instagram} from 'lucide-react';
import PartnersCarousel from '@/Components/Carousel/PartnerCarousel';
import MembersCarousel from '@/Components/Carousel/MembersCarousel';
import { NavLabels } from '@/Utils/Constants';
import { usePage } from '@inertiajs/react';
import TopicsCarousel from '@/Components/Carousel/TopicsCarousel';
import useScreenSize from '@/Hooks/useScreenSize';

const more = [
  {
    'img-url':'/images/f1.jpeg',
    'title': 'Our role',
    'comment' : 'Learn how our purposeful actions drive global opportunities and lasting impact. Experience the meaningful contributions we make to build a better future together.',
    'href': 'javascript:void(0)'
  },
  {
    'img-url':'/images/f5.jpeg',
    'title': 'How we work',
    'comment' : 'Discover how we create positive change through strategic collaboration and dedicated action. Experience the impact of our efforts as we drive innovation and build connections for a brighter future.',
    'href': 'javascript:void(0)'
  },
  {
    'img-url':'/images/f3.jpeg',
    'title': 'Our Story',
    'comment' : 'Explore our journey from humble beginnings to impactful achievements. Our story reflects resilience and commitment as we inspire change and empower communities worldwide.',
    'href': 'javascript:void(0)'
  }
]

const Welcome2 = ({papers}) => {
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
  const { width, height } = useScreenSize();
  const maxSlides = width <= 480 ? 1 : width <= 768 ? 2 : width <= 1024 ? 3 : 4
  

  const { props } = usePage();
  const allPages = props.allPages;


  const [ourIdeas, setOurIdeas] = useState([])

  useEffect(() => {
    const nb = allPages[NavLabels.IDEA].length
    if(nb >= 2){
      const firstIndex = Math.floor(Math.random() * nb);

      // Get a different random index for the second element
      let secondIndex;
      do {
        secondIndex = Math.floor(Math.random() * nb);
      } while (secondIndex === firstIndex);
  
      setOurIdeas([allPages[NavLabels.IDEA][firstIndex], allPages[NavLabels.IDEA][secondIndex]])
    }else if(nb == 1){
      setOurIdeas([allPages[NavLabels.IDEA][0]])
    }
    return () => {
      
    }
  }, [])

  
  return (
    <WelcomeLayout>
        <section className="px-3 mt-10 md:px-7 lg:mx-40 lg:my-14 lg:px-11">
          <h1 className="mb-2 text-3xl font-extrabold md:text-4xl lg:text-5xl text-primary">Building Hope, Inspiring Change: Empowering Communities for a Brighter Tomorrow</h1>
          {/* <a href="javascript:void(0);" className="inline-block my-5 font-medium underline text-primary">Read the 2024 Goalkeepers report</a> */}
          
          <div className="mt-10">
            <img src="https://www.gatesfoundation.org/-/media/gfo/2home/gk-report-cover_2000x1294.png?rev=ad037a991e5c4717a6783a9bbe0d6686&w=2000&hash=49F8BA7E7632394F5E4238B7989494B3" alt="The Race to Nourish a Warming World" className="w-full" />
          </div>
        </section>

        <section className={`p-3 my-10 border-t border-transparent md:border-primary-content md:p-7 lg:p-6 lg:mx-40 lg:my-14`}>
          <div className="grid grid-cols-1 mt-5 gap-7 md:grid-cols-3 md:mt-12">
            <div className="order-2 col-span-2 lg:order-1">
              <MembersCarousel />
            </div>
            <div className="order-1 col-span-1 lg:order-2">
              <h4 className='mb-5 font-serif text-3xl italic font-medium text-justify md:mb-10 md:text-4xl lg:mb-8 lg:font-semibold lg:text-4xl text-primary'>Our Members</h4>
              <p className='text-justify'>Their contributions are opening doors to opportunities around the globe, with every step leading to a greater collective impact. Watch, read, and experience the inspiring stories of dedicated individuals making a difference and driving meaningful change.</p>
              {/* <button className="py-2 mt-5 rounded text-primary md:mt-8 px-7 outline">Learn more</button> */}
            </div>
          </div>
        </section>

        {/* Ideas Section */}
        <section className="p-3 py-10 my-4 text-white bg-primary md:py-14 md:p-7 lg:my-8 lg:p-6 lg:px-40 lg:py-20">
        {ourIdeas.length >=1 &&
          <>
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="font-sans text-3xl font-semibold">Ideas</h3>
              <a href={route('ideas.index')} className="flex items-center font-sans font-semibold text-white underline">
                Learn more about ideas <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <p className="my-5 text-white lg:my-10">Read the latest research, and ideas from across the foundation.</p>
          </>
        }
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {ourIdeas.length >=1 &&
            <div className="font-sans lg:col-span-2">
              {ourIdeas[0].banner.type == "VIDEO" &&
              <video
                className="object-cover w-full mb-4"
                autoPlay
                muted
                loop
              >
                <source src={ourIdeas[0].banner.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              }
              {ourIdeas[0].banner.type == "IMAGE" &&

              <img
                className="w-full mb-4"
                src={ourIdeas[0].banner.path} />            
              }
              <h4 className="mb-2 text-xl font-semibold">{ourIdeas[0].title}</h4>
              <p className="font-light text-white text-md">{ourIdeas[0].description}</p>
              {/* <p className="mt-4 font-semibold text-md">By Asyia Kazmi</p> */}
              {/* <p className="font-light text-white text-md">Senior Program Officer, Bill & Melinda Gates Foundation</p> */}
            </div>}
            <div className={`font-sans ${ourIdeas.length >= 1 ? 'lg:col-span-1': 'lg:col-span-3'}`}>
              {ourIdeas.length == 2 && ourIdeas[1].banner.type == "VIDEO" &&
              <video
                className="object-cover w-full mb-4"
                autoPlay
                muted
                loop
              >
                <source src={ourIdeas[1].banner.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              }
              {ourIdeas.length == 2 && ourIdeas[1].banner.type == "IMAGE" &&
              <img
                className="w-full mb-4"
                src={ourIdeas[1].banner.path} />            
              }
              {ourIdeas.length == 2 &&
                <h4 className="mb-2 text-xl font-semibold">{ourIdeas[1].title}</h4>
              }
              <div className={`p-8 text-justify bg-white ${ourIdeas.length == 2 && 'mt-14'}`}>
                <p className="mb-2 font-semibold text-gray-900 text-md">Subscribe to or newsletter to get weekly updates on our activities</p>
                <div className="mt-8">
                  <input type="email" placeholder="Enter email address" className="w-full p-2 rounded text-primary" /><br />
                  <button className="py-3 mt-4 font-semibold text-white rounded bg-primary px-7">Subscribe</button>
                </div>
                <p className='mt-5 text-gray-600'>By submitting your email to subscribe, you agree to the {appName} <a href="javascript:void(0);" className='underline'>Privacy & Cookies Notice</a></p>
              </div>

            </div>
          </div>
          
        </section>


        {/* Videos Section */}
        <section className={`px-3 font-sans ${ourIdeas.length < 2 && 'border-t border-transparent md:border-primary-content'} md:mx-7 lg:mx-40 lg:my-14`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="my-10 font-serif text-2xl font-semibold lg:text-4xl text-primary">Topics</h3>
            <a href={route('trendings.index')} className="flex items-center font-semibold underline text-primary hover:text-primary">
              See all topics <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          {
            papers.length >= maxSlides ?
            <TopicsCarousel topics={papers}/>
            :
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {papers.map((item) => (
                <div className=''>
                  <img src={item['banner']['path']} alt="Women's Economic Power" className="object-cover w-full mb-6 rounded h-52" />
                  <a href={route('trendings.show', item['id'])} className="inline-block mb-3 text-xl font-semibold lg:mb-6 hover:underline hover:text-primary">{item.title}</a>
                  {/* <p className="text-primary text-md">{item.comment}</p> */}
                </div>
                ))}
            </div>
          }
        </section>

        <section className={`py-6 mx-3 font-sans border-t border-transparent md:border-primary-content md:mx-7 lg:pt-12 lg:mx-40 mt-7 lg:mt-14`}>
          <h3 className="mb-3 font-serif text-2xl font-semibold capitalize lg:mb-6 lg:text-4xl text-primary">Foundation facts</h3>
          <p className="text-gray-600 mb-14 text-md">For the year ended December 31, 2022. Amounts in US dollars</p>
          <div className="flex flex-wrap justify-around font-serif gap-x-10 md:gap-x-20 lg:gap-x-0 gap-y-10">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold md:text-6xl lg:mb-4">2,026</div>
              <div className="text-sm">Employees</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold md:text-6xl lg:mb-4">2,396</div>
              <div className="text-sm">Number of grants</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold md:text-6xl lg:mb-4">$7.7B</div>
              <div className="text-sm">Total charitable support</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold md:text-6xl lg:mb-4">1,422</div>
              <div className="text-sm">Grantees</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold md:text-6xl lg:mb-4">44</div>
              <div className="text-sm">Program strategies</div>
            </div>
          </div>
        </section>
        <section className={`p-3 my-7 mt-0 border-t border-transparent md:border-primary-content md:p-7 lg:p-6 lg:mx-40 lg:mt-14 lg:my-14`} id='partners'>
          <div className="grid grid-cols-1 mt-5 gap-7 md:grid-cols-3 md:mt-12">
            <div className="items-center order-2 col-span-2 lg:order-1">
              <PartnersCarousel />
            </div>
            <div className="order-1 col-span-1 lg:order-2">
              <h4 className='mb-5 font-serif text-3xl italic font-medium text-justify md:mb-10 md:text-4xl lg:mb-8 lg:font-semibold lg:text-4xl text-primary'>Our Partners</h4>
              <p className='text-justify'>Their work helps create opportunities around the world, turning each effort into the potential for global change. Watch, read, and experience their inspiring stories as they pave the way for even greater and more impactful initiatives.</p>
              {/* <button className="py-2 mt-5 rounded text-primary md:mt-8 px-7 outline">Learn more</button> */}
            </div>
          </div>
        </section>


        {/* More about the foundation */}
        <section className="px-3 font-sans border-t border-transparent md:border-primary-content md:mx-7 lg:mx-40 my-7 lg:my-14">
          <h3 className="font-serif text-2xl font-semibold lg:text-4xl my-7 lg:my-14 text-primary">More about the foundation</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
            <div>
              <img src={item['img-url']} alt="Our role" className="object-cover w-full h-64 mb-3 rounded lg:mb-7" />
              <h4 className="mb-3 text-xl font-semibold">{item.title}</h4>
              <p className="mb-3 text-gray-600 text-md">{item.comment}</p>
              <a href={item['href']} className="underline text-primary text-md">Learn more</a>
            </div>
            ))}
          </div>
        </section>
    </WelcomeLayout>
  );
};

export default Welcome2;