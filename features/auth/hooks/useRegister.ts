import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/register";
import { RegisterRequest, AuthResponse } from "../types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useAuthStore } from "../store/auth-store";
import { setAuthToken } from "../actions";

export const useRegister = (onSuccess?: (data: AuthResponse) => void) => {
  const t = useTranslations("auth");
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerUser(data),
    onSuccess: async (data) => {
      // Save to Zustand Store
      setAuth(data?.data?.user, data?.data?.accessToken);
      
      // Save to Cookies via Server Action
      await setAuthToken(data?.data?.accessToken || "");

      toast.success(data.message || t("register_success.title"));
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || t("login_form.required_message") || "Registration failed");
    },
  });
};
