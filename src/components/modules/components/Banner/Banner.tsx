"use client"

import Image from "next/image";
import Img from "../../../../../public/Image/headphone.jpeg";

const Banner = () => {
    // Shared styling for the timer circles
    const timerCircleStyle = "bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center text-xs font-bold leading-tight";

    return (
        <section className="m-5 p-5 my-10 rounded-sm shadow-lg relative overflow-hidden bg-black mx-auto container ">
            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <p className="text-green-500 font-bold text-md uppercase tracking-widest">
                        Categories
                    </p>
                    <h2 className="text-white font-extrabold text-3xl md:text-5xl my-5 leading-tight">
                        Enhance Your <br /> Buying Experience
                    </h2>
                    
                    {/* Countdown Timer */}
                    <div className="flex gap-4 mb-8">
                        <div className={timerCircleStyle}><span>05</span><span>Days</span></div>
                        <div className={timerCircleStyle}><span>23</span><span>Hours</span></div>
                        <div className={timerCircleStyle}><span>59</span><span>Mins</span></div>
                        <div className={timerCircleStyle}><span>35</span><span>Secs</span></div>
                    </div>

                    <button className="bg-green-500 hover:bg-green-600 transition-colors text-white py-3 px-8 font-bold rounded shadow-md">
                        Buy Now!
                    </button>
                </div>
            </div>

            {/* Background Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <Image 
                    src={Img} 
                    alt="Premium Headphones Banner" 
                    fill
                    className="object-cover opacity-70"
                    priority
                />
            </div>
        </section>
    );
};

export default Banner;