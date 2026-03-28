import { useEffect, useState } from "react";
import { socket } from "../socket/socket.io";
import { useAppDispatch } from "@/store/reduxSetup/hooks";
import { orderApi } from "@/store/api/orderApi/orderApi";
import { IOrderResponse, IOrder } from "@/types/types";

interface Location {
  lat: number;
  lng: number;
}

export const useOrderTracking = (orderId: string) => {
  const dispatch = useAppDispatch();
  const [riderLocation, setRiderLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!orderId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_order_room", orderId);

    socket.on("status_update", (data) => {
      dispatch(
        orderApi.util.updateQueryData("getSingleOrder", orderId, (draft: IOrderResponse) => {
          if (draft?.data && !Array.isArray(draft.data)) {
            const order = draft.data as IOrder;
            order.status = data.status;
            order.updatedAt = data.updatedAt;

            if (data.rider) {
              order.riderName = data.rider.name;
              order.riderPhone = data.rider.phone;
            }
          }
        })
      );
    });

    socket.on("rider_moved", (data: Location) => {
      setRiderLocation(data);
    });

    return () => {
      socket.off("status_update");
      socket.off("rider_moved");
    };
  }, [orderId, dispatch]);

  const updateMyLocation = (lat: number, lng: number) => {
    if (socket.connected) {
      socket.emit("update_location", { orderId, lat, lng });
    }
  };

  return { riderLocation, updateMyLocation };
};