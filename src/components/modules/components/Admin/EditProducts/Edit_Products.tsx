"use client";
import { useGetCategoryQuery } from "@/components/Redux/api/categoryApi/categoryApi";
import { useGetSingleProductsQuery, useUpdateProductMutation } from "@/components/Redux/api/productsApi/productsApi";
import { useGetMyProfileQuery } from "@/components/Redux/api/userApi/userApi";
import { ICategory, IUserProducts } from "@/types/types";
import {
  DollarSign,
  ImageIcon,
  Info,
  Layers,
  Package,
  PlusCircle,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const EditProducts = () => {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoryQuery();
  const [updateProducts] = useUpdateProductMutation();
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: productResponse, isLoading: isProductLoading } = useGetSingleProductsQuery("");
  
  const productsData = useMemo(() => (productResponse?.data?.data as IUserProducts[]) || [], [productResponse]);
  const product = productsData.length > 0 ? productsData[0] : null;
  const id = product?.id;

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

  const [isDataInitialized, setIsDataInitialized] = useState(false);

  useEffect(() => {
    if (product && !isDataInitialized) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setTitle(product.title || "");
      setBrand(product.brand || "");
      setShopName(product.shopName || "");
      setDescription(product.description || "");
      setSellingPrice(product.sellingPrice?.toString() || "");
      setproductActualPrice(product.productActualPrice?.toString() || "");
      setDiscountedRate(product.discountedRate?.toString() || "");
      setCategory(product.categoryId || "");
      setStatus(product.status || "AVAILABLE");
      setSelectedSizes(product.size || []);
      setSelectedColours(product.colour || []);
      
      setIsDataInitialized(true); 
    }
  }, [product, isDataInitialized]);

  const handleUpdateProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualUserId = profileResponse?.data?.id;
    const actualSellerId = profileResponse?.data?.seller?.id;

    if (!id) return toast.error("Product ID not found!");
    if (!actualUserId || !actualSellerId) return toast.error("Seller profile not detected.");

    const formData = new FormData();
    const productData = {
      title, brand, shopName, description,
      sellingPrice: Number(sellingPrice) || 0,
      productActualPrice: Number(productActualPrice) || 0, 
      discountedRate: Number(discountedRate) || 0,
      stock: 10, categoryId: category,
      size: selectedSizes, colour: selectedColours,
      status: status, sellerId: actualSellerId, userId: actualUserId,
    };

    formData.append("data", JSON.stringify(productData));
    if (product_images) formData.append("products_image", product_images);

    try {
      const res = await updateProducts({ id, data: formData }).unwrap();
      if (res?.success) toast.success("Product Updated Successfully!");
    } catch {
      toast.error("Product update failed!");
    }
  };

  if (isProfileLoading || isProductLoading)
    return <div className="text-center py-20 font-bold">Loading Product Info...</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-emerald-600 p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3">
            <PlusCircle size={28} />
            <h2 className="text-2xl font-bold">Edit Product</h2>
          </div>
        </div>

        <form onSubmit={handleUpdateProducts} className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Package size={18} className="text-emerald-600" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Name</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter product name" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Brand Name</label>
                <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Enter brand" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Shop Name</label>
                <input value={shopName} onChange={(e) => setShopName(e.target.value)} type="text" placeholder="Enter shop name" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Pricing - Swapped Selling and Actual Price */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <DollarSign size={18} className="text-emerald-600" /> Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Selling Price</label>
                <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Actual Product Price</label>
                <input value={productActualPrice} onChange={(e) => setproductActualPrice(e.target.value)} type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Rate (%)</label>
                <input value={discountedRate} onChange={(e) => setDiscountedRate(e.target.value)} type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Layers size={18} className="text-emerald-600" /> Attributes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" required disabled={isCategoriesLoading}>
                  <option value="">{isCategoriesLoading ? "Loading..." : "Select Category"}</option>
                  {categories.map((cat: ICategory) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Primary Color</label>
                <select value={selectedColours[0] || ""} onChange={(e) => setSelectedColours([e.target.value])} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800">
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available Sizes</label>
                <div className="flex gap-2 items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed">
                  {["sm", "m", "xl", "xxl"].map((size) => (
                    <label key={size} className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={(e) => {
                        if (e.target.checked) setSelectedSizes([...selectedSizes, size]);
                        else setSelectedSizes(selectedSizes.filter((s) => s !== size));
                      }} className="w-4 h-4 rounded text-emerald-600" />
                      <span className="text-xs font-bold uppercase">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Finalize */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Info size={18} className="text-emerald-600" /> Finalize
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Image</label>
                <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors">
                  <ImageIcon className={product_images ? "text-emerald-600" : "text-gray-400"} size={32} />
                  <p className="text-xs mt-2 text-center text-gray-500">{product_images ? product_images.name : "Click to upload new image"}</p>
                  <input type="file" className="hidden" onChange={(e) => setProduct_Images(e.target.files?.[0] || null)} />
                </label>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800">
                    <option value="AVAILABLE">Available</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Write product description here..." className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <button type="submit" className="px-12 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;