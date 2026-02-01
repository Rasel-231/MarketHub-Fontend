"use client"

import { MoveLeft, MoveRight, Smartphone, Monitor, Watch, Camera, Headset, Gamepad2 } from "lucide-react";
import MinHeader from "../../common/MinHeader/MinHeader";
import Category from "./Category";

const CATEGORIES = [
  { name: "Phones", icon: <Smartphone size={32} /> },
  { name: "Computers", icon: <Monitor size={32} /> },
  { name: "SmartWatch", icon: <Watch size={32} /> },
  { name: "Camera", icon: <Camera size={32} /> },
  { name: "HeadPhones", icon: <Headset size={32} /> },
  { name: "Gaming", icon: <Gamepad2 size={32} /> },
];

const BrowseByCategory = () => {
  return (
    <div className="space-y-6 p-4">
      <MinHeader />
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">Browse By Category</p>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <MoveLeft size={20} />
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <MoveRight size={20} />
          </button>
        </div>
      </div>

      {/* Marquee Section: Passing children fixes the TS error */}
      <Category speed={40} pauseOnHover={true} className="border-b pb-10">
        {CATEGORIES.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col items-center justify-center border-2 rounded-md w-44 h-36 gap-4 hover:bg-red-500 hover:text-white transition-all cursor-pointer group"
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </Category>
    </div>
  );
};

export default BrowseByCategory;