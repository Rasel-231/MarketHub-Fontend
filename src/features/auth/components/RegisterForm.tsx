"use client";

import React, { useState } from "react";
 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "@/store/api/userApi/userApi";


const RegisterForm = () => {
    const [createUser] = useCreateUserMutation();
    const router = useRouter();

    const [formDataState, setFormDataState] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        role: "BUYER", 
        shopName: "",
        shopSlug: "",
    });
    
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormDataState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

  
        formData.append("name", formDataState.name);
        formData.append("email", formDataState.email);
        formData.append("password", formDataState.password);
        formData.append("contactNumber", formDataState.contactNumber);
        formData.append("role", formDataState.role);


        if (formDataState.role === "SELLER") {
            if (formDataState.shopName) formData.append("shopName", formDataState.shopName);
            if (formDataState.shopSlug) formData.append("shopSlug", formDataState.shopSlug);
        }

          if (file) {
            formData.append("profile_images", file);
        }

        try {
            const res = await createUser(formData).unwrap();
            if (res) {
                toast.success("Registration successful!");
                router.push("/");
            }
        } catch  {
            toast.error("Registration failed!");
        }
    };

    return (
        <div className="flex justify-center items-center py-10 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl w-full shadow-lg rounded-xl p-6 md:p-10 bg-white border border-gray-100">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input name="name" required onChange={handleChange} type="text" placeholder="Your Name" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                        </div>

              
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input name="email" required onChange={handleChange} type="email" placeholder="email@example.com" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                        </div>

         
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Contact Number</label>
                            <input name="contactNumber" required onChange={handleChange} type="text" placeholder="01XXXXXXXXX" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                        </div>

                
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <input name="password" required onChange={handleChange} type="password" placeholder="••••••••" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                        </div>

               
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Join As</label>
                            <select name="role" value={formDataState.role} onChange={handleChange} className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition">
                                <option value="BUYER">Buyer / Customer</option>
                                <option value="SELLER">Seller / Shop Owner</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                 
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Profile Image</label>
                            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 cursor-pointer" />
                        </div>

                    
                        {formDataState.role === "SELLER" && (
                            <>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Shop Name</label>
                                    <input name="shopName" required onChange={handleChange} type="text" placeholder="Gadget Shop" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Shop Slug</label>
                                    <input name="shopSlug" required onChange={handleChange} type="text" placeholder="gadget-shop" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 transition" />
                                </div>
                            </>
                        )}
                    </div>

                    <button type="submit" className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition shadow-lg active:scale-95">
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;