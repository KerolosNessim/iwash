"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import RegisterSuccess from "./register-success";
import { useState } from "react";

interface LoginDialogProps {
  children: React.ReactNode;
}

function LoginDialog({ children }: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"login" | "register" | "success">("login");
  const t = useTranslations("auth");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Small delay to reset the view after the closing animation finishes
      setTimeout(() => setView("login"), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" md:max-w-xl rounded-3xl p-6 max-h-[95vh] overflow-y-auto scrollbar-hide">
        {view === "login" ? (
          <>
            <DialogHeader className="items-center text-center">
              <DialogTitle>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logo-blue.svg"
                    alt="logo"
                    width={40}
                    height={40}
                    className="w-20 h-auto"
                  />
                  <h1 className="text-2xl font-bold">{t("login_title")}</h1>
                  <p className="text-muted-foreground">
                    {t("login_description")}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <LoginForm setOpen={setOpen} setView={setView} />
          </>
        ) : view === "register" ? (
          <RegisterForm setView={setView} />
        ) : (
          <RegisterSuccess onClose={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;



