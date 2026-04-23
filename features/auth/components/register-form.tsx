"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import * as React from "react";
import Image from "next/image";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { cn } from "@/lib/utils";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface RegisterFormProps {
  setView: (view: "login" | "register" | "success") => void;
}

/**
 * RegisterForm Component
 * 
 * A pixel-perfect implementation of the registration form as per the reference design.
 * Features:
 * - Full name, Phone number, Email, and Password fields.
 * - International phone number input.
 * - Custom icons and separators for each field.
 * - Terms and conditions agreement checkbox.
 * - Green-themed registration button.
 * - Fully localized for AR and EN.
 */
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm({ setView }: RegisterFormProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const [showPassword, setShowPassword] = React.useState(false);

  const registerMutation = useRegister(() => {
    setView("success");
  });

  // Schema validation using Zod
  const formSchema = z.object({
    fullName: z.string().min(1, { message: t("login_form.required_message") }),
    phone: z.string().min(1, { message: t("login_form.required_message") }),
    email: z.string().email({ message: t("login_form.phone_valid_message") || "Invalid email" }).min(1, { message: t("login_form.required_message") }),
    password: z.string().min(6, { message: t("login_form.min_length_message") }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: t("login_form.required_message"),
    }),
  });

  type registerValues = z.infer<typeof formSchema>;

  const form = useForm<registerValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  function onSubmit(data: registerValues) {
    registerMutation.mutate(data);
  }


  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 w-full max-w-lg mx-auto py-4"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold">{t("register_title")}</h1>
        <p className="text-muted-foreground">{t("register_description")}</p>
      </div>

      <FieldGroup className="gap-5">
        
        {/* Full Name Field */}
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="text-base font-bold flex items-center gap-1 px-1">
                {t("register_form.name_label")}
                <span className="text-red-500">*</span>
              </FieldLabel>
              
              <div className={cn(
                "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                fieldState.invalid && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
              )}>
                <User size={20} className="text-muted-foreground" />
                <div className="h-6 w-px bg-[#E5E5E5] mx-3" />
                <input
                  {...field}
                  type="text"
                  placeholder={t("register_form.name_placeholder")}
                  className="flex-1 h-full text-base bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none px-3 placeholder:text-muted-foreground/50 rtl:text-right"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
              
              <div dir="ltr" className={cn(
                "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                fieldState.invalid && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
              )}>
                <PhoneInput
                  defaultCountry="qa"
                  value={field.value}
                  onChange={field.onChange}
                  className="border-0! bg-transparent! w-full! h-full! flex! items-center!"
                  inputClassName="!border-0 !bg-transparent !w-full !h-full !text-base !outline-none !shadow-none !px-0 placeholder:text-muted-foreground/50"
                  countrySelectorStyleProps={{
                    buttonClassName: "!border-0 !bg-transparent !p-0 !mr-2 rtl:!mr-0 rtl:!ml-2 !flex !items-center !gap-1",
                    dropdownArrowClassName: "hidden!",
                  }}
                  placeholder="7x xxx xx xx"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email Field */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="text-base font-bold flex items-center gap-1 px-1">
                {t("register_form.email_label")}
                <span className="text-red-500">*</span>
              </FieldLabel>
              
              <div className={cn(
                "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                fieldState.invalid && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
              )}>
                <Mail size={20} className="text-muted-foreground" />
                <div className="h-6 w-px bg-[#E5E5E5] mx-3" />
                <input
                  {...field}
                  type="email"
                  placeholder={t("register_form.email_placeholder")}
                  className="flex-1 h-full text-base bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none px-3 placeholder:text-muted-foreground/50 rtl:text-right"
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

              <div className={cn(
                "relative flex items-center h-14 w-full bg-[#F9F9F9] border border-[#E5E5E5] rounded-full px-4 transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20",
                fieldState.invalid && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
              )}>

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

      {/* Terms and Conditions */}
      <Controller
        name="agreeToTerms"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <div className="flex items-start gap-3 px-2">
              <Checkbox
                id="agreeToTerms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1 data-checked:bg-brand data-checked:border-brand"
              />
              <label htmlFor="agreeToTerms" className="text-sm font-medium text-muted-foreground cursor-pointer leading-relaxed">
                {t("register_form.terms_text")}
              </label>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Register Button */}
      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full h-14 rounded-full bg-brand hover:bg-[#65a100] text-white text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
      >
        {registerMutation.isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {isRtl ? "جاري التحميل..." : "Loading..."}
          </span>
        ) : (
          <>
            <span>{t("register_form.register_btn")}</span>
            <ArrowRight size={22} strokeWidth={2.5} className="rtl:rotate-180" />
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-1" />
        <span className="text-muted-foreground font-medium">{t("login_form.or")}</span>
        <Separator className="flex-1" />
      </div>

      {/* Footer: Login Link */}
      <div className="text-center text-muted-foreground">
        {t("register_form.already_have_account")}{" "}
        <span
          onClick={() => setView("login")}
          className="text-brand font-bold hover:underline underline-offset-4 cursor-pointer"
        >
          {t("register_form.login_now")}
        </span>
      </div>
    </form>
  );
}
