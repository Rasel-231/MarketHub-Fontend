"use client";

import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetCategoryQuery } from "@/store/api/categoryApi/categoryApi";
import { useGetSingleProductsQuery, useUpdateProductMutation } from "@/store/api/productsApi/productsApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";
import { ICategory, IErrorResponse, IUserProducts } from "@/types/types";
import {
  DollarSign,
  ImageIcon,
  Info,
  Layers,
  Package,
  PlusCircle,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

interface ISpecificationField {
  label: string;
  value: string;
}

interface ISpecificationGroup {
  groupName: string;
  fields: ISpecificationField[];
}


const ProductEditForm= () => {
  const params = useParams();
  const productId = params?.id as string;
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoryQuery();
  const [updateProducts] = useUpdateProductMutation();
  const { data: profileResponse, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const { data: productResponse, isLoading: isProductLoading } = useGetSingleProductsQuery( productId);

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
  const [specifications, setSpecifications] = useState<ISpecificationGroup[]>([]);

  const [isDataInitialized, setIsDataInitialized] = useState(false);

  useEffect(() => {
    if (product && !isDataInitialized) {
      const initData = () => {
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
        setSpecifications(Array.isArray(product.specification) ? (product.specification as ISpecificationGroup[]) : []);
        setIsDataInitialized(true);
      };

      initData();
    }
  }, [product, isDataInitialized]);

  const addGroup = () => {
    setSpecifications([...specifications, { groupName: "", fields: [{ label: "", value: "" }] }]);
  };

  const addField = (gIdx: number) => {
    const newSpecs = [...specifications];
    newSpecs[gIdx].fields.push({ label: "", value: "" });
    setSpecifications(newSpecs);
  };

  const removeGroup = (gIdx: number) => {
    setSpecifications(specifications.filter((_, i) => i !== gIdx));
  };

  const removeField = (gIdx: number, fIdx: number) => {
    const newSpecs = [...specifications];
    newSpecs[gIdx].fields = newSpecs[gIdx].fields.filter((_, i) => i !== fIdx);
    setSpecifications(newSpecs);
  };

  const handleUpdateProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualUserId = profileResponse?.data?.id;
    const actualSellerId = profileResponse?.data?.seller?.id;

    if (!id) return toast.error("Product ID not found!");
    if (!actualUserId || !actualSellerId) return toast.error("Seller profile not detected.");

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
      specification: specifications,
    };

    formData.append("data", JSON.stringify(productData));
    if (product_images) formData.append("products_image", product_images);

    try {
      const res = await updateProducts({ id, data: formData }).unwrap();
      if (res?.success) toast.success("Product Updated Successfully!");
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Product update failed!");
    }
  };

  if (isProfileLoading || isProductLoading)
    return <div className="flex justify-center items-center py-20"><CustomSpinner /></div>;

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
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Package size={18} className="text-emerald-600" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Name</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Brand Name</label>
                <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Shop Name</label>
                <input value={shopName} onChange={(e) => setShopName(e.target.value)} type="text" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <DollarSign size={18} className="text-emerald-600" /> Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Selling Price</label>
                <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} type="number" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Actual Price</label>
                <input value={productActualPrice} onChange={(e) => setproductActualPrice(e.target.value)} type="number" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Discount Rate (%)</label>
                <input value={discountedRate} onChange={(e) => setDiscountedRate(e.target.value)} type="number" className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Layers size={18} className="text-emerald-600" /> Attributes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500" required disabled={isCategoriesLoading}>
                  <option value="">Select Category</option>
                  {categories.map((cat: ICategory) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Color</label>
                <select value={selectedColours[0] || ""} onChange={(e) => setSelectedColours([e.target.value])} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sizes</label>
                <div className="flex gap-2 items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300">
                  {["sm", "m", "xl", "xxl"].map((size) => (
                    <label key={size} className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={(e) => {
                        if (e.target.checked) setSelectedSizes([...selectedSizes, size]);
                        else setSelectedSizes(selectedSizes.filter((s) => s !== size));
                      }} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-xs font-bold uppercase">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="flex items-center justify-between font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <div className="flex items-center gap-2">
                <Settings2 size={18} className="text-emerald-600" /> Technical Specifications
              </div>
              <button type="button" onClick={addGroup} className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full hover:bg-emerald-200 transition-colors font-bold">
                + Add New Group
              </button>
            </h3>
            <div className="space-y-4">
              {specifications.map((group, gIdx) => (
                <div key={gIdx} className="p-5 border rounded-2xl bg-gray-50 dark:bg-gray-800/30 relative border-gray-200 dark:border-gray-700">
                  <button type="button" onClick={() => removeGroup(gIdx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <input
                    value={group.groupName}
                    onChange={(e) => {
                      const newSpecs = [...specifications];
                      newSpecs[gIdx].groupName = e.target.value;
                      setSpecifications(newSpecs);
                    }}
                    placeholder="Group Name (e.g. Processor)"
                    className="mb-6 w-full md:w-1/2 px-1 py-1 font-black text-lg border-b-2 border-emerald-200 bg-transparent outline-none focus:border-emerald-600 transition-all"
                  />
                  <div className="space-y-4">
                    {group.fields.map((field, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-4 animate-in fade-in duration-300">
                        <input
                          placeholder="Label (e.g. Brand)"
                          value={field.label}
                          onChange={(e) => {
                            const newSpecs = [...specifications];
                            newSpecs[gIdx].fields[fIdx].label = e.target.value;
                            setSpecifications(newSpecs);
                          }}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          placeholder="Value (e.g. AMD)"
                          value={field.value}
                          onChange={(e) => {
                            const newSpecs = [...specifications];
                            newSpecs[gIdx].fields[fIdx].value = e.target.value;
                            setSpecifications(newSpecs);
                          }}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button type="button" onClick={() => removeField(gIdx, fIdx)} className="text-gray-300 hover:text-red-400 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addField(gIdx)} className="text-xs text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-2 py-1 rounded-lg transition-all mt-2">
                      + Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200 border-b pb-2">
              <Info size={18} className="text-emerald-600" /> Final Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Product Image</label>
                <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all border-emerald-100">
                  <ImageIcon className={product_images ? "text-emerald-600" : "text-gray-300"} size={40} />
                  <p className="text-sm mt-3 text-center text-gray-500 font-medium">{product_images ? product_images.name : "Choose a high-quality product image"}</p>
                  <input type="file" className="hidden" onChange={(e) => setProduct_Images(e.target.files?.[0] || null)} />
                </label>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Listing Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="AVAILABLE">Active / Available</option>
                    <option value="DRAFT">Draft / Hidden</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Detailed product overview..." className="w-full px-4 py-3 rounded-xl border dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-100 dark:border-gray-800">
            <button type="submit" className="w-full md:w-auto px-16 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Update Product Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm