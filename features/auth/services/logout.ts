import { apiFetch } from "@/lib/api";

export const logoutService = async (): Promise<{ status: string; message: string }> => {
  return await apiFetch<{ status: string; message: string }>("/v1/auth/logout", {
    method: "POST",
  });
};
