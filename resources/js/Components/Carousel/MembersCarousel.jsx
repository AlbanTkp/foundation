import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const getRandomMembers = () => {
  const names = ['John Doe', 'Jane Smith', 'David Lee', 'Maria Garcia', 'Chris Johnson', 'Patricia Brown', 'Michael Scott', 'Linda Davis', 'Paul Walker', 'Jessica Adams'];
  const titles = ['CEO', 'CTO', 'CFO', 'Designer', 'Developer', 'Manager', 'Product Owner', 'Engineer', 'Marketer', 'Sales Lead'];

  return Array(10).fill().map((_, i) => ({
    id: i,
    name: names[i],
    title: titles[i],
    picture: `https://i.pravatar.cc/150?img=${i + 1}`  // Random avatar from pravatar
  }));
};

const MembersCarousel = () => {
  
  const members = getRandomMembers();


  const settings = {
    infinite: members.length > 1,
    speed: 500,
    slidesToShow: 4,  // Adjust this value to show more/less members
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
          breakpoint: 1024, // For tablets and smaller laptops
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,  // For mobile devices in landscape mode
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,  // For mobile devices in portrait mode
          settings: {
            slidesToShow: 2,
          }
        }
      ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} className=''>
        {members.map(member => (
          <div key={"member_"+member.id} className="p-4">
            <div className="relative cursor-pointer group">
              <img 
                src={member.picture} 
                alt={member.name} 
                className="w-full m-auto transition duration-300 transform rounded-full group-hover:scale-105"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold group-hover:text-primary">{member.name}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 scale-105 bg-black bg-opacity-50 rounded-full opacity-0 bottom-11 group-hover:opacity-100">
                <span className="text-lg font-semibold text-white">{member.title}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MembersCarousel;
