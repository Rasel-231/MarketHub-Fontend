"use client"


import { useCreateCartsMutation, useDeleteCartsMutation, useUpdateCartsMutation } from "@/store/api/cartApi/cartApi";
import { useDeleteWishlistMutation } from "@/store/api/wishlistApi/wishlistApi";
import {  ICart, IErrorResponse, IUserProducts } from "@/types/types";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  const [addToCart, { isLoading }] = useCreateCartsMutation();
  const [deleteCart]=useDeleteCartsMutation();
  const [updateCart] = useUpdateCartsMutation();
  const [deleteWishlist]=useDeleteWishlistMutation();

  const handleAdd = async (product: IUserProducts,wishlistId?: string) => {
    if (!product?.id) {
      toast.error("Product not found!");
      return;
    }

    const cartData:ICart = {
      productId: product.id,
      quantity: 1,
      flashSalePrice: product.flashSalePrice,
    };

    try {
      await addToCart(cartData).unwrap();
      toast.success(`${product.title} added to cart!`);
      if (wishlistId) {
        await deleteWishlist(wishlistId).unwrap();
      }
    } catch(err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Failed to add product!");
     }
      
    }
  const handleDelete = async (productId: string) => {
    try {
      await deleteCart(productId).unwrap();
      toast.success("Item removed from cart");
    } catch(err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Failed to remove item");
    }
  };

 const handleQuantity = async (id: string, currentQty: number, action: 'inc' | 'dec') => {
    const newQty = action === 'inc' ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
        await updateCart({ 
            id, 
            data: { quantity: newQty } 
        }).unwrap();
    } catch(err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Update failed");
      
    }
};

  return { handleAdd,handleDelete,handleQuantity, isLoading };
};