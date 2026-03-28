"use client"

import Image from "next/image";
import Img from "../../../../public/Image/headphone.jpeg"
import TimeCounter from "@/Utils/timeCounter";
import Link from "next/link";

const Banner = () => {
   
    return (
        <section className="m-5 p-5 my-10 rounded-sm shadow-lg relative overflow-hidden bg-black mx-auto container ">
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <p className="text-green-500 font-bold text-md uppercase tracking-widest">
                        Categories
                    </p>
                    <h2 className="text-white font-extrabold text-3xl md:text-5xl my-5 leading-tight">
                        Enhance Your <br /> Buying Experience
                    </h2>
                    
                    {/* Countdown Timer */}
                   <TimeCounter deadline="2026-05-20T00:00:00" />

                    <Link href={"/shop"}>
                    <button className="bg-green-500 hover:bg-green-600 transition-colors text-white mt-5 py-3 px-8 font-bold rounded shadow-md">
                        Shop Now!
                    </button></Link>
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