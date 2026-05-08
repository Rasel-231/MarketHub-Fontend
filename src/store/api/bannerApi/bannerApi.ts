import { IUserProfileResponse, IUserResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const BANNER_URL = "/banner";

export const bannerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBannerImages: build.query<IUserProfileResponse, void>({
            query: () => ({
                url: `${BANNER_URL}/`,
                method: "GET",
            }),
            providesTags: [tagtypes.banner],
        }),
        uploadBannerImages: build.mutation<IUserResponse, FormData>({
            query: (data) => ({
                url: `${BANNER_URL}/add`,
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagtypes.banner],
        }),

        deleteBanner: build.mutation<IUserResponse, string>({
            query: (id) => ({
                url: `${BANNER_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagtypes.banner],
        }),
    }),
});

export const {
    useUploadBannerImagesMutation,
    useGetBannerImagesQuery,
    useDeleteBannerMutation
} = bannerApi;