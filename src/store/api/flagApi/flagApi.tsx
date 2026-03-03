import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";
import { IFlagResponse } from "@/types/types";

const FLAG_URL = "/flag";

export const flagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFlashSales: build.query<IFlagResponse, void>({
      query: () => ({
        url: `${FLAG_URL}/flash-sales`,
        method: "GET",
      }),
      providesTags: [tagtypes.flag],
    }),
    getNewArrivals: build.query<IFlagResponse, void>({
      query: () => ({
        url: `${FLAG_URL}/new-arrivals`,
        method: "GET",
      }),
      providesTags: [tagtypes.flag],
    }),

    getBestSelling: build.query<IFlagResponse, void>({
      query: () => ({
        url: `${FLAG_URL}/best-selling`,
        method: "GET",
      }),
      providesTags: [tagtypes.flag],
    }),
    getFeaturedProducts: build.query<IFlagResponse, void>({
      query: () => ({
        url: `${FLAG_URL}/featured`,
        method: "GET",
      }),
      providesTags: [tagtypes.flag],
    }),

    getRelatedProducts: build.query<IFlagResponse, string>({
      query: (id) => ({
        url: `${FLAG_URL}/related/${id}`,
        method: "GET",
      }),
      providesTags: [tagtypes.flag],
    }),
  }),
  overrideExisting: true, 
});

export const {
  useGetFeaturedProductsQuery,
  useGetFlashSalesQuery,
  useGetNewArrivalsQuery,
  useGetRelatedProductsQuery,
  useGetBestSellingQuery, 
} = flagApi;