import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";

export default function StartNowBtn({ className }: { className?: string }) {
  const t = useTranslations("Hero");
  return (
    <Button className={`bg-brand text-black px-8 h-12 lg:h-14 lg:text-lg rounded-full font-bold hover:bg-brand/90 hover:scale-105 transition-all ${className}`}>
      {t("start_now")}
      <TbArrowBigLeftLinesFilled className="ltr:-rotate-180" />
    </Button>
  )
}
