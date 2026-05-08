"use client";

import { useGetBannerImagesQuery } from '@/store/api/bannerApi/bannerApi';
import { IBannerDoc, IBannerImage } from '@/types/types';
import Image from 'next/image'; 
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = () => {
  const { data: responses, isLoading } = useGetBannerImagesQuery(undefined);

  if (isLoading) {
    return (
      <div className="w-full mx-auto container mt-10 px-4">
        <div className="h-[200px] md:h-[450px] w-full bg-slate-800 animate-pulse rounded-3xl" />
      </div>
    );
  }

  const allImages: IBannerImage[] = Array.isArray(responses?.data)
    ? responses.data.flatMap((bannerDoc: IBannerDoc) =>
        bannerDoc.images.map((imgUrl: string, index: number) => ({
          id: `${bannerDoc.id}-${index}`,
          url: imgUrl
        }))
      )
    : [];

  if (allImages.length === 0) return null;

  return (
    <div className="w-full mx-auto container mt-10 mb-16 px-4 md:px-0">
      

      <div className="relative mb-10">
        <h2 className="text-4xl md:text-7xl font-black text-slate-800/20 absolute -top-4 md:-top-9 left-0 select-none tracking-tighter">
          MARKETHUB
        </h2>
        

        <div className="relative z-10 flex items-center gap-4">
          <div className="h-10 w-[5px] bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.7)] rounded-full" />
          <div>
            <h3 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">
              Next-Gen <span className="text-red-600 italic">Choice</span>
            </h3>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium tracking-[0.2em] uppercase mt-1">
              Exclusive Products of Upcoming Collections
            </p>
          </div>
        </div>
      </div>
      {/* --- Unique Premium Title End --- */}

      {/* --- Carousel Container --- */}
      <div className="relative group overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5">
        
        <Carousel 
          showArrows={true} 
          infiniteLoop={true} 
          showThumbs={false}
          autoPlay={true}
          showStatus={false}
          interval={5000}
          stopOnHover={true}
          emulateTouch={true}
          swipeable={true}
          transitionTime={800}
          renderIndicator={(onClickHandler, isSelected, index) => (
            <li
              className={`inline-block mx-1 w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                isSelected ? "bg-red-600 w-6" : "bg-white/20"
              }`}
              onClick={onClickHandler}
              key={index}
            />
          )}
        >
          {allImages.map((image: IBannerImage, index: number) => (
            <div 
              key={image.id} 
              className="relative w-full h-[200px] sm:h-[350px] md:h-[480px] lg:h-[580px] overflow-hidden"
            >
              <Image 
                src={image.url} 
                alt={`Upcoming Collection ${index + 1}`}
                fill 
                className="object-cover transition-transform duration-[4000ms] group-hover:scale-110" 
                priority={index === 0} 
                sizes="100vw"
                quality={100}
              />
              
              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
              
              {/* Subtle Branding on Slide */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-white rounded-full uppercase tracking-widest font-semibold">
                  MarketHub Studio © 2026
                </span>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Shine Animation on Hover */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-30 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1.5s_ease-in-out] pointer-events-none" />
      </div>
    </div>
  );
};

export default HomeCarousel;