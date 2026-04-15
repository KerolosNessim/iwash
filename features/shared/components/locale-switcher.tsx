"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: string) => {
    // استخدم startTransition لتأخير التبديل حتى ينتهي التفاعل مع اللغة
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = newLocale; // أول segment هو اللغة
      router.push(segments.join("/"));
    });
  };

  return (
    <Select
      dir={locale === "ar" ? "rtl" : "ltr"}
      onValueChange={handleChange}
      defaultValue={locale}
      disabled={isPending}
    >
      <SelectTrigger
        className="bg-transparent border-none shadow-none text-white font-bold"
        arrowColor="text-white"
      >
        <Globe className="size-5" />
        {locale === "ar" ? "AR" : "EN"}
      </SelectTrigger>
      <SelectContent position="popper" dir={locale === "ar" ? "rtl" : "ltr"}>
        <SelectItem value="ar" className="flex items-center gap-2 ">
          <p className="font-bold">AR</p>
          <p>العربية</p>
        </SelectItem>
        <SelectItem value="en" className="flex items-center gap-2 ">
          <p className="font-bold">EN</p>
          <p>English</p>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
