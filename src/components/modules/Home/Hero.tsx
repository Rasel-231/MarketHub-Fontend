"use client";

import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";
import {motion} from "framer-motion"
const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white">
          
          {/* Main Heading */}
          <motion.h1 whileHover={{ scale: 1.02 }} className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
            Elevate Your <span className="text-primary">Style</span> with MarketHub
          </motion.h1>

          {/* Paragraph with Typewriter Effect */}
          <div className="mb-8 min-h-[60px] text-sm font-light text-gray-200 sm:text-base md:text-lg lg:text-xl cursor-default">
            <Typewriter
              options={{
                strings: ["Experience the future of online shopping.High-quality products at your fingertips.Exclusive deals and lightning-fast delivery.Everything you need, everywhere you go."],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 20,
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-48 sm:w-auto px-8 py-6 text-lg">
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-48 sm:w-auto px-8 py-6 text-lg border-white text-gray-600 hover:bg-white hover:text-black transition-all"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;