"use client"
import { Menu, X, Search } from "lucide-react"
import Img from "../../../public/Image//bag-outline.png"
import Image from "next/image";
interface NavbarProps {
  onToggle: () => void;
  isOpen: boolean;
}

const AdminNavber = ({ onToggle, isOpen }: NavbarProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* ১. বাম পাশ: শুধু লোগো থাকবে */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm"><Image src={Img} alt="images not loaded"/></div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">MarketHub</span>
            </a>
          </div>

          {/* ২. ডান পাশ: সার্চ এবং মেনু বাটন */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* সার্চ আইকন: মোবাইলে হাইড থাকবে (hidden md:flex) */}
            <button className="hidden md:flex p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* ডেক্সটপে সাবস্ক্রাইব বাটন (ঐচ্ছিক, চাইলে রাখতে পারেন) */}
            <a href="#" className="hidden lg:block px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-all">
              Subscribe
            </a>

            {/* ৩. মেইন টগল বাটন: এটি একদম শেষে (End) থাকবে */}
            <button
              onClick={onToggle}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-emerald-600" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

export default AdminNavber
