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
import UserSheet from "@/features/auth/components/user-sheet";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");
  const {user}=useAuthStore()

  const navLinks = [
    { href: "/", label: t("home"), icon: TbPentagonMinus },
    { href: "/#packages", label: t("packages"), icon: HiOutlineSquare3Stack3D },
    { href: "/services", label: t("services"), icon: RiLeafLine },
    { href: "/#reviews", label: t("reviews"), icon: TiStarOutline },
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
      className={`fixed top-0 left-0 right-0 z-50 pt-2 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-md" : pathname !=="/" ? "bg-black/50 backdrop-blur-md" : ""}`}
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
              <UserSheet>
                <Button className="h-fit p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-brand hover:text-black transition-all flex items-center gap-2.5 font-bold text-sm lg:text-base group">
                  <Avatar className="size-7 lg:size-9 border border-white/20">
                    <AvatarImage src={user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="bg-brand text-white text-xs">
                      {user.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <FiArrowUpLeft className="size-4 lg:size-5 transition-transform group-hover:rotate-45" />
                </Button>
              </UserSheet>
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
