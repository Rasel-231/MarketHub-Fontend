"use client";

import Image from "next/image";
import MinHeader from "@/components/shared/MinHeader";
import Img1 from "../../../../../public/Image/airphone.jpg";
import Img2 from "../../../../../public/Image/watch.webp";
import Img3 from "../../../../../public/Image/soundbox.jpg";
import Img4 from "../../../../../public/Image/airpot.jpg";

const Featured = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <MinHeader title="Featured"/>
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider mt-4">
          New Arrival
        </h2>
      </div>

      <section className="flex flex-col md:flex-row gap-5 h-auto md:h-[600px]">
        {/* Left Side - Big Card */}
        <div className="w-full md:w-1/2 relative bg-zinc-900 rounded-xl overflow-hidden group h-[400px] md:h-full">
          <Image
            src={Img1}
            alt="Airphone"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute bottom-8 left-8 z-10 text-white max-w-[280px]">
            <h3 className="text-2xl font-bold mb-2">Best Choice for You</h3>
            <p className="text-sm text-gray-300 mb-4">Explore your buying skill with premium quality.</p>
            <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
          </div>
        </div>

        {/* Right Side - Grid Stack */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {/* Top Wide Card */}
          <div className="h-[280px] md:flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
            <Image
              src={Img2}
              alt="Watch"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute bottom-6 left-6 z-10 text-white max-w-[250px]">
              <h3 className="text-xl font-bold mb-1">Best Choice for You</h3>
              <p className="text-xs text-gray-300 mb-3">Explore your buying skill with premium quality.</p>
              <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
            </div>
          </div>

          {/* Bottom Two Small Cards */}
          <div className="flex flex-row gap-5 h-[250px] md:flex-1">
            <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
              <Image
                src={Img3}
                alt="Soundbox"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-4 left-4 z-10 text-white">
                <h3 className="text-lg font-bold">Best Choice</h3>
                <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
              </div>
            </div>

            <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
              <Image
                src={Img4}
                alt="Airpot"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-4 left-4 z-10 text-white">
                <h3 className="text-lg font-bold">New Airpots</h3>
                <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;