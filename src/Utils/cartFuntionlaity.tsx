"use client"


import { useCreateCartsMutation, useDeleteCartsMutation, useUpdateCartsMutation } from "@/store/api/cartApi/cartApi";
import {  ICart, IUserProducts } from "@/types/types";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  const [addToCart, { isLoading }] = useCreateCartsMutation();
  const [deleteCart]=useDeleteCartsMutation();
  const [updateCart] = useUpdateCartsMutation();

  const handleAdd = async (product: IUserProducts) => {
    if (!product?.id) {
      toast.error("Product not found!");
      return;
    }

    const cartData:ICart = {
      productId: product.id,
      quantity: 1,
      sellingPrice: product.sellingPrice,
    };

    try {
      await addToCart(cartData).unwrap();
      toast.success(`${product.title} added to cart!`);
    } catch {
      toast.error("Failed to add product");
    }
  };
  const handleDelete = async (productId: string) => {
    try {
      await deleteCart(productId).unwrap();
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
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
    } catch {
        toast.error("Update failed");
    }
};

  return { handleAdd,handleDelete,handleQuantity, isLoading };
};