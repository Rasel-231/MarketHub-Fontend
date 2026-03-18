import { IAttributeResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const ATTRIBUTE_URL = "attribute";

export const attributeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAttribute: build.query<IAttributeResponse, string>({
            query: (id) => ({
                url: `${ATTRIBUTE_URL}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: tagtypes.attribute, id }],
        }),

        deleteAttribute: build.mutation<IAttributeResponse, string>({
            query: (id) => ({
                url: `${ATTRIBUTE_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.attribute],
        }),

        updateAttribute: build.mutation<IAttributeResponse, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `${ATTRIBUTE_URL}/${id}`,
                method: "PATCH",
                data: data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagtypes.attribute],
        }),

        createAttribute: build.mutation<
            IAttributeResponse,
            {
                name: string;
                categoryId: string;
                label?: string;
                groupName?: string;
            }
        >({
            query: (data) => ({
                url: `${ATTRIBUTE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagtypes.attribute],
        }),
    }),
});

export const {
    useGetAttributeQuery,
    useDeleteAttributeMutation,
    useUpdateAttributeMutation,
    useCreateAttributeMutation,
} = attributeApi;