import { baseApi } from "../baseApi";
import { tagtypes } from "../../reduxSetup/types";
import { IAiAssistantResponse } from "@/types/types";

const assistantApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        supportApi: build.mutation<IAiAssistantResponse, { prompt: string; userId?: string }>({
            query: (data) => ({
                url: "/assistant/chat",
                method: "POST",
                data
            }),
            invalidatesTags: [tagtypes.assistant]
        }),
    })
})

export const { useSupportApiMutation } = assistantApi;