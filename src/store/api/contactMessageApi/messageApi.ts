import { IContactMessagesResponse, IContact } from "@/types/types";
import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const CONTACT_MESSAGE_URL = "/contact/messages";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAllContactMessages: build.query<IContactMessagesResponse, void>({
            query: () => ({
                url: `${CONTACT_MESSAGE_URL}/`,
                method: "GET",
            }),
            providesTags: [tagtypes.contact],
        }),
        getSingleContactMessages: build.query<IContactMessagesResponse, void>({
            query: () => ({
                url: `${CONTACT_MESSAGE_URL}/`,
                method: "GET",
            }),
            providesTags: [tagtypes.contact],
        }),
        deleteContactMessages: build.query<IContactMessagesResponse, void>({
            query: () => ({
                url: `${CONTACT_MESSAGE_URL}/`,
                method: "DELETE",
            }),
            providesTags: [tagtypes.contact],
        }),

        createContactMessage: build.mutation<IContactMessagesResponse, Partial<IContact>>({
            query: (data) => ({
                url: `${CONTACT_MESSAGE_URL}/create`,
                method: "POST",
                data: data,

            }),
            invalidatesTags: [tagtypes.contact],
        }),

    }),
});

export const {
    useCreateContactMessageMutation,
    useDeleteContactMessagesQuery,
    useGetAllContactMessagesQuery,
    useGetSingleContactMessagesQuery
} = contactApi;