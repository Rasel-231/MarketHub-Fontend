"use client"

const RegisterForm = () => {
    return (
        <div className="flex justify-center items-center py-10 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl w-full shadow-lg rounded-xl p-6 md:p-10 bg-white border border-gray-100">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Register Seller</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+880 1XXX XXXXXX"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2 flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Address</label>
                            <input
                                type="text"
                                placeholder="Street, City, Country"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                            />
                        </div>

                        {/* Profile Image */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Profile Image</label>
                            <input
                                type="file"
                                className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-200 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Join as Seller Checkbox */}
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                        <input 
                            type="checkbox" 
                            id="seller-join"
                            className="w-5 h-5 accent-red-500 cursor-pointer"
                        />
                        <label htmlFor="seller-join" className="text-sm font-medium text-gray-800 cursor-pointer select-none">
                            I want to join as a <span className="text-red-600 font-bold">Seller</span> and agree to the terms.
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 hover:shadow-red-200 transition active:scale-95"
                        >
                            Join Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;