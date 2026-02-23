"use client";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetCategoryQuery } from "@/store/api/categoryApi/categoryApi";
import { useCreateProductMutation } from "@/store/api/productsApi/productsApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";

import { ICategory } from "@/types/types";
import {
  DollarSign,
  ImageIcon,
  Info,
  Layers,
  Package,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadProducts = () => {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoryQuery();
  const [createProducts] = useCreateProductMutation();
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery();

  const categories = categoriesResponse?.data?.data || [];

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productActualPrice, setproductActualPrice] = useState("");
  const [discountedRate, setDiscountedRate] = useState("");
  const [category, setCategory] = useState("");
  const [shopName, setShopName] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [product_images, setProduct_Images] = useState<File | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);

  const handleUploadProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const actualUserId = profileResponse?.data?.id;
    const actualSellerId = profileResponse?.data?.seller?.id;

    if (!actualUserId || !actualSellerId) {
      return toast.error("Seller profile not detected. Please wait for profile to load.");
    }
    if (!product_images) {
      return toast.warning("Please upload a product image.");
    }

    const formData = new FormData();
    const productData = {
      title,
      brand,
      shopName,
      description,
      sellingPrice: Number(sellingPrice) || 0,
      productActualPrice: Number(productActualPrice) || 0, 
      discountedRate: Number(discountedRate) || 0,
      stock: 10, 
      categoryId: category,
      size: selectedSizes,
      colour: selectedColours,
      status: status,
      sellerId: actualSellerId, 
      userId: actualUserId,
    };

    formData.append("data", JSON.stringify(productData));
    formData.append("products_image", product_images);

    try {
      const res = await createProducts(formData).unwrap();

      if (res?.success) {
        toast.success("Product Published Successfully!");
        setTitle("");
        setBrand("");
        setShopName("");
        setDescription("");
        setSellingPrice("");
        setproductActualPrice("");
        setDiscountedRate("");
        setCategory("");
        setSelectedSizes([]);
        setSelectedColours([]);
        setProduct_Images(null);
      }
    } catch  {
      toast.error("Product Upload failed!");
    }
  };

  if (isProfileLoading)
    return <div className="text-center py-20 font-bold"><CustomSpinner/></div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <PlusCircle size={28} />
            <h2 className="text-2xl font-bold">Upload New Product</h2>
          </div>
        </div>

        <form onSubmit={handleUploadProduct} className="p-8 space-y-8">
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Package size={18} className="text-emerald-600" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
                required
              />
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                placeholder="Brand Name"
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
              />
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                type="text"
                placeholder="Shop Name"
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <DollarSign size={18} className="text-emerald-600" /> Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
              <input
                value={productActualPrice}
                onChange={(e) => setproductActualPrice(e.target.value)}
                type="number"
                placeholder="Discount Price"
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
              />
              <input
                value={discountedRate}
                onChange={(e) => setDiscountedRate(e.target.value)}
                type="number"
                placeholder="Discount %"
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Layers size={18} className="text-emerald-600" /> Attributes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                required
              >
                <option value="">
                  {isCategoriesLoading ? "Loading..." : "Select Category"}
                </option>
                {categories.map((cat: ICategory) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedColours[0] || ""}
                onChange={(e) => setSelectedColours([e.target.value])}
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="cyan">Cyan</option>
              </select>

              <div className="flex gap-2 items-center px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed">
                {["sm", "m", "xl", "xxl"].map((size) => (
                  <label key={size} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedSizes([...selectedSizes, size]);
                        else setSelectedSizes(selectedSizes.filter((s) => s !== size));
                      }}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <span className="text-xs font-bold uppercase">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Info size={18} className="text-emerald-600" /> Finalize
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors">
                <ImageIcon
                  className={product_images ? "text-emerald-600" : "text-gray-400"}
                  size={32}
                />
                <p className="text-sm mt-2 text-center">
                  {product_images ? product_images.name : "Upload Product Image"}
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setProduct_Images(e.target.files?.[0] || null)}
                />
              </label>

              <div className="space-y-4">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800"
                >
                  <option value="AVAILABLE">Available Now</option>
                  <option value="DRAFT">Save as Draft</option>
                </select>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Product Description..."
                  className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-800">
            <button
              type="submit"
              className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;