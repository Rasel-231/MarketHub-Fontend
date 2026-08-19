"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { useGetMyInvoicesQuery } from "@/store/api/invoiceApi/invoiceApi";
import { MyTable } from "@/components/shared/Table";
import { getBaseUrl } from "@/libs/config";
import axios from "axios";

const ReceiptDownload = () => {
  const { data: invoiceResponse, isLoading } = useGetMyInvoicesQuery();
  const invoices = invoiceResponse?.data || [];
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (orderId: string) => {
    try {
      setDownloadingId(orderId);
      const response = await axios.get(
        `${getBaseUrl()}/orders/${orderId}/voucher/download`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `voucher-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  const columns = [
    {
      header: "SI",
      key: "index" as const,
      render: (item: (typeof invoices)[0]) => invoices.indexOf(item) + 1,
    },
    {
      header: "Invoice No",
      key: "invoiceNumber" as const,
      render: (item: (typeof invoices)[0]) => (
        <span className="font-medium">{item.invoiceNumber}</span>
      ),
    },
    {
      header: "Order ID",
      key: "orderId" as const,
      render: (item: (typeof invoices)[0]) => (
        <span>{`O-${item.order.id.slice(0, 6).toUpperCase()}`}</span>
      ),
    },
    {
      header: "Date",
      key: "invoiceDate" as const,
      render: (item: (typeof invoices)[0]) =>
        new Date(item.invoiceDate).toLocaleDateString(),
    },
    {
      header: "Payment",
      key: "payment" as const,
      render: (item: (typeof invoices)[0]) => (
        <span
          className={
            item.payment?.status === "PAID"
              ? "text-green-600 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {item.payment?.status || "N/A"}
        </span>
      ),
    },
    {
      header: "Total",
      key: "totals" as const,
      render: (item: (typeof invoices)[0]) => (
        <span className="font-semibold">৳{item.totals.total}</span>
      ),
    },
    {
      header: "Download",
      key: "actions" as const,
      render: (item: (typeof invoices)[0]) => (
        <button
          onClick={() => handleDownload(item.order.id)}
          disabled={downloadingId === item.order.id}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition disabled:opacity-50"
        >
          <Download size={16} />
          {downloadingId === item.order.id ? "Downloading..." : "PDF"}
        </button>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-red-500" size={28} />
        <h1 className="text-2xl font-bold">Receipt Download</h1>
      </div>
      <MyTable
        columns={columns}
        data={invoices}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReceiptDownload;
