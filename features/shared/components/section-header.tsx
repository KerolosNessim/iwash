
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  title?: string;
  highlight?: string;
  description?: string;
  icon?: ReactNode;
  badgeText?: string;

  // colors
  highlightColor?: string;
  textColor?: string;
  descriptionColor?: string;
  badgeColor?: string;

  className?: string;
  alignment?: "center" | "start" ;
};

export default function SectionHeader({
  title = "اضمن غسيل سيارتك",
  highlight = "",
  description = "",
  icon,
  badgeText = "باقاتنا!",

  highlightColor = "text-brand",
  textColor = "text-black",
  descriptionColor = "text-gray-500",
  badgeColor = "bg-brand",

  className,
  alignment = "start",
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center text-center gap-2 ",
        alignment === "start" && "items-start text-start",
        className,
      )}
    >
      {/* Badge */}
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <div className={cn("w-4 h-[2px]", badgeColor)}></div>
        {badgeText && <span className={cn("font-semibold")}>{badgeText}</span>}
      </div>

      {/* Title */}
      <h1
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold leading-snug",
          textColor,
        )}
      >
        {title} <span className={cn(highlightColor)}>{highlight}</span>
      </h1>

      {/* Description */}
      <p className={cn("max-w-xl text-sm md:text-base", descriptionColor)}>
        {description}
      </p>
    </div>
  );
}
