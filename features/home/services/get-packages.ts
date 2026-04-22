import { apiFetch } from "@/lib/api";
import { PackagesResponse } from "../types";

export const getPackages = async (): Promise<PackagesResponse> => {
  return await apiFetch<PackagesResponse>("/v1/packages");
};
