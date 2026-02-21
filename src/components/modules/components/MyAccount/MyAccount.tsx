"use client";

import { useGetMyProfileQuery } from "@/components/Redux/api/userApi/userApi";
import BreadCumb from "../../common/BreadCumb/BreadCumb";

const MyAccount = () => {
  const { data: response, isLoading } = useGetMyProfileQuery();
  const userData = response?.data;

  if (isLoading) {
    return (
      
        <p className="text-gray-500 font-medium">Loading profile...</p>
      
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <section className="mb-10">
        <BreadCumb />
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          
          <div className="lg:col-span-4 shadow-lg rounded-xl p-6 bg-white border border-gray-100 h-fit">
            <div className="mb-6">
              <h1 className="font-bold text-lg mb-3">Manage My Account</h1>
              <div className="space-y-2 ml-4">
                <p className="text-red-500 font-medium cursor-pointer">My Profile</p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">Address Book</p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">My Payment Options</p>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="font-bold text-lg mb-3">My Orders</h1>
              <div className="space-y-2 ml-4">
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">My Returns</p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">My Cancellations</p>
              </div>
            </div>

            <div className="border-t pt-5">
              <h2 className="text-lg font-bold mb-2">My Wishlist</h2>
              <p className="text-gray-500 text-sm ml-4 hover:text-red-500 cursor-pointer transition">View Wishlist Items</p>
            </div>
          </div>

   
          <div className="lg:col-span-8 shadow-lg rounded-xl p-8 bg-white border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    defaultValue={userData?.name}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

               
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    defaultValue={userData?.email}
                  
                    className="w-full bg-gray-200 p-3 rounded-md border border-gray-200 cursor-not-allowed mt-1 text-gray-500"
                  />
                </div>

                
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    defaultValue={userData?.contactNumber}
                    placeholder="Your Phone Number"
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

              
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    defaultValue={userData?.role}
    
                    className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 mt-1 capitalize font-semibold text-red-600"
                  />
                </div>
              </div>

            
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Password Change</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700">New Password</label>
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-10 rounded-md shadow-md transition-all active:scale-95"
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

export default MyAccount;