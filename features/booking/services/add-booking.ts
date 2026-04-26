import { apiFetch } from "@/lib/api";
import { BookingPayload, BookingResponse } from "../types";

export const addBooking = async (payload: BookingPayload): Promise<BookingResponse> => {
  return await apiFetch<BookingResponse>("/v1/booking/confirm", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
