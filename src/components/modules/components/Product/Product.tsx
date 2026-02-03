"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Truck, RotateCcw, Heart, Minus, Plus } from 'lucide-react';

// আপনার আগের ইমপোর্ট করা পাথসমূহ
import airphone from "../../../../../public/Image/airphone.jpg"
import headphone from "../../../../../public/Image/headphone.jpeg"
import soundbox from "../../../../../public/Image/soundbox.jpg"
import airpot from "../../../../../public/Image/airpot.jpg"


const ProductDetails = () => {
    const PRODUCT_DATA = {
        name: "Havic HV G-92 Gamepad",
        price: 192.00,
        description: "PlayStation 5 Controller Skin High-quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive.",
        rating: 4,
        reviews: 150,
        stockStatus: "In Stock",
        images: [airphone, headphone, soundbox, airpot],
        colors: [
            { id: 1, name: "Blue", hex: "#A0BCE0" },
            { id: 2, name: "Red", hex: "#E07575" }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    };

    const [mainImg, setMainImg] = useState(PRODUCT_DATA.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');


    const DESKTOP_VIEW_HEIGHT = "lg:h-[600px]";

    return (
        <div className="container mx-auto p-4 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 ">
                {/* <div className={`border border-red-500 space-x-4 order-2 lg:order-1 md:flex-col lg:col-span-2  overflow-x-auto lg:overflow-visible flex items-center justify-center`}>
                    
                    {PRODUCT_DATA.images.map((img, index) => (
                        <button 
                            key={index} 
                            onClick={() => setMainImg(img)}
                            className={`h-24 w-24 border border-amber-400  ${mainImg === img ? "transition-transform duration-700 hover:scale-110 ":"border-amber-300"}`}
                            
                            
                            
                        >
                            <Image 
                                src={img} 
                                alt={`thumb-${index}`}  
                                className="object-contain"
                            />
                        </button>
                    ))}
                </div> */}
                <div className=' col-span-2 flex lg:flex-col flex-row items-center justify-center gap-4 lg:order-1 order-2'>
                       {
                        PRODUCT_DATA.images.map((img,idx)=>(
                             <div key={idx} className=' w-full flex items-center justify-center'>
                                <button onClick={() => setMainImg(img)}>
                                    <Image src={img}alt='404' className='object-cover transition-transform duration-700 hover:scale-110 rounded-md'/>
                                </button>
                             </div>
                        ))
                       }
          
                </div>

                <div className={`lg:col-span-5 order-1 lg:order-2 relative  rounded-xl overflow-hidden h-[400px] ${DESKTOP_VIEW_HEIGHT} flex justify-centwe items-center`}>
                    <Image 
                        src={mainImg} 
                        alt="Product Main View" 
                        fill 
                        priority 
                        className="object-contain p-10 lg:p-16 transition-transform duration-700 hover:scale-110" 
                    />
                </div>















                {/* --- প্রোডাক্ট কন্টেন্ট --- */}
                <div className={`lg:col-span-5 order-3 flex flex-col justify-between ${DESKTOP_VIEW_HEIGHT}`}>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-black uppercase tracking-tight">{PRODUCT_DATA.name}</h1>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex text-[#FFAD33]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < PRODUCT_DATA.rating ? "currentColor" : "none"} className={i < PRODUCT_DATA.rating ? "" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({PRODUCT_DATA.reviews} Reviews)</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-green-500 font-medium">In Stock</span>
                        </div>

                        <p className="text-3xl font-semibold">${PRODUCT_DATA.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-700 leading-relaxed border-b border-black/10 pb-6">{PRODUCT_DATA.description}</p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-xl">Colours:</span>
                                <div className="flex gap-2">
                                    {PRODUCT_DATA.colors.map(color => (
                                        <button key={color.id} style={{ backgroundColor: color.hex }} className="w-5 h-5 rounded-full ring-offset-2 hover:ring-2 ring-black transition-all" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xl">Size:</span>
                                <div className="flex gap-3">
                                    {PRODUCT_DATA.sizes.map(size => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-10 h-10 border rounded-md font-bold transition-all ${selectedSize === size ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'hover:border-[#DB4444]'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mt-8">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-black/30 rounded-md overflow-hidden h-12">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 border-r  transition-colors"><Minus size={18} /></button>
                                <span className="px-8 font-bold text-xl min-w-[50px] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 border-r  transition-colors"><Plus size={18} /></button>
                            </div>
                            <button className="flex-1 bg-[#DB4444] text-white h-12 rounded-md font-bold text-lg hover:bg-red-600 transition-all">Buy Now</button>
                            <button className="p-2 border border-black/30 rounded-md hover:bg-gray-50 h-12 w-12 flex items-center justify-center"><Heart size={24} /></button>
                        </div>

                        <div className="border border-black/30 rounded-md divide-y divide-black/30">
                            <div className="flex items-center gap-4 p-4">
                                <Truck size={36} strokeWidth={1.5} />
                                <div>
                                    <h3 className="font-bold text-sm">Free Delivery</h3>
                                    <p className="text-[10px] underline cursor-pointer">Enter your postal code</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4">
                                <RotateCcw size={36} strokeWidth={1.5} />
                                <div>
                                    <h3 className="font-bold text-sm">Return Delivery</h3>
                                    <p className="text-[10px]">Free 30 Days Delivery Returns.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;