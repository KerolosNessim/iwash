"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  BellOff,
  Camera,
  ChevronLeft,
  ClipboardList,
  Globe,
  LogOut,
  MessageCircle,
  Package,
  Trash2,
  X
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";
import { useLogout } from "../hooks/useLogout";

import LanguageDialog from "@/features/shared/components/language-dialog";
import { FaApple, FaGooglePlay, FaWhatsapp } from "react-icons/fa";

interface UserSheetProps {
  children: React.ReactNode;
}

export default function UserSheet({ children }: UserSheetProps) {
  const t = useTranslations("UserSheet");
  const s = useTranslations("auth");
  
  const { user } = useAuthStore();
  const { mutate: handleLogout, isPending: isLoggingOut } = useLogout();

  if (!user) return <>{children}</>;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        showCloseButton={false}
        side={"left"}
        className="w-full sm:max-w-lg p-0 border-none   overflow-y-auto scrollbar-hide ltr:rounded-e-[3rem] rtl:rounded-s-[3rem]"
      >
        <div className="p-4 space-y-6">
          <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
            <SheetTitle className="text-xl font-bold">{t("title")}</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X size={20} />
              </Button>
            </SheetClose>
          </SheetHeader>

          {/* User Profile Section */}
          <div className="space-y-2">
            <p className="text-brand font-bold text-xs px-2">
              {t("user_label")}
            </p>
            <div className="bg-gray-50 p-4 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Avatar className="size-16 border-2 border-white shadow-sm">
                    <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                    <AvatarFallback className="bg-brand text-white text-xl">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white size-6 rounded-full shadow-md flex items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera size={12} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p dir="ltr" className="text-gray-500 text-sm font-medium">
                    {user?.phone}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-300">
                <ChevronLeft className="rtl:rotate-0 rotate-180" size={20} />
              </Button>
            </div>
          </div>

          {/* Booking Section */}
          <div className="space-y-2">
            <p className="text-brand font-bold text-xs px-2">
              {t("bookings_label")}
            </p>
            <div className="bg-gray-50 p-2 rounded-3xl space-y-1">
              <Link
                href="/my-bookings"
                className="flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white size-10 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gray-50">
                    <ClipboardList size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {t("my_bookings")}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-loose">
                      {t("my_bookings_desc")}
                    </p>
                  </div>
                </div>
                <ChevronLeft
                  className="rtl:rotate-0 rotate-180 text-gray-300"
                  size={18}
                />
              </Link>

              <Link
                href="/my-packages"
                className="flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white size-10 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gray-50">
                    <Package size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      {t("my_packages")}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-loos">
                      {t("my_packages_desc")}
                    </p>
                  </div>
                </div>
                <ChevronLeft
                  className="rtl:rotate-0 rotate-180 text-gray-300"
                  size={18}
                />
              </Link>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="space-y-2">
            <p className="text-brand font-bold text-xs px-2">
              {t("account_settings")}
            </p>
            <div className="bg-gray-50 p-2 rounded-3xl space-y-1">
              <LanguageDialog>
                <button className="w-full flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-gray-900" />
                    <p className="font-bold text-sm text-gray-900">
                      {t("language")}
                    </p>
                  </div>
                  <ChevronLeft
                    className="rtl:rotate-0 rotate-180 text-gray-300"
                    size={18}
                  />
                </button>
              </LanguageDialog>

              <div className="flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors">
                <div className="flex items-center gap-3">
                  <BellOff size={20} className="text-gray-900" />
                  <p className="font-bold text-sm text-gray-900">
                    {t("notifications")}
                  </p>
                </div>
                <Switch dir="ltr" className="data-[state=checked]:bg-brand" />
              </div>

              <button
                onClick={() => handleLogout()}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <LogOut
                    size={20}
                    className="text-gray-900 group-hover:text-red-500 transition-colors"
                  />
                  <p className="font-bold text-sm text-gray-900 group-hover:text-red-500 transition-colors">
                    {t("logout")}
                  </p>
                </div>
                {isLoggingOut ? (
                  <div className="size-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ChevronLeft
                    className="rtl:rotate-0 rotate-180 text-gray-300"
                    size={18}
                  />
                )}
              </button>

              <button className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <Trash2 size={20} className="text-red-500" />
                  <p className="font-bold text-sm text-red-500">
                    {t("delete_account")}
                  </p>
                </div>
                <ChevronLeft
                  className="rtl:rotate-0 rotate-180 text-red-300"
                  size={18}
                />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-2">
            <p className="text-brand font-bold text-xs px-2">{t("support")}</p>
            <div className="bg-gray-50 p-2 rounded-3xl">
              <Link
                href="#"
                target="_blank"
                className="flex items-center justify-between p-3 hover:bg-white rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FaWhatsapp size={16} className="text-gray-900" />
                  <p className="font-bold text-sm text-gray-900">
                    {t("contact_whatsapp")}
                  </p>
                </div>
                <ChevronLeft
                  className="rtl:rotate-0 rotate-180 text-gray-300"
                  size={18}
                />
              </Link>
            </div>
          </div>

          {/* Footer App Download Section */}
          <div className="pt-4 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-900 font-bold">
              <div className="h-px bg-gray-200 flex-1" />
              <div className="flex items-center gap-2">
                <span className="text-sm">{t("download_app")}</span>
              </div>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className=" flex flex-col sm:flex-row items-center gap-3 justify-center ">
              {/* Google Play */}
              <a
                href="#"
                className=" flex items-center gap-3 bg-gray-100 border border-[#E5E5E5] rounded-2xl px-6 py-2.5 shadow-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto "
              >
                <FaGooglePlay className="text-3xl text-[#5F6368]" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[8px] text-muted-foreground uppercase whitespace-nowrap">
                    {s("register_success.download_on_the")}
                  </span>
                  <span className="text-sm font-bold text-[#5F6368] whitespace-nowrap">
                    Google Play
                  </span>
                </div>
              </a>

              {/* Apple Store */}
              <a
                href="#"
                className=" flex items-center gap-3 bg-black rounded-2xl px-6 py-2.5 shadow-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto "
              >
                <FaApple className="text-3xl text-white" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[8px] text-white/70 uppercase whitespace-nowrap">
                    {s("register_success.download_on_the")}
                  </span>
                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    Apple Store
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
