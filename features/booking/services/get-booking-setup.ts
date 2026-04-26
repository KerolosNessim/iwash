import { apiFetch } from "@/lib/api";
import { BookingSetupResponse } from "../types";

export const getBookingSetup = async (): Promise<BookingSetupResponse> => {
  return await apiFetch<BookingSetupResponse>("/v1/booking/setup");
};
