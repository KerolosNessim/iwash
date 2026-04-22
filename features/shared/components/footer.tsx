import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <div className="relative">
      {/* Floating Social Sidebar  */}
      <div className="hidden lg:flex flex-col items-end gap-2 absolute inset-e-4 bottom-10">
        {/* Text block fixed: using a relative spacer so rotation doesn't break flex alignment */}
        <div className="relative w-14 h-32 flex items-center justify-center">
          <div className="-rotate-90 ltr:rotate-90 absolute whitespace-nowrap ">
            <p className="text-lg font-bold ">{t("contact_us")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="#"
            className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Phone />
          </a>
          <a
            href="#"
            className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <FaWhatsapp size={28} />
          </a>
        </div>
      </div>
      {/* payment */}
      <div className="container py-8 flex items-center justify-center gap-2">
        <h2 className="font-bold ">{t("payment_method")}</h2>
        <div className="w-4 h-[2px] bg-black"></div>
        <Image
          src={"/payments.svg"}
          alt="payment methods"
          width={200}
          height={100}
        />
      </div>

      {/* main footer */}
      <div className="container py-12 border-t border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* logo and  */}
          <div className="flex flex-col gap-4">
            <Image src={"/logo-blue.svg"} alt="logo" width={100} height={100} />
            <p className="text-lg text-gray-600">{t("description")}</p>
            {/* icons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <p className="font-bold">{t("followUs")}</p>
                <div className="h-[2px] w-4 bg-black"></div>
              </div>
              <div className="flex gap-4 mt-2">
                <a
                  href="#"
                  className="hover:text-brand transition-all duration-300 "
                >
                  <FaSnapchatGhost size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-brand transition-all duration-300 "
                >
                  <FaTiktok size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-brand transition-all duration-300 "
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-brand transition-all duration-300 "
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-brand">{t("quickLinks")}</h3>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {t("links.home")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {t("links.services")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  {t("links.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* working hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-brand">
              {t("workingHours")}
            </h3>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="flex flex-col">
                <span className="font-semibold">{t("days.satThu")}</span>
                <span>{t("time.weekdays")}</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="font-semibold">{t("days.fri")}</span>
                <span>{t("time.friday")}</span>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-brand">{t("contact")}</h3>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <span className="font-semibold">{t("email")}:</span>{" "}
                <a href="mailto:info@iwash.qa" className="hover:text-brand">
                  info@iwash.qa
                </a>
              </li>
              <li>
                <span className="font-semibold">{t("phone")}:</span>{" "}
                <a href="tel:+97412345678" className="hover:text-brand">
                  +974 1234 5678
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="container text-sm  py-6 flex items-center justify-between text-center">
        <p className="text-gray-500 font-medium">
          © {new Date().getFullYear()} iWash. {t("rights")}
        </p>

        <div className="flex items-center gap-2 text-gray-600">
          <a href="#" className="hover:text-brand transition-colors">
            {t("terms")}
          </a>
          <div className="size-1  bg-gray-400 rounded-full"></div>
          <a href="#" className="hover:text-brand transition-colors">
            {t("privacy")}
          </a>
        </div>
      </div>
    </div>
  );
}
