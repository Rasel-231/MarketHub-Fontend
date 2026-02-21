import { IOrder, IOrderResponse } from "@/types/types"; // ICart এর বদলে IOrder
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const ORDER_URL = "/orders";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getOrder: build.query<IOrderResponse, void>({
            query: () => ({
                url: `${ORDER_URL}/my-orders`,
                method: "GET",
            }),
            providesTags: [tagtypes.order],
        }),

        getSingleOrder: build.query<IOrderResponse, string>({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagtypes.order],
        }),
        deleteOrder: build.mutation<IOrderResponse, string>({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.order],
        }),

        createOrder: build.mutation<IOrderResponse, Partial<IOrder>>({
            query: (data) => ({
                url: `${ORDER_URL}/checkout`,
                method: "POST",
                data: data,
            }),

            invalidatesTags: [tagtypes.order, tagtypes.cart],
        }),

        updateOrder: build.mutation<IOrderResponse, { id: string; data: Partial<IOrder> }>({
            query: ({ id, data }) => ({
                url: `${ORDER_URL}/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: [tagtypes.order],
        }),
    }),
});

export const {
    useGetOrderQuery,
    useGetSingleOrderQuery,
    useDeleteOrderMutation,
    useCreateOrderMutation,
    useUpdateOrderMutation
} = orderApi;