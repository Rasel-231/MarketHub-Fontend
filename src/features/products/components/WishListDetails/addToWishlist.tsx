"use client";

import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";
import { useAddWishlistMutation } from "@/store/api/wishlistApi/wishlistApi";
import { IErrorResponse } from "@/types/types";
import { toast } from "react-toastify";

export const useWishlistAction = () => {
  const { data: userData } = useGetMyProfileQuery(undefined);
  const [addWishlist] = useAddWishlistMutation();

  const handleWishlist = async (productId: string) => {
    const userId = userData?.data?.id;

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

  return {
    handleWishlist,
  };
};
