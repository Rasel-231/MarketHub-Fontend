/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Upload, ImagePlus, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import BreadCumb from '@/components/shared/BreadCumb';
import { toast } from 'react-toastify';
import { useDeleteBannerMutation, useGetBannerImagesQuery, useUploadBannerImagesMutation } from '@/store/api/bannerApi/bannerApi';

const BannerChanges = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const { data: bannerData, isLoading: isFetching } = useGetBannerImagesQuery();
    const [uploadBanners, { isLoading: isUploading }] = useUploadBannerImagesMutation();
    const [deleteBanner] = useDeleteBannerMutation();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles((prev) => [...prev, ...filesArray]);

            const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => {
        
            formData.append("products_images", file);
        });

        try {
            await uploadBanners(formData).unwrap();
            toast.success("Banners deployed successfully");
            setSelectedFiles([]);
            setPreviews([]);
        } catch  {
            toast.error("Failed to upload banners");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBanner(id).unwrap();
            toast.success("Banner removed");
        } catch  {
            toast.error("Failed to delete banner");
        }
    };

    const removeLocalPreview = (index: number) => {
        const urlToRemove = previews[index];
        URL.revokeObjectURL(urlToRemove);
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen text-slate-300 p-4 sm:p-6 lg:p-10 selection:bg-blue-500/30">
            <div className="max-w-6xl mx-auto">
                <section className="mb-8 opacity-60">
                    <BreadCumb />
                </section>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[2px] w-12 bg-blue-600 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">MarketHub Studio</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 tracking-tighter leading-none">
                        Banner <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Settings</span>
                    </h1>
                </header>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                    <input 
                        type='file' 
                        multiple 
                        hidden 
                        accept="image/*" 
                        id="banner-input" 
                        onChange={handleFileChange}
                    />
                    <button 
                        className="group flex items-center gap-2 bg-blue-600 border border-blue-500 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-2xl"
                        onClick={() => document.getElementById('banner-input')?.click()}
                    >
                        <ImagePlus size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-sm">Add New Banner</span>
                    </button>
                    
                    {previews.length > 0 && (
                        <button 
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="flex items-center gap-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 px-6 py-3 rounded-xl hover:bg-blue-600/20 transition-all disabled:opacity-50"
                        >
                            {isUploading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                            <span className="text-sm font-bold">{isUploading ? "Uploading..." : "Save Changes"}</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {previews.map((src, index) => (
                        <div key={`local-${index}`} className="relative group overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-sm">
                            <div className="aspect-[21/9] relative w-full">
                                <Image src={src} alt="Preview" fill className="object-cover opacity-90" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => removeLocalPreview(index)}
                                        className="p-2 bg-red-500/20 hover:bg-red-500 border border-red-500/50 text-white rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-md font-bold uppercase">Pending Upload</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {Array.isArray(bannerData?.data) ? bannerData.data.map((bannerDoc: any) => (
                        bannerDoc.images.map((imgUrl: string, imgIndex: number) => (
                            <div key={`${bannerDoc.id}-${imgIndex}`} className="relative group overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
                                <div className="aspect-[21/9] relative w-full">
                                    <Image 
                                        src={imgUrl} 
                                        alt="Live Banner" 
                                        fill 
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button 
                                            onClick={() => handleDelete(bannerDoc.id)}
                                            className="p-2 bg-red-500/20 hover:bg-red-500 border border-red-500/50 text-white rounded-lg transition-all shadow-xl"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )) : null}

                    {!isFetching && previews.length === 0 && (!bannerData?.data || bannerData.data.length === 0) && (
                        <div className="aspect-[21/9] w-full rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-600">
                            <Upload size={40} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium uppercase tracking-widest">No banners live on storefront</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BannerChanges;