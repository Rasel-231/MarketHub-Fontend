import { IWishlist, IWishlistResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";


const WISHLIST_URL = "/wishlist";

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getWishlist: build.query<IWishlistResponse, string>({
            query: () => ({
                url: `${WISHLIST_URL}/`,
                method: "GET",
            }),
            providesTags: [tagtypes.wishlist],
        }),
        deleteWishlist: build.mutation<IWishlistResponse, string>({
            query: (id) => ({
                url: `${WISHLIST_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.wishlist],
        }),

        addWishlist: build.mutation<IWishlistResponse, Partial<IWishlist>>({
            query: (data) => ({
                url: `${WISHLIST_URL}/add`,
                method: "POST",
                data: data,

            }),
            invalidatesTags: [tagtypes.wishlist],
        }),


    }),
});

export const {
    useAddWishlistMutation,
    useDeleteWishlistMutation,
    useGetWishlistQuery,
} = wishlistApi;