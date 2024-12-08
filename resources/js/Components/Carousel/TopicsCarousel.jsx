import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TopicsCarousel = ({ topics }) => {  
  const settings = {
    infinite: topics.length > 2,
    speed: 500,
    slidesToShow: 4,  // Adjust this value to show more/less topics
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller laptops
        settings: {
          slidesToShow: 3,
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
            slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="px-4 py-8 carousel-container">
      <Slider {...settings}>
        {topics.map(item => (
          <div key={`topic_${item.id}`} className="p-2">
            <img 
              src={item.banner.path} 
              alt={item.title} 
              className="object-cover w-full mb-4 rounded-lg shadow-lg h-52"
            />
            <a 
              href={route('trendings.show', item.id)} 
              className="inline-block text-xl font-semibold text-gray-800 transition duration-300 hover:underline hover:text-primary"
            >
              {item.title}
            </a>
            {/* <p className="text-primary text-md">{item.comment}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopicsCarousel;
