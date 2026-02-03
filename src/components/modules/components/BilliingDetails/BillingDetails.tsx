import BreadCumb from '../../common/BreadCumb/BreadCumb';

const BillingDetails = () => {
    return (
        <div className='bg-white max-w-7xl mx-auto px-4 py-10 text-black'>
            <section className="mb-8">
                <BreadCumb />
            </section>

            <section>
                <h1 className="text-3xl font-bold mb-10">Billing Details</h1>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                    {/* বাম পাশ: বিলিং ফর্ম */}
                    <div>
                        <form className='space-y-6'>
                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>First Name<span className="text-red-500">*</span></label>
                                <input type="text" className='p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full' required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Company Name</label>
                                <input type="text" className='p-3 bg-gray-100 rounded-sm outline-none w-full' />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Street Address<span className="text-red-500">*</span></label>
                                <input type="text" className='p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full' required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Apartment, floor, etc. (optional)</label>
                                <input type="text" className='p-3 bg-gray-100 rounded-sm outline-none w-full' />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Town/City<span className="text-red-500">*</span></label>
                                <input type="text" className='p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full' required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Phone Number<span className="text-red-500">*</span></label>
                                <input type="tel" className='p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full' required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className='text-gray-500'>Email Address<span className="text-red-500">*</span></label>
                                <input type="email" className='p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full' required />
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type="checkbox" id="save-info" className='w-5 h-5 accent-red-500' />
                                <label htmlFor="save-info" className='text-sm cursor-pointer'>Save this information for faster check-out next time</label>
                            </div>
                        </form>
                    </div>

                    {/* ডান পাশ: অর্ডার সামারি */}
                    <div className="lg:mt-8">
                        <div className="space-y-4 mb-8 text-lg">
                            {/* প্রোডাক্ট লিস্ট (Example) */}
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-4'>
                                    <div className="w-12 h-12 bg-gray-200 rounded"></div> {/* Image Placeholder */}
                                    <p>LCD Monitor</p>
                                </div>
                                <p>$650</p>
                            </div>

                            <div className='flex justify-between py-2 border-b'>
                                <p>Subtotal:</p>
                                <p>$650</p>
                            </div>
                            <div className='flex justify-between py-2 border-b'>
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>
                            <div className='flex justify-between py-2 font-bold'>
                                <p>Total:</p>
                                <p>$650</p>
                            </div>
                        </div>

                        {/* পেমেন্ট মেথড */}
                        <div className="space-y-4 mb-8">
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="payment" id="bank" className="accent-black w-5 h-5" />
                                    <label htmlFor="bank" className="cursor-pointer">Bank</label>
                                </div>
                                <div className="flex gap-2">
                                    {/* এখানে ব্যাংকের লোগোগুলো বসবে */}
                                    <span className="text-xs text-gray-400">Bkash/Visa/MasterCard</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <input type="radio" name="payment" id="cod" className="accent-black w-5 h-5" />
                                <label htmlFor="cod" className="cursor-pointer">Cash on delivery</label>
                            </div>
                        </div>

                        {/* কুপন সেকশন */}
                        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                            <input 
                                type="text" 
                                placeholder='Coupon Code' 
                                className='flex-1 border border-black p-3 rounded-sm' 
                            />
                            <button className='bg-red-500 hover:bg-red-600 text-white font-medium px-10 py-3 rounded-sm transition-colors'>
                                Apply Coupon
                            </button>
                        </div>

                        <button className='w-full sm:w-max bg-red-500 hover:bg-red-600 text-white font-medium px-12 py-4 rounded-sm transition-all active:scale-95'>
                            Place Order
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BillingDetails;