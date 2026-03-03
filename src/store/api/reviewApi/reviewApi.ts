import { IReview, IReviewResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";


const REVIEW_URL = "/review";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getReviews: build.query<IReviewResponse, string>({
            query: (productId) => ({
                url: `${REVIEW_URL}/${productId}`,
                method: "GET",
            }),
            providesTags: [tagtypes.review],
        }),

        getSingleReviews: build.query<IReviewResponse, string>({
            query: (id) => ({
                url: `${REVIEW_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagtypes.review],
        }),

        deleteReviews: build.mutation<IReviewResponse, string>({
            query: (id) => ({
                url: `${REVIEW_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.review],
        }),

        createReviews: build.mutation<IReviewResponse, Partial<IReview>>({
            query: (data) => ({
                url: `${REVIEW_URL}/create`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagtypes.review],
        }),

        updateReviews: build.mutation<IReviewResponse, { id: string; data: Partial<IReview> }>({
            query: ({ id, data }) => ({
                url: `${REVIEW_URL}/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: [tagtypes.review],
        }),
    }),
});

export const {
    useCreateReviewsMutation,
    useDeleteReviewsMutation,
    useGetReviewsQuery,
    useGetSingleReviewsQuery,
    useUpdateReviewsMutation
} = reviewApi;