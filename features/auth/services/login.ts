import { apiFetch } from "@/lib/api";
import { LoginRequest, AuthResponse } from "../types";

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({
      phone: data.phone,
      password: data.password,
    }),
  });
};
