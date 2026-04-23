import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/login";
import { LoginRequest, AuthResponse } from "../types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAuthStore } from "../store/auth-store";
import { setAuthToken } from "../actions";

export const useLogin = (onSuccess?: (data: AuthResponse) => void) => {
  const t = useTranslations("auth");
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
    onSuccess: async (data) => {
      // Save to Zustand Store
      setAuth(data?.data?.user, data?.data?.accessToken);
      
      // Save to Cookies via Server Action
      await setAuthToken(data?.data?.accessToken || "");

      toast.success(data.message || t("login_form.success_message") || "Logged in successfully");
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || t("login_form.required_message") || "Login failed");
    },
  });
};
