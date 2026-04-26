"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CarFront,
  Clock,
  CreditCard,
  Info,
  MapPin,
  Palette,
  UserCheck,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useBookingSetup } from "../hooks/useBookingSetup";
import { useAddBooking } from "../hooks/useAddBooking";
import { PackageItem } from "@/features/home/types";
import { BookingPayload } from "../types";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { toast } from "sonner";
import LoginDialog from "@/features/auth/components/login-dialog";
import { LogIn } from "lucide-react";

interface BookingFormProps {
  packageItem: PackageItem;
  washType: "external" | "both";
  isSubscription: boolean;
}

export default function BookingForm({
  packageItem,
  washType,
  isSubscription,
}: BookingFormProps) {
  const t = useTranslations("booking");
  const tAuth = useTranslations("auth.register_form");
  const { areas, car_models, car_colors, isLoading } = useBookingSetup();
  const { mutate: addBooking, isPending } = useAddBooking();
  const { user } = useAuthStore();

  const formSchema = z.object({
    name: z.string().min(1, { message: t("form.required") }),
    phone: z.string().min(1, { message: t("form.required") }),
    location: z.string().min(1, { message: t("form.required") }),
    date: z.date({ message: t("form.required") }),
    time: z.string().min(1, { message: t("form.required") }),
    plateNumber: z.string().min(1, { message: t("form.required") }),
    carType: z.string().min(1, { message: t("form.required") }),
    carColor: z.string().min(1, { message: t("form.required") }),
  });

  type BookingValues = z.infer<typeof formSchema>;

  const form = useForm<BookingValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      time: "",
      plateNumber: "",
      carType: "",
      carColor: "",
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="size-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  function onSubmit(data: BookingValues) {
    if (isSubscription && !user) {
      toast.error(t("must_login_for_subscription"));
      return;
    }

    const payload: BookingPayload = {
      booking_type: isSubscription ? "monthly" : "single",
      service_type: washType === "both" ? "internal" : "external",
      area_id: parseInt(data.location),
      car_model_id: parseInt(data.carType),
      car_color_id: parseInt(data.carColor),
      service_package_id: packageItem.id,
      plate_number: data.plateNumber,
      booking_date: format(data.date, "yyyy-MM-dd"),
      booking_time: data.time,
      guest_name: data.name,
      guest_phone: data.phone,
    };
    console.log({ payload });

    addBooking(payload);
  }

  return isSubscription && !user ? (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl text-sm font-medium border border-orange-100 flex items-center gap-2">
        <Info size={18} />
        {t("must_login_for_subscription")}
      </div>
      <LoginDialog>
        <Button
          type="button"
          className="w-fit h-14! flex items-center justify-center gap-3 mx-auto rounded-full px-12 text-lg font-bold bg-brand text-white hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
        >
          {tAuth("login_now")}
          <LogIn size={22} />
        </Button>
      </LoginDialog>
    </div>
  ) : (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 py-4 px-1"
    >
      {/* Section 1: Customer Data */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-bold">
            <UserCheck className="text-gray-900" size={20} />
            <span>{t("customer_data")}</span>
            <span className="text-red-500">*</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm ">
            <Info size={16} />
            <span>{t("booking_whatsapp_note")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F7F6F9] p-4 rounded-3xl">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-1 px-1 text-right w-full">
                  <span className="text-red-500">*</span> {t("form.name_label")}
                </FieldLabel>
                <div className="relative">
                  <input
                    {...field}
                    placeholder={t("form.name_placeholder")}
                    className={cn(
                      "h-12 w-full bg-white rounded-full px-6 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm",
                      fieldState.invalid &&
                        "border-destructive focus:ring-destructive/20",
                    )}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-1 px-1 text-right w-full">
                  <span className="text-red-500">*</span>{" "}
                  {t("form.phone_label")}
                </FieldLabel>
                <div
                  dir="ltr"
                  className={cn(
                    "h-12 w-full bg-white  rounded-full px-4 flex items-center transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/50",
                    fieldState.invalid &&
                      "border-destructive focus-within:ring-destructive/20",
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* Section 2: Location, Date, Time */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <MapPin className="text-gray-900" size={20} />
          <span>{t("location_date_time")}</span>
          <span className="text-red-500">*</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location */}
          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span>{" "}
                  {t("form.location_label")}{" "}
                  <MapPin size={18} className="text-red-500" />
                </FieldLabel>
                <div className="bg-[#F7F6F9] p-3 rounded-xl">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-12! w-full bg-white rounded-full px-6 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <SelectValue
                        placeholder={t("form.location_placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={area.id.toString()}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Date */}
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span> {t("form.date_label")}{" "}
                  <CalendarIcon size={18} className="text-green-500" />
                </FieldLabel>
                <Popover>
                  <div className="bg-[#F7F6F9] p-3 rounded-xl">
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-12! w-full! rounded-full bg-white border-none px-6 flex items-center justify-start hover:bg-white active:bg-white focus-visible:bg-white  font-normal text-sm",
                          !field.value && "text-muted-foreground",
                          fieldState.invalid && "border-destructive",
                        )}
                      >
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("form.date_placeholder")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Time */}
          <Controller
            name="time"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span> {t("form.time_label")}{" "}
                  <Clock size={18} className="text-blue-500" />
                </FieldLabel>
                <div className="relative bg-[#F7F6F9] p-3 rounded-xl">
                  <input
                    {...field}
                    type="time"
                    className={cn(
                      "h-12! w-full! bg-white border-none rounded-full px-6 focus:outline-none focus:border-brand transition-all text-sm",
                      fieldState.invalid && "border-destructive",
                    )}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* Section 3: Car Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <CarFront className="text-gray-900" size={20} />
          <span>{t("car_details")}</span>
          <span className="text-red-500">*</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Plate Number */}
          <Controller
            name="plateNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span>{" "}
                  {t("form.plate_number_label")}{" "}
                  <CreditCard size={18} className="text-orange-500" />
                </FieldLabel>
                <div className="bg-[#F7F6F9] p-3 rounded-xl">
                  <input
                    {...field}
                    placeholder={t("form.plate_number_placeholder")}
                    className={cn(
                      "h-12! w-full! bg-white rounded-full px-6 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm",
                      fieldState.invalid && "border-destructive",
                    )}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Car Type */}
          <Controller
            name="carType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span>{" "}
                  {t("form.car_type_label")}{" "}
                  <Zap size={18} className="text-yellow-500" />
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="bg-[#F7F6F9] p-3 rounded-xl">
                    <SelectTrigger
                      className={cn(
                        "h-12! w-full bg-white rounded-full px-6 border-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <SelectValue
                        placeholder={t("form.car_type_placeholder")}
                      />
                    </SelectTrigger>
                  </div>
                  <SelectContent position="popper">
                    {car_models.map((model) => (
                      <SelectItem key={model.id} value={model.id.toString()}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Car Color */}
          <Controller
            name="carColor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="font-bold flex items-center  gap-2 px-1 text-right w-full">
                  <span className="text-red-500">*</span>{" "}
                  {t("form.car_color_label")}{" "}
                  <Palette size={18} className="text-blue-400" />
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="bg-[#F7F6F9] p-3 rounded-xl">
                    <SelectTrigger
                      className={cn(
                        "h-12! w-full bg-white rounded-full px-6 border-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm",
                        fieldState.invalid && "border-destructive",
                      )}
                    >
                      <SelectValue
                        placeholder={t("form.car_color_placeholder")}
                      />
                    </SelectTrigger>
                  </div>
                  <SelectContent position="popper">
                    {car_colors.map((color) => (
                      <SelectItem key={color.id} value={color.id.toString()}>
                        <div className="flex items-center gap-2">
                          <div
                            className="size-4 rounded-full border border-gray-100"
                            style={{ backgroundColor: color.color_code }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* Submit Button */}

      <Button
        type="submit"
        disabled={isPending}
        className="w-fit h-12! flex items-center justify-center gap-2 mx-auto rounded-full px-12 text-lg font-bold hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-[0.98] disabled:opacity-70"
      >
        {isPending ? (
          <>
            {t("form.loading") || "Loading..."}
            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </>
        ) : (
          <>
            {t("form.submit")}
            <ArrowRight size={20} className="rtl:rotate-180" />
          </>
        )}
      </Button>
    </form>
  );
}
