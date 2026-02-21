import { IUserProducts, IUserProductsResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const PRODUCTS_URL = "/products";

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getProducts: build.query<IUserProductsResponse, Record<string, IUserProducts> | void>({
            query: (params) => ({
                url: `${PRODUCTS_URL}/`,
                method: "GET",
                params,
            }),
            providesTags: [tagtypes.product],
        }),


        getSingleProducts: build.query<IUserProductsResponse, string>({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagtypes.product],
        }),


        deleteProducts: build.mutation<IUserProductsResponse, string>({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.product],
        }),


        createProduct: build.mutation<IUserProductsResponse, FormData>({
            query: (data) => ({
                url: `${PRODUCTS_URL}/create`,
                method: "POST",
                data: data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagtypes.product],
        }),


        updateProduct: build.mutation<IUserProductsResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "PATCH",
                data: data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagtypes.product],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
    useDeleteProductsMutation,
    useGetSingleProductsQuery
} = productApi;