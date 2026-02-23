"use client";
import Link from "next/link";
import BreadCumb from "@/components/shared/BreadCumb";

import { toast } from "react-toastify";
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetMyProfileQuery, useUpdateUserMutation } from "@/store/api/userApi/userApi";

const Admin_My_Account = () => {
  const [file, setFile] = useState<File | null>(null);

  const { data: getProfile, isLoading } = useGetMyProfileQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      <CustomSpinner/>
      </div>
    );
  }
  const userId = getProfile?.data?.id;
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID missing");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (file) {
      formData.append("profile_images", file);
    }

    try {
      await updateUser({
        id: userId as string,
        data: formData,
      }).unwrap();

      toast.success("User Updated Successfully");
    } catch {
      toast.error("User Update Failed");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const initialShopName = getProfile?.data?.seller?.shopName || "";
  const initialAddress = getProfile?.data?.address || "";

  const inputClass =
    "w-full bg-gray-100 p-3 rounded-lg outline-none border border-transparent focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all duration-300 placeholder:text-gray-400 text-gray-700";

  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="mb-8">
        <BreadCumb />
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="shadow-sm rounded-xl p-6 bg-white border border-gray-100">
              <div className="mb-8">
                <h1 className="font-bold text-lg mb-4 text-gray-800">
                  Manage My Account
                </h1>
                <nav className="space-y-3 ml-2 flex flex-col">
                  <Link
                    href="#"
                    className="text-red-500 font-semibold border-l-2 border-red-500 pl-3"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="products/edit"
                    className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200"
                  >
                    Edit Products
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200"
                  >
                    My Revenue
                  </Link>
                </nav>
              </div>

              <div className="mb-8">
                <h1 className="font-bold text-lg mb-4 text-gray-800">
                  My Products
                </h1>
                <nav className="space-y-3 ml-2 flex flex-col">
                  <Link
                    href="#"
                    className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200"
                  >
                    Returns Products
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200"
                  >
                    My Cancellations
                  </Link>
                </nav>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  Last Uploads
                </h2>
                <Link
                  href="#"
                  className="text-gray-500 text-sm ml-2 hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200 block"
                >
                  Last Upload Items
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 shadow-sm rounded-xl p-8 bg-white border border-gray-100">
            <h2 className="text-2xl flex justify-between items-center font-bold mb-8 text-gray-800 border-b pb-4">
              <span>Edit Your Profile</span>
              <Image
                src={getProfile?.data?.seller?.profilePhoto as string}
                alt={getProfile?.data?.name || "Profile Picture"}
                width={52}
                height={52}
                className="rounded-full"
              />
            </h2>

            <form className="space-y-8" onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={getProfile?.data?.name}
                    type="text"
                    placeholder="Name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Shop Name
                  </label>
                  <input
                    name="shopName"
                    defaultValue={initialShopName}
                    type="text"
                    placeholder="Shop Name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    defaultValue={getProfile?.data?.email}
                    type="email"
                    placeholder="Your Email"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    name="contactNumber"
                    defaultValue={getProfile?.data?.contactNumber}
                    type="text"
                    placeholder="Your Phone"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    name="address"
                    defaultValue={initialAddress}
                    type="text"
                    placeholder="Your Address"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
                <button
                  type="button"
                  className="text-gray-600 font-semibold px-6 py-3 hover:text-gray-900 transition underline-offset-4 hover:underline order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-12 rounded-lg shadow-lg shadow-red-100 transition-all active:scale-95 order-1 sm:order-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin_My_Account;
