"use client"
import Link from "next/link";
import BreadCumb from "../../common/BreadCumb/BreadCumb";

const Admin_My_Account = () => {
  // ইনপুট ফিল্ডের জন্য কমন ক্লাস
  const inputClass = "w-full bg-gray-100 p-3 rounded-lg outline-none border border-transparent focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all duration-300 placeholder:text-gray-400 text-gray-700";

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Breadcrumb Section */}
      <section className="mb-8">
        <BreadCumb />
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Navigation Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="shadow-sm rounded-xl p-6 bg-white border border-gray-100">
              {/* Manage Account */}
              <div className="mb-8">
                <h1 className="font-bold text-lg mb-4 text-gray-800">Manage My Account</h1>
                <nav className="space-y-3 ml-2 flex flex-col">
                  <Link href="#" className="text-red-500 font-semibold border-l-2 border-red-500 pl-3">
                    My Profile
                  </Link>
                  <Link href="#" className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200">
                    Edit Products
                  </Link>
                  <Link href="#" className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200">
                    My Revenue
                  </Link>
                </nav>
              </div>

              {/* My Products */}
              <div className="mb-8">
                <h1 className="font-bold text-lg mb-4 text-gray-800">My Products</h1>
                <nav className="space-y-3 ml-2 flex flex-col">
                  <Link href="#" className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200">
                    Returns Products
                  </Link>
                  <Link href="#" className="text-gray-500 text-sm hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200">
                    My Cancellations
                  </Link>
                </nav>
              </div>

              {/* Last Uploads */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Last Uploads</h2>
                <Link href="#" className="text-gray-500 text-sm ml-2 hover:text-red-500 transition pl-3 hover:translate-x-1 duration-200 block">
                  Last Upload Items
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Edit Profile Form */}
          <div className="lg:col-span-8 shadow-sm rounded-xl p-8 bg-white border border-gray-100">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Edit Your Profile</h2>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Profile Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name</label>
                  <input type="text" placeholder="First Name" className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Last Name</label>
                  <input type="text" placeholder="Last Name" className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input type="email" placeholder="Your Email" className={inputClass} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone</label>
                  <input type="text" placeholder="Your Phone" className={inputClass} />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Address</label>
                  <input type="text" placeholder="Your Address" className={inputClass} />
                </div>
              </div>

              {/* Password Section */}
              <div className="bg-gray-50 p-6 rounded-xl space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Password Change</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Current Password</label>
                    <input type="password" placeholder="Current Password" className={inputClass + " bg-white"} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                    <input type="password" placeholder="New Password" className={inputClass + " bg-white"} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" className={inputClass + " bg-white"} />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
                <button type="button" className="text-gray-600 font-semibold px-6 py-3 hover:text-gray-900 transition underline-offset-4 hover:underline order-2 sm:order-1">
                  Cancel
                </button>
                <button type="submit" className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-12 rounded-lg shadow-lg shadow-red-100 transition-all active:scale-95 order-1 sm:order-2">
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
