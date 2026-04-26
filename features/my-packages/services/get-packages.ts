import { apiFetch } from "@/lib/api";
import { MyPackagesResponse } from "../types";

export const getActivePackages = async (page: number = 1): Promise<MyPackagesResponse> => {
  return await apiFetch<MyPackagesResponse>(`/v1/user/bookings/active?page=${page}`);
};

export const getFinishedPackages = async (page: number = 1): Promise<MyPackagesResponse> => {
  return await apiFetch<MyPackagesResponse>(`/v1/user/bookings/finished?page=${page}`);
};
