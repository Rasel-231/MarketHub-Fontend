import { IReview } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const CUSTOM_URL = "custom_url"

const customApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getApi: build.query<IReview, string>({
            query: (data) => ({
                url: `${CUSTOM_URL}/get-api`,
                method: "GET",
                data
            }),
            providesTags: [tagtypes.custom]
        }),
        getSingleApi: build.query<IReview, string>({
            query: (id) => ({
                url: `${CUSTOM_URL}/${id}`,
                method: "GET",

            }),
            providesTags: [tagtypes.custom]
        }),
        deleteApi: build.mutation<IReview, string>({
            query: (id) => ({
                url: `${CUSTOM_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.custom]
        }),
        updateApi: build.mutation<IReview, { id: string, data: FormData }>({
            query: ({ id, data }) => ({
                url: `${CUSTOM_URL}/${id}`,
                method: "PATCH",
                data: data,
                contentType: "multipart/form-data",

            }),
            invalidatesTags: [tagtypes.custom]
        }),
        createApi: build.mutation<IReview, FormData>({
            query: (data) => ({
                url: `${CUSTOM_URL}/create-api`,
                method: "POST",
                data
            }),
            invalidatesTags: [tagtypes.custom]
        }),
    })
})

export const { useGetApiQuery, useGetSingleApiQuery, useDeleteApiMutation, useUpdateApiMutation, useCreateApiMutation } = customApi