import { IUserProfileResponse, IUserResponse } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";


const USER_URL = "/user";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getMyProfile: build.query<IUserProfileResponse, void>({
            query: () => ({
                url: `${USER_URL}/profile`,
                method: "GET",
            }),
            providesTags: [tagtypes.user],
        }),
        createUser: build.mutation<IUserResponse, FormData>({
            query: (registerData) => ({
                url: `${USER_URL}/create-user`,
                method: "POST",
                data: registerData,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagtypes.user],
        }),
    }),
});

export const { useCreateUserMutation, useGetMyProfileQuery } = authApi;