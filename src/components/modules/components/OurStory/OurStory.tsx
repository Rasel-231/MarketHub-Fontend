"use client";

import React from 'react';
import Image from 'next/image';
import { Store, DollarSign, ShoppingBag, Users } from 'lucide-react';

// Components
import BreadCumb from '../../common/BreadCumb/BreadCumb';
import TeamMemberSection from './Testimonial';
import Services from '../Services/Services';

// Static Image
import Img from '../../../../../public/Image/In no time-amico.png';

const OurStory = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Breadcrumb - Minimal Top Space */}
      <div className="container mx-auto px-4 py-6">
        <BreadCumb />
      </div>

      {/* Hero Section - Balanced Spacing */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg max-w-xl">
              <p>
                Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions.
              </p>
              <p>
                Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region. Exclusive has more than 1 Million products to offer, growing at a very fast pace. 
              </p>
            </div>
          </div>
          
          {/* Image Side - Perfectly Aligned */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] h-[350px] md:h-[450px]">
              <Image 
                src={Img} 
                alt="Our Story Illustration" 
                fill
                className="object-contain" 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - No Default Red, All Uniform */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Store size={28} />} 
            value="10.5K" 
            label="Sellers active our site" 
          />
          <StatCard 
            icon={<DollarSign size={28} />} 
            value="33K" 
            label="Monthly Product Sale" 
          />
          <StatCard 
            icon={<ShoppingBag size={28} />} 
            value="45.5K" 
            label="Customer active in our site" 
          />
          <StatCard 
            icon={<Users size={28} />} 
            value="25K" 
            label="Annual gross sale" 
          />
        </div>
      </section>

      {/* Content Sections */}
      <div className="space-y-16">
        <TeamMemberSection />
        <div className="pb-20">
            <Services />
        </div>
      </div>
    </main>
  );
};

// Fixed Stat Card Component - Hover Effect Only
const StatCard = ({ icon, value, label }: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
}) => {
  return (
    <div className="group flex flex-col items-center justify-center p-8 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent hover:bg-[#DB4444] hover:border-[#DB4444] transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-red-500/20">
      
      {/* Outer Circle */}
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-red-400 transition-colors duration-300">
        {/* Inner Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-extrabold mb-1 tracking-tight text-black dark:text-white group-hover:text-white">
        {value}
      </h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 group-hover:text-white leading-tight">
        {label}
      </p>
    </div>
  );
};

export default OurStory;