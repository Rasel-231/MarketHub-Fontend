import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const PAYMENT_URL = "/payment";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPayment: build.mutation({
            query: (paymentData) => ({
                url: `${PAYMENT_URL}/initiate`,
                method: "POST",
                data: paymentData,
            }),
            invalidatesTags: [tagtypes.payment],
        }),

        getPaymentStatus: build.query({
            query: (tranId: string) => ({
                url: `${PAYMENT_URL}/status/${tranId}`,
                method: "GET",
            }),
            providesTags: [tagtypes.payment],
        }),
    }),
});

export const { useCreatePaymentMutation, useGetPaymentStatusQuery } = paymentApi;