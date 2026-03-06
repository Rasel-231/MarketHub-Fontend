"use client";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetCategoryQuery, useGetattributeQuery } from "@/store/api/categoryApi/categoryApi";
import { useCreateProductMutation } from "@/store/api/productsApi/productsApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";
import { ICategory, IErrorResponse, IAttribute } from "@/types/types";
import {
  DollarSign,
  ImageIcon,
  Info,
  Layers,
  Package,
  PlusCircle,
  X,
  Plus
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const UploadProducts = () => {
  const [category, setCategory] = useState("");
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoryQuery();
  
  const { data: attrResponse, isFetching: isAttrLoading } = useGetattributeQuery(category, {
    skip: !category,
    refetchOnMountOrArgChange: true,
  });

  const [createProducts] = useCreateProductMutation();
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery();

  const categories = categoriesResponse?.data?.data || [];
  const dynamicAttributes: IAttribute[] = (category && attrResponse?.success && Array.isArray(attrResponse?.data)) 
    ? attrResponse.data 
    : [];

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [productActualPrice, setproductActualPrice] = useState("");
  const [discountedRate, setDiscountedRate] = useState("");
  const [shopName, setShopName] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [product_images, setProduct_Images] = useState<File | null>(null);

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
  const [tempInput, setTempInput] = useState<Record<string, string>>({});

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setCategory(selectedId);
    setSelectedAttributes({});
    setTempInput({});
  };

  const handleAttrAdd = (label: string) => {
    const value = tempInput[label]?.trim();
    if (!value) return;
    setSelectedAttributes((prev) => ({
      ...prev,
      [label]: [...(prev[label] || []), value],
    }));
    setTempInput((prev) => ({ ...prev, [label]: "" }));
  };

  const removeAttrValue = (label: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [label]: prev[label].filter((v) => v !== value),
    }));
  };

  const handleUploadProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualUserId = profileResponse?.data?.id;
    const actualSellerId = profileResponse?.data?.seller?.id;

    if (!actualUserId || !actualSellerId) return toast.error("Seller profile not detected.");
    if (!product_images) return toast.warning("Please upload a product image.");

    const formData = new FormData();
    const productData = {
      title,
      brand,
      shopName,
      description,
      productActualPrice: Number(productActualPrice) || 0,
      discountedRate: Number(discountedRate) || 0,
      stock: 1,
      categoryId: category,
      attributes: selectedAttributes,
      status,
      sellerId: actualSellerId,
      userId: actualUserId,
    };

    formData.append("data", JSON.stringify(productData));
    formData.append("products_image", product_images);

    try {
      const res = await createProducts(formData).unwrap();
      if (res?.success) {
        toast.success("Product Published Successfully!");
        setTitle(""); setBrand(""); setShopName(""); setDescription("");
        setproductActualPrice(""); setDiscountedRate("");
        setCategory(""); setSelectedAttributes({}); setProduct_Images(null);
      }
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Upload failed!");
    }
  };

  if (isProfileLoading) return <div className="text-center py-20 font-bold"><CustomSpinner /></div>;

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
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Product Name" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" required />
              <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand Name" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
              <input value={shopName} onChange={(e) => setShopName(e.target.value)} type="text" placeholder="Shop Name" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <DollarSign size={18} className="text-emerald-600" /> Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      
              <input value={productActualPrice} onChange={(e) => setproductActualPrice(e.target.value)} type="number" placeholder="Actual Price" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" required />
              <input value={discountedRate} onChange={(e) => setDiscountedRate(e.target.value)} type="number" placeholder="Discount %" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Layers size={18} className="text-emerald-600" /> Category & Attributes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select 
                value={category} 
                onChange={handleCategoryChange} 
                className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800" 
                required
              >
                <option value="">{isCategoriesLoading ? "Loading..." : "Select Category"}</option>
                {categories.map((cat: ICategory) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>

              <div>
                <input type="text-area" className="description"/>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {isAttrLoading ? (
                  <div className="col-span-2 flex justify-center py-10"><CustomSpinner/></div>
                ) : dynamicAttributes.length > 0 ? (
                  dynamicAttributes.map((attr) => (
                    <div key={attr.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                      <label className="text-[11px] font-black uppercase text-gray-400 tracking-wider mb-2 block">
                        {attr.label || attr.name} <span className="text-emerald-600">({attr.groupName})</span>
                      </label>
                      <div className="flex gap-2">
                        <input 
                          value={tempInput[attr.label || attr.name] || ""}
                          onChange={(e) => setTempInput({...tempInput, [attr.label || attr.name]: e.target.value})}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAttrAdd(attr.label || attr.name))}
                          placeholder={`Add ${attr.label}...`}
                          className="flex-1 px-3 py-2 text-sm rounded-lg border dark:bg-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button type="button" onClick={() => handleAttrAdd(attr.label || attr.name)} className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                          <Plus size={20} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(selectedAttributes[attr.label || attr.name] || []).map((val, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-200 dark:border-emerald-800">
                            {val} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => removeAttrValue(attr.label || attr.name, val)} />
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : category && (
                  <div className="col-span-2 text-center py-10 text-gray-400 border-2 border-dashed rounded-2xl">
                    No dynamic attributes found for this category.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Info size={18} className="text-emerald-600" /> Finalize Product
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all">
                <ImageIcon className={product_images ? "text-emerald-600" : "text-gray-400"} size={40} />
                <p className="text-sm mt-3 font-medium text-gray-500">{product_images ? product_images.name : "Click to Upload Product Image"}</p>
                <input type="file" className="hidden" onChange={(e) => setProduct_Images(e.target.files?.[0] || null)} />
              </label>

              <div className="space-y-4">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800">
                  <option value="AVAILABLE">Available Now</option>
                  <option value="DRAFT">Save as Draft</option>
                </select>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Detailed Product Description..." className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-800">
            <button type="submit" className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-wider">
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;