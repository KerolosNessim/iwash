"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center space-y-10 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-brand/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-brand/5 blur-[120px] rounded-full" />

      {/* Icon Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
          <AlertCircle size={80} className="text-brand" />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-2xl space-y-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto font-light">
          {t("description")}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 relative z-10">
        <Button
          onClick={() => window.location.reload()}
          className="h-16 px-12 rounded-full bg-brand text-black font-bold text-xl hover:bg-brand/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(151,204,4,0.3)]"
        >
          <RotateCcw size={24} />
          {t("retry")}
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="h-16 px-12 rounded-full border-white/10 bg-white/5 text-white font-bold text-xl hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center gap-3 backdrop-blur-md"
        >
          <Link href="/">
            <Home size={24} />
            {t("go_home")}
          </Link>
        </Button>
      </div>
      

    </div>
  );
}
