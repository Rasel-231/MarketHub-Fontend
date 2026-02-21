import { ICategoryResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategory: build.query<ICategoryResponse, Record<string, string | number | boolean> | void>({
            query: (params) => ({
                url: CATEGORY_URL,
                method: "GET",
                params,
            }),
            providesTags: [tagtypes.category],
        }),

        getSingleCategory: build.query<ICategoryResponse, string>({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagtypes.category],
        }),

        deleteCategory: build.mutation<ICategoryResponse, string>({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.category],
        }),

        createCategory: build.mutation<ICategoryResponse, { name: string }>({
            query: (data) => ({
                url: `${CATEGORY_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagtypes.category],
        }),

        updateCategory: build.mutation<ICategoryResponse, { id: string; data: string }>({
            query: ({ id, data }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: [tagtypes.category],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryQuery,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
} = categoryApi;