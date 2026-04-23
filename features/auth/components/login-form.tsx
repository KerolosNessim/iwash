"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm({
  setOpen,
  setView,
}: {
  setOpen: (open: boolean) => void;
  setView: (view: "login" | "register" | "success") => void;
}) {
  const t = useTranslations("auth");

  const [showPassword, setShowPassword] = React.useState(false);

  const loginMutation = useLogin(() => {
    setOpen(false); // Close dialog on successful login
  });

  // Schema validation using Zod
  const formSchema = z.object({
    phone: z.string().min(1, { message: t("login_form.required_message") }),
    password: z.string().min(1, { message: t("login_form.required_message") }),
    rememberMe: z.boolean().optional(),
  });

  type loginValues = z.infer<typeof formSchema>;

  const form = useForm<loginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: loginValues) {
    loginMutation.mutate(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 w-full max-w-lg mx-auto py-2"
    >
      <FieldGroup className="gap-6">
        {/* Phone Number Field */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="text-base font-bold flex items-center gap-1 px-1">
                {t("login_form.phone_label")}
                <span className="text-red-500">*</span>
              </FieldLabel>

              <div
                dir="ltr"
                className={cn(
                  "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                  fieldState.invalid &&
                    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
                )}
              >
                <PhoneInput
                  defaultCountry="qa"
                  value={field.value}
                  onChange={field.onChange}
                  inputClassName="!border-0 !bg-transparent !w-full !h-full !text-base !outline-none !shadow-none !px-0 placeholder:text-muted-foreground/50"
                  className="border-0! bg-transparent! w-full! h-full! flex! items-center!"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "!border-0 !bg-transparent !p-0 !mr-2 rtl:!mr-0 rtl:!ml-2 !flex !items-center !gap-1",
                    dropdownArrowClassName:
                      "!border-muted-foreground/30 hidden!",
                  }}
                  placeholder="7x xxx xx xx"
                />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="text-base font-bold flex items-center gap-1 px-1">
                {t("login_form.password_label")}
                <span className="text-red-500">*</span>
              </FieldLabel>

              <div
                className={cn(
                  "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                  fieldState.invalid &&
                    "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
                )}
              >
                <Lock size={20} className="text-muted-foreground" />
                <div className="h-6 w-px bg-[#E5E5E5] mx-3" />

                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login_form.password_placeholder")}
                  className="flex-1 h-full text-base bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none px-3 placeholder:text-muted-foreground/50 rtl:text-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-checked:bg-brand data-checked:border-brand"
              />
            )}
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium text-muted-foreground cursor-pointer"
          >
            {t("login_form.remember_me")}
          </label>
        </div>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full h-14 rounded-full bg-brand hover:bg-[#65a100] text-white text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
      >
        <>
          <span>{t("login_form.login_btn")}</span>

          {loginMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowRight
              size={22}
              strokeWidth={2.5}
              className="rtl:rotate-180"
            />
          )}
        </>
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-1 " />
        <span className="text-muted-foreground font-medium">
          {t("login_form.or")}
        </span>
        <Separator className="flex-1" />
      </div>

      {/* Footer: Register Link */}
      <div className="text-center text-muted-foreground">
        {t("login_form.have_not_account")}{" "}
        <span
          onClick={() => setView("register")}
          className="text-brand font-bold hover:underline underline-offset-4 cursor-pointer"
        >
          {t("login_form.register")}
        </span>
      </div>
    </form>
  );
}
