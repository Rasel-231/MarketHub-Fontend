
import { DollarSign, ImageIcon, Info, Layers, Package, PlusCircle } from "lucide-react";


const EditProducts = () => {
    return (
        <div className="max-w-5xl mx-auto my-10 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-emerald-600 p-6 text-white">
                    <div className="flex items-center gap-3">
                        <PlusCircle size={28} />
                        <h2 className="text-2xl font-bold">Edit Products</h2>
                    </div>
                    <p className="text-emerald-100 text-sm mt-1">Provide accurate details to increase your sales performance.</p>
                </div>

                <form className="p-8 space-y-8">
                    
                    {/* Section 1: Basic Details */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
                            <Package size={18} className="text-emerald-600" /> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Name</label>
                                <input type="text" placeholder="e.g. Nike Air Max" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Brand Name</label>
                                <input type="text" placeholder="e.g. Nike" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Shop Name</label>
                                <input type="text" placeholder="Your Shop" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Pricing & Inventory */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
                            <DollarSign size={18} className="text-emerald-600" /> Pricing & Inventory
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Selling Price ($)</label>
                                <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Price ($)</label>
                                <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Rate</label>
                                <input type="number" placeholder="20%" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Categories & Attributes */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
                            <Layers size={18} className="text-emerald-600" /> Attributes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                                    <option>Select Category</option>
                                    <option>Electronics</option>
                                    <option>Clothing</option>
                                    <option>Food</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available Color</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                                    <option>Red</option>
                                    <option>Blue</option>
                                    <option>Cyan</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sizes</label>
                                <div className="flex gap-3 h-[46px] items-center px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                        <label key={size} className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Media & Description */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
                            <Info size={18} className="text-emerald-600" /> Media & Description
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Images</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer group">
                                    <ImageIcon className="text-gray-400 group-hover:text-emerald-500 mb-2 transition-colors" size={32} />
                                    <p className="text-sm text-gray-500 font-medium">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                                <textarea rows={4} placeholder="Tell customers more about this item..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t dark:border-gray-800">
                        <button type="button" className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Discard</button>
                        <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95">
                            Submit Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProducts;



        


