import { LoginData, LoginResponse } from "@/types/types";
import { tagtypes } from "../reduxSetup/types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation<LoginResponse, LoginData>({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagtypes.user],
    }),
    userLogout: build.mutation<void, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: [tagtypes.user],
    }),

  }),
});

export const { useUserLoginMutation, useUserLogoutMutation } = authApi;