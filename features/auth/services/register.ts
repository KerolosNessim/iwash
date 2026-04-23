import { apiFetch } from "@/lib/api";
import { RegisterRequest, AuthResponse } from "../types";

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  return await apiFetch<AuthResponse>("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      password: data.password,
    }),
  });
};
