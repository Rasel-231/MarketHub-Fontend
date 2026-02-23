"use client";
import { useForm } from "react-hook-form";

import BreadCumb from "@/components/shared/BreadCumb";
import { toast } from "react-toastify";

import { ShoppingCart, Loader2 } from "lucide-react";
import { ICart, IOrder, OrderFormData } from "@/types/types";

import { useRouter } from "next/navigation";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useCreateOrderMutation } from "@/store/api/orderApi/orderApi";
import { useCreatePaymentMutation } from "@/store/api/paymentApi/paymentApi";
import { useGetCartsQuery } from "@/store/api/cartApi/cartApi";

const BillingDetails = () => {
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [createPayment, { isLoading: isPaymentLoading }] =useCreatePaymentMutation();
  const { data: cartItem } = useGetCartsQuery(undefined);

  const carts = cartItem?.data;
  const router = useRouter();

  const { register, handleSubmit } = useForm<OrderFormData>({
    defaultValues: {
      paymentMethod: "online",
    },
  });

  if (!carts) {
    return (
      <div className="h-screen flex items-center justify-center">
          <CustomSpinner />
      </div>
    );
  }

  const onSubmit = async (data: OrderFormData) => {
    const formattedItems = carts.items.map((item: ICart) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.sellingPrice,
    }));

    const orderPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      deliveryAddress: data.address,
      city: data.city,
      paymentMethod:
        data.paymentMethod === "online" ? "ONLINE" : "CASH_ON_DELIVERY",
      totalAmount: carts.totalAmount,
      orderItems: formattedItems,
    };

    try {
      const res = await createOrder(orderPayload as Partial<IOrder>).unwrap();

      if (res.success) {
        toast.success("Order Created Successfully");
        console.log("Full Response:", res);

        if (data.paymentMethod === "online") {
          const orderData = res.data as IOrder;
          const transactionId = orderData?.transactionId;

          if (!transactionId) {
            toast.error("Transaction ID not generated from server");
            return;
          }

          const paymentPayload = {
            amount: carts.totalAmount,
            transactionId: transactionId,
            name: data.name,
            email: data.email,
            address: data.address,
            contactNumber: data.phone,
          };

          const paymentRes = await createPayment(paymentPayload).unwrap();

          if (paymentRes?.data) {
            window.location.replace(paymentRes.data);
          } else {
            toast.error("Payment Gateway URL not found");
          }
        } else {
          const orderData = res.data as IOrder & { orderId: string };
         const id = orderData.orderId;
          router.push(`/order/order-status/${id}`);
        }
      }
    } catch {
      toast.error("Order placement failed.");
    }
  };

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-10 text-black">
      <section className="mb-8">
        <BreadCumb />
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-10">Billing Details</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                {...register("address", { required: true })}
                placeholder="Address"
                className="p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">
                Town/City<span className="text-red-500">*</span>
              </label>
              <input
                {...register("city", { required: true })}
                placeholder="Town/City"
                className="p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", { required: true })}
                placeholder="E-mail"
                className="p-3 bg-gray-100 rounded-sm outline-none focus:ring-1 focus:ring-red-500 w-full"
              />
            </div>
          </div>

          <div className="lg:mt-0">
            <div className="space-y-4 mb-8 text-lg bg-gray-50 p-6 rounded-md">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <ShoppingCart />
                  <p>Total Products</p>
                </div>
                <p className="text-2xl font-bold">{carts.items.length}</p>
              </div>
              <div className="flex justify-between py-2 border-b">
                <p>Subtotal:</p>
                <p>${carts.totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-2 font-bold text-xl">
                <p>Total:</p>
                <p>${carts.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  id="online"
                  value="online"
                  className="accent-black w-5 h-5"
                />
                <label htmlFor="online" className="cursor-pointer font-medium">
                  Online Payment (SSLCommerz)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  id="cod"
                  value="cod"
                  className="accent-black w-5 h-5"
                />
                <label htmlFor="cod" className="cursor-pointer font-medium">
                  Cash on delivery
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isOrderLoading || isPaymentLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium px-12 py-4 rounded-sm transition-all active:scale-95 disabled:bg-gray-400 flex justify-center items-center"
            >
              {isOrderLoading || isPaymentLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />{" "}
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BillingDetails;
