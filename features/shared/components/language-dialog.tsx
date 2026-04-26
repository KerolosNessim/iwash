"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface LanguageDialogProps {
  children: React.ReactNode;
}

export default function LanguageDialog({ children }: LanguageDialogProps) {
  const t = useTranslations("UserSheet");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      router.push(segments.join("/"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-[400px] rounded-[2.5rem] p-6 border-none shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
          <DialogTitle className="text-lg font-bold">{t("language")}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="size-8 rounded-full bg-gray-50">
              <X size={16} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-3">
          {/* Arabic Option */}
          <button
            onClick={() => handleLanguageChange("ar")}
            disabled={isPending}
            className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all duration-300 ${
              locale === "ar" 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-gray-50 text-gray-900 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {locale === "ar" && <CheckCircle2 size={20} />}
              <span className="font-bold">اللغة العربية</span>
            </div>
          </button>

          {/* English Option */}
          <button
            onClick={() => handleLanguageChange("en")}
            disabled={isPending}
            className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all duration-300 ${
              locale === "en" 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-gray-50 text-gray-900 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {locale === "en" && <CheckCircle2 size={20} />}
              <span className="font-bold">اللغة الانجليزية</span>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
