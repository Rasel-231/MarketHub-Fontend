"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Truck, RotateCcw, Heart, Minus, Plus } from 'lucide-react';

// Images
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

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- Thumbnail Images --- */}
                <div className='lg:col-span-2 flex lg:flex-col flex-row gap-4 order-2 lg:order-1'>
                    {PRODUCT_DATA.images.map((img, idx) => (
                        <div key={idx} className='relative w-full h-24 sm:h-32 lg:h-40   overflow-hidden '>
                            <button 
                                onClick={() => setMainImg(img)}
                                className="w-full h-full relative"
                            >
                                <Image 
                                    src={img} 
                                    alt={`thumbnail-${idx}`} 
                                    fill 
                                    className='object-contain p-2 transition-transform duration-500 hover:scale-110'
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {/* --- Main Product Image --- */}
                <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-[600px]   overflow-hidden order-1 lg:order-2">
                    <Image 
                        src={mainImg} 
                        alt="Product Main View" 
                        fill 
                        priority 
                        className="object-contain p-10 transition-transform duration-700 hover:scale-105" 
                    />
                </div>

                {/* --- Product Content --- */}
                <div className="lg:col-span-5 order-3 flex flex-col">
                    <div className="space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-black uppercase tracking-tight">{PRODUCT_DATA.name}</h1>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex text-[#FFAD33]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < PRODUCT_DATA.rating ? "#FFAD33" : "none"} className={i < PRODUCT_DATA.rating ? "text-[#FFAD33]" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">({PRODUCT_DATA.reviews} Reviews)</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-green-500 font-medium">{PRODUCT_DATA.stockStatus}</span>
                        </div>

                        <p className="text-2xl font-semibold">${PRODUCT_DATA.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-700 leading-relaxed border-b border-black/10 pb-6">{PRODUCT_DATA.description}</p>

                        {/* Colors & Sizes */}
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4">
                                <span className="text-xl">Colours:</span>
                                <div className="flex gap-2">
                                    {PRODUCT_DATA.colors.map(color => (
                                        <button 
                                            key={color.id} 
                                            style={{ backgroundColor: color.hex }} 
                                            className="w-5 h-5 rounded-full ring-offset-2 hover:ring-2 ring-black transition-all" 
                                            title={color.name}
                                        />
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

                    {/* Quantity & Buy Actions */}
                    <div className="space-y-6 mt-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-black/30 rounded-md overflow-hidden h-11">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 hover:bg-[#DB4444] hover:text-white transition-colors h-full border-r border-black/30"><Minus size={18} /></button>
                                <span className="px-8 font-bold text-xl min-w-[60px] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 hover:bg-[#DB4444] hover:text-white transition-colors h-full border-l border-black/30"><Plus size={18} /></button>
                            </div>
                            <button className="flex-1 bg-[#DB4444] text-white h-11 rounded-md font-bold hover:bg-red-600 transition-all">Buy Now</button>
                            <button className="p-2 border border-black/30 rounded-md hover:bg-[#DB4444] hover:text-white transition-all h-11 w-12 flex items-center justify-center"><Heart size={24} /></button>
                        </div>

                        {/* Delivery Info */}
                        <div className="border border-black/30 rounded-md divide-y divide-black/30">
                            <div className="flex items-center gap-4 p-4">
                                <Truck size={32} />
                                <div>
                                    <h3 className="font-bold text-sm">Free Delivery</h3>
                                    <p className="text-[10px] underline cursor-pointer">Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4">
                                <RotateCcw size={32} />
                                <div>
                                    <h3 className="font-bold text-sm">Return Delivery</h3>
                                    <p className="text-[10px]">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
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