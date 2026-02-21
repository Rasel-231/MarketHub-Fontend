import { ICart, ICartResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const CARTS_URL = "/carts";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getCarts: build.query<ICartResponse, void>({
            query: () => ({
                url: `${CARTS_URL}/get-cart`,
                method: "GET",
            }),
            providesTags: [tagtypes.cart],
        }),

        getSingleCarts: build.query<ICartResponse, string>({
            query: (id) => ({
                url: `${CARTS_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagtypes.cart],
        }),

        deleteCarts: build.mutation<ICartResponse, string>({
            query: (id) => ({
                url: `${CARTS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.cart],
        }),

        createCarts: build.mutation<ICartResponse, Partial<ICart>>({
            query: (data) => ({
                url: `${CARTS_URL}/add`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagtypes.cart],
        }),

        updateCarts: build.mutation<ICartResponse, { id: string; data: Partial<ICart> }>({
            query: ({ id, data }) => ({
                url: `${CARTS_URL}/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: [tagtypes.cart],
        }),
    }),
});

export const {
    useCreateCartsMutation,
    useDeleteCartsMutation,
    useGetCartsQuery,
    useGetSingleCartsQuery,
    useUpdateCartsMutation
} = cartApi;