import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PartnersCarousel = () => {

  const partners = [
    { id: 1, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 1' },
    { id: 2, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 2' },
    { id: 3, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 3' },
    { id: 4, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 4' },
    { id: 5, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 5' },
    { id: 6, logo: 'https://logo-marque.com/wp-content/uploads/2020/09/Microsoft-Logo.png', name: 'Partner 6' },
  ];

  const settings = {
    infinite: partners.length > 1,
    speed: 500,
    slidesToShow: 4,  // Adjust this value to show more/less partners
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
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
        {partners.map(partner => (
          <div key={partner.id} className="px-2 py-4">
            <div className='relative overflow-hidden group'>
              <img src={partner.logo} alt={partner.name} className='object-cover w-full h-auto transition duration-300 transform group-hover:scale-105' />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded-md opacity-0 bg-opacity-60 group-hover:opacity-100">
                  <span className="text-lg font-semibold text-white">{partner.name}</span>
                </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnersCarousel;
