import { apiFetch } from "@/lib/api";
import { BookingsResponse } from "../types";

export const getInProgressBookings = async (page: number = 1): Promise<BookingsResponse> => {
  return await apiFetch<BookingsResponse>(`/v1/user/bookings/in-progress?page=${page}`);
};

export const getCompletedBookings = async (page: number = 1): Promise<BookingsResponse> => {
  return await apiFetch<BookingsResponse>(`/v1/user/bookings/completed?page=${page}`);
};
