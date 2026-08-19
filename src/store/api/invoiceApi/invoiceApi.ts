import { tagtypes } from "../../reduxSetup/types";
import { baseApi } from "../baseApi";

const INVOICE_URL = "/invoices";

export interface IInvoiceItem {
  productId: string;
  title: string;
  brand: string;
  shopName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface IInvoice {
  invoiceNumber: string;
  invoiceDate: string;
  order: {
    id: string;
    status: string;
    placedAt: string;
    updatedAt: string;
    rider: { name: string | null; phone: string | null };
  };
  billTo: {
    name: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    billingAddress: {
      companyName: string;
      streetAddress: string;
      apartment: string;
      city: string;
    } | null;
  };
  items: IInvoiceItem[];
  payment: {
    transactionId: string;
    method: string;
    status: string;
    amount: number;
    paidAt: string;
  } | null;
  totals: {
    subtotal: number;
    deliveryCharge: number;
    tax: number;
    total: number;
  };
}

export interface IInvoiceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IInvoice[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyInvoices: build.query<IInvoiceResponse, void>({
      query: () => ({
        url: `${INVOICE_URL}/my`,
        method: "GET",
      }),
      providesTags: [tagtypes.invoice],
    }),
  }),
});

export const { useGetMyInvoicesQuery } = invoiceApi;
