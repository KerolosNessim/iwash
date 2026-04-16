import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';

interface NavbarSheetProps {
  navLinks: { href: string; label: string; icon: React.ElementType }[];
}

export default function NavbarSheet({ navLinks }: NavbarSheetProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden size-10 lg:size-12 bg-brand text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(151,204,4,0.39)]">
          <HiMiniBars3CenterLeft className="size-4 lg:size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "right" : "left"}
        className="bg-black/50 backdrop-blur-md border-none rounded-e-lg"
      >
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="block w-fit mx-auto">
              <Image
                src="/logo.svg"
                alt="logo"
                width={90}
                height={45}
                className="size-30"
              />
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("sheet_description")}
          </SheetDescription>
          <nav className="mt-8">
            <ul className="flex flex-col items-center gap-2 xl:gap-6">
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
