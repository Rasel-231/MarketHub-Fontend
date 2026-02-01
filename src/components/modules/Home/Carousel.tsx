"use client";
import Image from 'next/image'; // Import the Next.js Image component
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = () => {
  const slides = [
    { id: 1, src: "/Image/st-martin_1.jpg", alt: "Product1", label: "Legend1" },
    { id: 2, src: "/Image/st-martin_2.jpg", alt: "Product2", label: "Legend2" },
    { id: 3, src: "/Image/st-martin_3.jpg", alt: "Product3", label: "Legend3" },
    { id: 4, src: "/Image/st-martin_4.jpg", alt: "Product4", label: "Legend4" },
    { id: 5, src: "/Image/st-martin_5.jpg", alt: "Product5", label: "Legend5" },
    { id: 6, src: "/Image/st-martin_6.jpg", alt: "Product6", label: "Legend6" },
  ];

  return (
    <div className="w-full mx-auto">
      <Carousel 
        showArrows={true} 
        infiniteLoop={true} 
        showThumbs={false}
        autoPlay={true}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[400px] w-full">
            <Image 
              src={slide.src} 
              alt={slide.alt}
              fill // Makes image fill the container
              className="object-cover" // Ensures it doesn't stretch weirdly
              priority={slide.id === 1} // Loads the first image immediately
            />
            <p className="legend">{slide.label}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;