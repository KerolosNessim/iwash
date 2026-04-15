"use client";

import { Clock, Phone } from "lucide-react";
import Image from "next/image";
import LocaleSwitcher from "./locale-switcher";

import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { FiArrowUpLeft } from "react-icons/fi";
import {
  HiMiniBars3CenterLeft,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { RiLeafLine } from "react-icons/ri";
import { TbPentagonMinus } from "react-icons/tb";
import { TiStarOutline } from "react-icons/ti";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "الرئيسية", icon: TbPentagonMinus },
    { href: "/packages", label: "البـــاقات", icon: HiOutlineSquare3Stack3D },
    { href: "/services", label: "خدماتنـــا", icon: RiLeafLine },
    { href: "/reviews", label: "اراء عملائنا!", icon: TiStarOutline },
    { href: "/blog", label: "المدونه", icon: HiMiniBars3CenterLeft },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-5">
      {/* top bar */}
      <div className="container flex items-center justify-between">
        {/* info */}
        <div className="flex items-center gap-3">
          <p className="text-white flex items-center gap-2 text-sm">
            يوميـــــــا من : 07:00 - 23:00
            <Clock className="size-4 text-brand" />
          </p>

          <div className="size-1 rounded-full bg-white/50"></div>

          <p className="text-white flex items-center gap-2 text-sm">
            <span dir="ltr">+974 7711 6741</span>
            <Phone className="size-4 text-brand" />
          </p>
        </div>

        {/* locale switcher */}
        <LocaleSwitcher />
      </div>

      {/* bottom bar */}
      <div className="container flex items-center justify-between py-3 mt-3 border-t border-b border-white/10">
        {/* logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={80} height={80} />
        </div>

        {/* nav links */}
        <nav>
          <ul className="flex items-center gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                      active
                        ? " text-brand "
                        : "text-white hover:text-brand"
                    }`}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* buttons */}
        <div className="flex items-center gap-2">
          {/* call */}
          <Button className="size-12 bg-brand text-black rounded-full hover:scale-105 transition">
            <Phone className="size-4" />
          </Button>

          {/* login */}
          <Button className="h-12 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition flex items-center gap-2">
            تسجيل الدخول
            <FiArrowUpLeft />
          </Button>
        </div>
      </div>
    </div>
  );
}
