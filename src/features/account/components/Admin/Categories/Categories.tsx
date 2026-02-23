"use client";
import { useForm } from "react-hook-form";
import { PlusCircle, LayoutGrid, Loader2 } from "lucide-react"; 
import { useCreateCategoryMutation } from "@/componentsss/Redux/api/categoryApi/categoryApi";
import { toast } from "react-toastify";

type TCategoryForm = {
  name: string;
};

export default function Category() {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>();

  const onSubmit = async (data: TCategoryForm) => {
    console.log("Data",data);
    try {
      await createCategory(data).unwrap();
      
      toast.success("Category Created Successfully!");
      reset(); 
    } catch {
      
      const errMsg = "Making Category failed";
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Create New Category</h2>
        </div>

       
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              disabled={isLoading}
              placeholder="e.g. Electronics, Fashion..."
              {...register("name", { required: "Category name is required" })}
              className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none focus:ring-2 
                ${errors.name 
                  ? "border-red-400 focus:ring-red-100" 
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"}`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
              {isLoading ? "Saving..." : "Save Category"}
            </button>

         
          </div>
        </form>
      </div>
    </div>
  );
}