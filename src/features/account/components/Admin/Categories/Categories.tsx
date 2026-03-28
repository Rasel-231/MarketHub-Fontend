"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  PlusCircle, 
  LayoutGrid, 
  Loader2, 
  Trash2,  
  Settings2, 
  X, 
  Plus, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { toast } from "react-toastify";
import { 
  useCreateCategoryMutation, 
  useDeleteCategoryParmanentlyMutation, 
  useGetCategoryQuery,

} from "@/store/api/categoryApi/categoryApi";
import { ICategory, IErrorResponse } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCreateAttributeMutation, useGetAttributeQuery } from "@/store/api/attributeApi/attributeApi";

interface IAttribute {
  id: string;
  name: string;
  label?: string;
  groupName?: string;
  categoryId: string;
}

type TCategoryForm = {
  name: string;
};

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [attributeForm, setAttributeForm] = useState({
    name: "",
    label: "",
    groupName: ""
  });

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const { data: Response } = useGetCategoryQuery(undefined);
  const [deleteCategory] = useDeleteCategoryParmanentlyMutation();
  
  const [createAttribute, { isLoading: isAttributeCreating }] = useCreateAttributeMutation();
  const { data: attrResponse } = useGetAttributeQuery(
    selectedCategory?.id ?? "",
    { skip: !selectedCategory?.id }
  );

  const categories: ICategory[] = Response?.data?.data || [];
  const attributes: IAttribute[] = Array.isArray(attrResponse?.data) ? attrResponse.data : [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>();

  const onSubmit = async (formData: TCategoryForm) => {
    try {
      await createCategory(formData).unwrap();
      toast.success("Category Created Successfully!");
      reset({ name: "" });
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Failed to create category!");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category Deleted!");
      } catch (err) {
        const error = err as IErrorResponse;
        toast.error(error?.data?.message || "Delete failed!");
      }
    }
  };

  const handleAddAttribute = async () => {
    if (!attributeForm.name.trim() || !selectedCategory) return;
    try {
      await createAttribute({
        name: attributeForm.name,
        label: attributeForm.label || attributeForm.name,
        groupName: attributeForm.groupName || "General",
        categoryId: selectedCategory.id
      }).unwrap();
      
      toast.success("Attribute added!");
      setAttributeForm({ name: "", label: "", groupName: "" });
      setShowAdvanced(false);
    } catch  {
      toast.error("Failed to add attribute");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/3 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-6 py-5 flex items-center gap-3">
              <PlusCircle className="w-5 h-5 text-white" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Add Category</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">Category Name</label>
                <input
                  type="text"
                  disabled={isCreating}
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                    errors.name ? "border-red-100 focus:border-red-400" : "border-gray-100 focus:border-blue-500"
                  }`}
                />
              </div>
              <button disabled={isCreating} className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                {isCreating ? <Loader2 className="animate-spin" /> : <PlusCircle />} Save Category
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-blue-600" /> Categories
            </h3>
            <Badge variant="secondary">{categories.length} Total</Badge>
          </div>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6">SI</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Attributes</TableHead>
                <TableHead className="text-right px-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id} className="group hover:bg-blue-50/30">
                  <TableCell className="px-6">{String(index + 1).padStart(2, '0')}</TableCell>
                  <TableCell className="font-bold text-gray-700">{category.name}</TableCell>
                  <TableCell className="text-center">
                    <button onClick={() => setSelectedCategory(category)} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                      <Settings2 size={14} /> Manage
                    </button>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-black text-gray-800">Manage Attributes</h3>
                <p className="text-sm text-blue-600 font-bold uppercase">{selectedCategory.name}</p>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Attribute Name *</label>
                    <input 
                      type="text" 
                      value={attributeForm.name}
                      onChange={(e) => setAttributeForm({...attributeForm, name: e.target.value})}
                      className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <button onClick={handleAddAttribute} disabled={isAttributeCreating || !attributeForm.name} className="bg-blue-600 text-white h-[52px] w-[52px] flex items-center justify-center rounded-2xl hover:bg-blue-700 disabled:bg-gray-200 shadow-lg shadow-blue-100 transition-all">
                      {isAttributeCreating ? <Loader2 className="animate-spin" /> : <Plus />}
                    </button>
                  </div>
                </div>

                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:underline">
                  {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showAdvanced ? "Hide advanced options" : "Add label & group details"}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Display Label</label>
                      <input 
                        type="text" 
                        value={attributeForm.label}
                        onChange={(e) => setAttributeForm({...attributeForm, label: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Group Name</label>
                      <input 
                        type="text" 
                        value={attributeForm.groupName}
                        onChange={(e) => setAttributeForm({...attributeForm, groupName: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Active Attributes</p>
                <div className="flex flex-wrap gap-2.5 max-h-[200px] overflow-y-auto pr-2">
                  {attributes.length > 0 ? attributes.map((attr) => (
                    <Badge key={attr.id} variant="outline" className="group px-4 py-2 rounded-xl border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 transition-all">
                      <div className="flex flex-col items-start leading-none">
                        <span className="font-bold text-sm text-gray-700">{attr.label || attr.name}</span>
                        {attr.groupName && <span className="text-[9px] text-gray-400 font-medium uppercase mt-1">{attr.groupName}</span>}
                      </div>
                      <X size={14} className="ml-3 text-gray-300 group-hover:text-red-500 cursor-pointer" />
                    </Badge>
                  )) : (
                    <p className="text-sm text-gray-400 italic">No attributes defined.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedCategory(null)} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-2xl transition-all">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}