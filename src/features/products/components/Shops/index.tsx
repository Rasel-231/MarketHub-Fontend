"use client";

import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Pagination from "./pagination";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { IUserProducts } from "@/types/types";
import FilteringSidebar from "./FilteringSidebar";
import ShopNavber from "./ShopNavber";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface IFilterParams {
  category?: string;
  brand?: string;
  maxPrice?: string;
  searchTerm?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}

const ShopIndex = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);


  const params = useMemo(() => {
    return Object.fromEntries(searchParams.entries()) as IFilterParams;
  }, [searchParams]);

  const itemsPerPage = 3;
  const page = Number(params.page) || 1;

  const { data: response, isLoading, isFetching } = useGetProductsQuery({
    page,
    limit: itemsPerPage,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
    searchTerm: params.searchTerm || "",
    category: params.category || "",
    brand: params.brand || "",
    maxPrice: params.maxPrice || "",
  });


  const updateQuery = useCallback((newParams: Record<string, string | number | null>) => {
    const current = new URLSearchParams(searchParamsRef.current.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, value.toString());
      }
    });

    if (!newParams.page) current.set("page", "1");
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [pathname, router]);

  const handleSearch = useCallback((term: string) => {
    updateQuery({ searchTerm: term, page: 1 });
  }, [updateQuery]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CustomSpinner />
      </div>
    );
  }

  const products: IUserProducts[] = response?.data?.data || [];
  const meta = response?.data?.meta;

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="flex flex-col md:flex-row gap-6 items-start max-w-[1400px] mx-auto">

        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-xl transform transition-transform duration-300 ease-in-out
          md:sticky md:top-4 md:translate-x-0 md:shadow-sm md:rounded-lg md:block md:z-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={() => setIsOpen(false)}>
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          <FilteringSidebar 
            products={products} 
            filters={params} 
            onChange={updateQuery} 
          />
        </aside>


        {isOpen && (
          <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsOpen(false)} />
        )}

        <main className={`flex-1 flex flex-col gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
          <ShopNavber 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            onSortChange={(sortVal: string) => {
               const [sortBy, sortOrder] = sortVal.split("-");
               updateQuery({ sortBy, sortOrder });
            }}
            onSearch={handleSearch} 
          />


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: IUserProducts) => (
              <div key={product.id} className="bg-white group relative border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0] || "/placeholder.png"}
                    fill
                    alt={product.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-4 pb-16 flex-grow">
                  <h1 className="font-semibold text-gray-800 truncate">{product.title}</h1>
                  <div className="flex items-center gap-2 my-2">
                    <span className="text-lg font-bold text-blue-600">${product.sellingPrice}</span>
                    <span className="text-xs text-gray-400 line-through">${product.productActualPrice}</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      -${product.discountAmount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <button className="absolute bottom-0 w-full bg-black text-white py-3.5 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                  <ShoppingCart size={18} />
                  <span className="text-sm font-bold uppercase tracking-tight">Add to Cart</span>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil((meta?.total || 0) / itemsPerPage)}
              totalItems={meta?.total || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={(newPage: number) => {
                updateQuery({ page: newPage });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopIndex;