"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Filter, X } from "lucide-react";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import { useAddWishlistMutation } from "@/store/api/wishlistApi/wishlistApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";
import { IUserProducts, IErrorResponse } from "@/types/types";
import { useUpdateFilters } from "../../hooks/useUpdateFilters";
import ShopFilters from "./Components/ShopFilters";
import ShopToolbar from "./Components/ShopToolbar";
import SortControls from "./Components/SortControls";
import CustomProductCard from "@/components/shared/ProductCard";
import ShopPagination from "./Components/ShopPagination";
import { SHOP_CONSTANT } from "./Constant/Shop.Constant";
import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";

const ShopModule = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { updateFilters, searchParams } = useUpdateFilters();
  const { handleAdd } = useAddToCart();
  const [addWishlist] = useAddWishlistMutation();
  const { data: userData } = useGetMyProfileQuery(undefined);

  const currentFilters = Object.fromEntries(searchParams.entries());
  const {
    data: productResponse,
    isLoading,
    isFetching,
    
  } = useGetProductsQuery({
    ...currentFilters,
  limit: SHOP_CONSTANT.ITEM_PERPAGE,
  page: Number(currentFilters.page) || SHOP_CONSTANT.DEFAULT_PAGE,
  });

  const products = productResponse?.data?.data || [];
  const meta = productResponse?.data?.meta;
  const userId = userData?.data?.id;

  const totalItems = meta?.total || 0;
  const limit = SHOP_CONSTANT.ITEM_PERPAGE
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const handleWishlist = async (productId: string) => {
    if (!userId) {
      toast.warning("Please log in to add items to your wishlist!");
      return;
    }
    try {
      await addWishlist({ productId, userId }).unwrap();
      toast.success("Product added to wishlist!");
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Failed to add to wishlist!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40 w-full">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0">
      <div className="grid grid-cols-12 gap-8">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <ShopFilters
              key={`${currentFilters.maxPrice}-${currentFilters.category}-${currentFilters.brand}`}
              products={products}
              filters={currentFilters}
              onFilterChange={updateFilters}
            />
          </div>
        </aside>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-[350px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-black uppercase tracking-widest text-gray-900">
                  Filters
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 bg-gray-50  text-gray-500 hover:text-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <ShopFilters
                  products={products}
                  filters={currentFilters}
                  onFilterChange={(updates) => {
                    updateFilters(updates);
                    if (updates.category || updates.brand) setIsDrawerOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <main
          className={`col-span-12 lg:col-span-9 space-y-8 transition-opacity duration-300 ${isFetching ? "opacity-50" : "opacity-100"}`}
        >
          <div className="bg-white p-4 md:p-6  border border-gray-100 shadow-sm">
            <div className="flex flex-row items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden flex items-center justify-center p-3 md:p-4 bg-gray-50 border border-gray-100   text-gray-900 active:scale-95 transition-all shrink-0"
              >
                <Filter size={18} className="text-gray-950" />
              </button>

              <div className="flex-1 min-w-0">
                <ShopToolbar
                  totalItems={totalItems}
                  searchTerm={currentFilters.searchTerm || ""}
                  onSearch={(val: string) =>
                    updateFilters({
                      searchTerm: val,
                      page: SHOP_CONSTANT.DEFAULT_PAGE,
                    })
                  }
                />
              </div>

              <div className="shrink-0">
                <SortControls
                  onSortChange={(val: string) => {
                    const [sortBy, sortOrder] = val.split("-");
                    updateFilters({
                      sortBy,
                      sortOrder,
                      page: SHOP_CONSTANT.DEFAULT_PAGE,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product: IUserProducts) => (
                <CustomProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAdd}
                  onWishlist={handleWishlist}
                  isFlashSale={false}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white  border border-gray-100 text-center">
              <h3 className="text-xl font-black text-gray-900 uppercase">
                No Results Found
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Adjust your filters or search terms.
              </p>
            </div>
          )}

          {products.length > 0 && (
            <ShopPagination
              currentPage={Number(currentFilters.page) || SHOP_CONSTANT.DEFAULT_PAGE}
              totalItems={totalItems}
              totalPages={totalPages}
              itemsPerPage={limit}
              onPageChange={(page: number) => updateFilters({ page })}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopModule;