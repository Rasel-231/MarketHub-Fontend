"use client";

import Image from "next/image";
import { 
  Store, DollarSign, ShoppingBag, Users, 
  Trophy, Milestone, Briefcase, Medal, 
  Zap, ShieldCheck 
} from "lucide-react";

import BreadCumb from "../../common/BreadCumb/BreadCumb";
import TeamMemberSection from "./Testimonial";
import Services from "../Services/Services";
import Img from "../../../../../public/Image/In no time-amico.png";
import { StatCard } from "./StateCard";
import Achivement from "./Achivement";

const ACHIVEMENT_DATA = [
  { name: "Top Rated", icon: <Trophy size={32} />, color: "text-yellow-500" },
  { name: "Milestones", icon: <Milestone size={32} />, color: "text-blue-500" },
  { name: "Fast Growth", icon: <Briefcase size={32} />, color: "text-green-500" },
  { name: "Recognition", icon: <Medal size={32} />, color: "text-purple-500" },
  { name: "High Speed", icon: <Zap size={32} />, color: "text-orange-500" },
  { name: "Secure", icon: <ShieldCheck size={32} />, color: "text-teal-500" },
];

const OurStory = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] font-nunito overflow-x-hidden">
      <div className="container mx-auto px-4">
        <BreadCumb />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-[50vh] px-4 md:px-10 py-10">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-4xl md:text-5xl">Our Story</h1>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Launched in 2015, Exclusive is South Asia’s premier online shopping
              marketplace with an active presence in Bangladesh. Supported by a
              wide range of tailored marketing, data, and service solutions.
            </p>
            <p>
              Exclusive has 10,500 sellers and 300 brands and serves 3 million
              customers across the region. Exclusive has more than 1 Million
              products to offer, growing at a very fast pace.
            </p>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[450px]">
          <Image
            src={Img}
            alt="Our Story Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Store size={28} />} value="10.5K" label="Sellers active our site" />
          <StatCard icon={<DollarSign size={28} />} value="33K" label="Monthly Product Sale" />
          <StatCard icon={<ShoppingBag size={28} />} value="45.5K" label="Customer active in our site" />
          <StatCard icon={<Users size={28} />} value="25K" label="Annual gross sale" />
        </div>
      </section>

      {/* Achievements Marquee */}
      <div className="py-10 bg-gray-50/50 dark:bg-white/5">
        <Achivement speed={50} pauseOnHover={true} className="pb-4">
          {ACHIVEMENT_DATA.map((item) => (
            <div 
              key={item.name}
              className="flex flex-col items-center justify-center border-2 border-gray-200 dark:border-gray-800 rounded-xl w-48 h-40 gap-4 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 cursor-pointer group bg-white dark:bg-[#0a0a0a]"
            >
              <div className={`${item.color} group-hover:text-white transition-colors duration-300`}>
                {item.icon}
              </div>
              <span className="font-semibold uppercase tracking-wider text-sm">{item.name}</span>
            </div>
          ))}
        </Achivement>
      </div>

      {/* Team & Services */}
      <div className="space-y-20 py-20">
        <TeamMemberSection />
        <Services />
      </div>
    </main>
  );
};

export default OurStory;