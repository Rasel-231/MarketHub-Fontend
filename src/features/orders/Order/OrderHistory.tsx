"use client";

import { IOrder } from "@/types/types";
import Link from "next/link";
import {  Eye } from "lucide-react";
import { useGetOrderQuery } from "@/store/api/orderApi/orderApi";
import { MyTable } from "@/components/shared/Table";

const OrderHistory = () => {
  const { data: orderResponse, isLoading } = useGetOrderQuery(undefined);
  const orders = (orderResponse?.data as IOrder[]) || [];

  const myColumns = [
    {
      header: "SI",
      key: "index" as const,
      render: (item: IOrder) => orders.indexOf(item) + 1,
    },
    {
      header: "Status",
      key: "status" as const,
      render: (item: IOrder) => (
        <Link href={`/order/order-status/${item.id}`}>
          <Eye />
        </Link>
      ),
    },
    {
      header: "Order ID",
      key: "id" as const,
      render: (item: IOrder) => (
        <span>{`O-${item.id.slice(0, 6).toUpperCase()}`}</span>
      ),
    },

    {
      header: "Payment Status",
      key: "paymentStatus" as const,
      render: (item: IOrder) => (
        <span
          className={
            item.payment?.paymentStatus === "PAID"
              ? "text-green-600 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {item.payment?.paymentStatus}
        </span>
      ),
    },
    {
      header: "Delivery Status",
      key: "status" as const,
      render: (item: IOrder) => (
        <span
          className={
            item.status === "DELIVERED"
              ? "text-gray-400 font-bold"
              : "text-yellow-500 font-bold"
          }
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Amount",
      key: "totalAmount" as const,
      render: (item: IOrder) => <span>${item.totalAmount}</span>,
    },
    {
      header: "Date",
      key: "createdAt" as const,
      render: (item: IOrder) => new Date(item.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <MyTable<IOrder>
        columns={myColumns}
        data={orders}
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrderHistory;
