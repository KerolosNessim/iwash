"use client";

import { Clock, Phone } from "lucide-react";
import Image from "next/image";
import LocaleSwitcher from "./locale-switcher";

import { Button } from "../../../components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { FiArrowUpLeft } from "react-icons/fi";
import {
  HiMiniBars3CenterLeft,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { RiLeafLine } from "react-icons/ri";
import { TbPentagonMinus } from "react-icons/tb";
import { TiStarOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import NavbarSheet from "./navbar-sheet";
import { useTranslations } from "next-intl";
import LoginDialog from "@/features/auth/components/login-dialog";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");
  const {user}=useAuthStore()

  const navLinks = [
    { href: "/", label: t("home"), icon: TbPentagonMinus },
    { href: "/packages", label: t("packages"), icon: HiOutlineSquare3Stack3D },
    { href: "/services", label: t("services"), icon: RiLeafLine },
    { href: "/reviews", label: t("reviews"), icon: TiStarOutline },
    { href: "/blog", label: t("blog"), icon: HiMiniBars3CenterLeft },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pt-2 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-md" : ""}`}
    >
      {/* Top Bar */}
      <div className="container  flex items-center justify-between pb-2">
        {/* Contact Info (RTL right aligned) */}
        <div className="flex items-center gap-4">
          <p className="text-white flex items-center gap-2 text-sm font-medium">
            {t("daily_from")}
            <Clock className="size-4 text-brand" />
          </p>

          <div className="size-1 rounded-full bg-white/50"></div>

          <p className="text-white flex items-center gap-2 text-sm font-medium">
            <span dir="ltr">+974 7711 6741</span>
            <Phone className="size-4 text-brand" />
          </p>
        </div>

        {/* Locale Switcher (RTL left aligned) */}
        <LocaleSwitcher />
      </div>

      {/* Bottom Bar */}
      <div className=" border-t border-b border-white/10 ">
        <div className="container  flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={90}
                height={45}
                className="w-auto h-10 lg:h-12"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2 xl:gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full font-bold transition-all duration-300 text-sm xl:text-base ${
                        active ? "text-brand" : "text-white hover:text-brand"
                      }`}
                    >
                      {link.label}
                      <Icon className="size-5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Call Button */}
            <Button className="size-10 lg:size-12 bg-brand text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(151,204,4,0.39)]">
              <Phone className="size-4 lg:size-5" />
            </Button>

            {/* Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-10 lg:h-12 pl-1.5 pr-4 lg:pr-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-brand hover:text-black transition-all flex items-center gap-2.5 font-bold text-sm lg:text-base group">
                    <Avatar className="size-7 lg:size-9 border border-white/20">
                      <AvatarImage src={user.avatar || ""} alt={user.name} />
                      <AvatarFallback className="bg-brand text-white text-xs">
                        {user.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <FiArrowUpLeft className="size-4 lg:size-5 transition-transform group-hover:rotate-45" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-64 mt-3 rounded-[1.5rem] border-white/20 bg-black/40 backdrop-blur-2xl text-white p-2 shadow-2xl overflow-hidden"
                >
                  <DropdownMenuLabel className="p-4 pt-3">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-bold leading-none text-brand uppercase tracking-wider">{user.name}</p>
                      <p className="text-xs leading-none text-white/40 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10 mx-2" />
                  <div className="p-1">
                    <DropdownMenuItem className="flex items-center gap-3 p-3 focus:bg-white/10 focus:text-white cursor-pointer rounded-xl font-semibold transition-all">
                      <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-brand" />
                      </div>
                      <span>{t("profile")}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 p-3 focus:bg-white/10 focus:text-white cursor-pointer rounded-xl font-semibold transition-all">
                      <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-brand" />
                      </div>
                      <span>{t("settings")}</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10 mx-2" />
                  <div className="p-1">
                    <DropdownMenuItem 
                      onClick={async () => {
                        const { logout } = useAuthStore.getState();
                        const { removeAuthToken } = await import("@/features/auth/actions");
                        logout();
                        await removeAuthToken();
                        toast.success(t("logout_success"));
                      }}
                      className="flex items-center gap-3 p-3 focus:bg-red-500/20 focus:text-red-500 text-red-400 cursor-pointer rounded-xl font-semibold transition-all"
                    >
                      <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <LogOut className="h-4 w-4" />
                      </div>
                      <span>{t("logout")}</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginDialog>
                <Button className="h-10 lg:h-12 px-4 lg:px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 font-bold text-sm lg:text-base">
                  {t("login")}
                  <FiArrowUpLeft className="size-4 lg:size-5" />
                </Button>
              </LoginDialog>
            )}

            {/* mobile menu */}
            <NavbarSheet navLinks={navLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
