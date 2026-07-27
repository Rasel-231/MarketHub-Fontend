"use client";

import { IOrder } from "@/types/types";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useGetOrderQuery } from "@/store/api/orderApi/orderApi";
import { MyTable } from "@/components/shared/Table";

const PendingOrder = () => {
  const { data: orderResponse, isLoading } = useGetOrderQuery(undefined);
  const pendingOrders =
    (orderResponse?.data as IOrder[])?.filter(
      (order) => order.status === "PENDING",
    ) || [];

  const myColumns = [
    {
      header: "SI",
      key: "index" as const,
      render: (item: IOrder) => pendingOrders.indexOf(item) + 1,
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
              ? "text-green-400 font-bold"
              : "text-red-500 font-bold"
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
      <h1 className="text-2xl font-bold mb-6">Pending Orders</h1>
      <MyTable<IOrder>
        columns={myColumns}
        data={pendingOrders}
        isLoading={isLoading}
      />
      
    </div>
  );
};

export default PendingOrder;
