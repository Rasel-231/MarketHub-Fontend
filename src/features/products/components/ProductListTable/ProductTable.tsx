"use client";

import CustomSpinner from "@/components/shared/CustomSpinner";
import { useDeleteProductsMutation, useGetProductsQuery } from "@/store/api/productsApi/productsApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 
import { IUserProducts } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductTable = () => {
  const { data: productResponse, isLoading } = useGetProductsQuery(undefined);
  const [deleteProducts, { isLoading: isDeleting }] = useDeleteProductsMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CustomSpinner />
      </div>
    );
  }

  const products = productResponse?.data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteProducts(id).unwrap();
      toast.success("Product deleted successfully!");
    } catch{
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of your All Products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SI</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: IUserProducts, index: number) => (
            <TableRow key={product.id || index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {product.images && product.images[0] ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.title} 
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-[10px]">No Image</div>
                )}
              </TableCell>
              <TableCell className="font-semibold">{product.title}</TableCell>
              
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                 
                  <Link href={`/products/update/${product.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit size={16} />
                    </Button>
                  </Link>

                
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Products</TableCell>
            <TableCell className="text-right font-bold">{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductTable;