import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutService } from "../services/logout";
import { useAuthStore } from "../store/auth-store";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { removeAuthToken } from "../actions";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const t = useTranslations("Navbar");

  return useMutation({
    mutationFn: logoutService,
    onSuccess: async (data) => {
      logout();
      await removeAuthToken();
      queryClient.clear();
      toast.success(data.message || t("logout_success"));
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });
};
