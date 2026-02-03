import React from "react";
import BreadCumb from "../../common/BreadCumb/BreadCumb";

const MyAccount = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <section className="mb-10">
        <BreadCumb />
      </section>

      {/* Main Layout */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 shadow-lg rounded-xl p-6 bg-white border border-gray-100">
            {/* Manage Account */}
            <div className="mb-6">
              <h1 className="font-bold text-lg mb-3">Manage My Account</h1>

              <div className="space-y-2 ml-4">
                <p className="text-red-500 font-medium cursor-pointer">
                  My Profile
                </p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">
                  Address Book
                </p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">
                  My Payment Options
                </p>
              </div>
            </div>

            {/* Orders */}
            <div className="mb-6">
              <h1 className="font-bold text-lg mb-3">My Orders</h1>

              <div className="space-y-2 ml-4">
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">
                  My Returns
                </p>
                <p className="text-gray-500 text-sm hover:text-red-500 cursor-pointer transition">
                  My Cancellations
                </p>
              </div>
            </div>

            {/* Wishlist */}
            <div className="border-t pt-5">
              <h2 className="text-lg font-bold mb-2">My Wishlist</h2>
              <p className="text-gray-500 text-sm ml-4 hover:text-red-500 cursor-pointer transition">
                View Wishlist Items
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-8 shadow-lg rounded-xl p-8 bg-white border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>

            <form className="space-y-6">
              {/* Profile Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Your Phone"
                    className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Your Address"
                    className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Password Change</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Current Password */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Your Current Password"
                      className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Your New Password"
                      className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full bg-gray-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-red-500 transition mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-3">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-8 rounded-md transition-all active:scale-95"
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
