import { getBaseUrl } from "@/lib/config";
import { axiosBaseQuery } from "../reduxSetup/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query";
import { tagtypeList } from "../reduxSetup/types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagtypeList,
});
