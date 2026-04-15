import { Button } from "@/components/ui/button";
import { LucideClipboardCheck } from "lucide-react";
import Image from "next/image";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { RiFlashlightLine } from "react-icons/ri";
import { FaHandHoldingUsd } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div className="bg-[url('/hero-1.png')]  bg-cover bg-center bg-no-repeat ">
      <div className="bg-linear-to-l from-black/90 via-black/70 to-black/50  min-h-[110vh] flex flex-col items-center justify-end ">
        <div className="container ">
          {/* main flex */}
          <div className="flex lg:items-center lg:justify-between max-lg:gap-6 max-lg:flex-col h-full">
            {/* content */}
            <div className="space-y-6">
              {/* label */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-brand "></div>
                <p className="text-white lg:text-lg ">
                  ✨ خدمة مصممة لسيارتك... في مكانك.
                </p>
              </div>
              {/* title */}
              <h1 className="text-white lg:text-6xl text-5xl font-bold leading-snug">
                سيــــــارتك نظيفة ..
                <br />
                <span className="text-brand">دون مغادرة </span>
                مكانك !
              </h1>
              {/* description */}
              <p className="text-gray-400 lg:text-lg">
                خدمة احترافية تصل إليك في دقائق دون الحاجة للتحرك وانتظار
                الطوابير الطويلة.
              </p>
              {/* buttons */}
              <div className="flex items-center gap-4 ">
                <Button className="bg-brand text-black px-12 lg:h-12 h-10 lg:text-lg  rounded-full font-bold">
                  ابدأ التجربة الآن <TbArrowBigLeftLinesFilled />
                </Button>
                <Button className="bg-white text-gray-500 px-12 lg:h-12 h-10 lg:text-lg  rounded-full font-bold">
                  اطّلع على البـــاقات
                  <HiOutlineSquare3Stack3D />
                </Button>
              </div>
            </div>

            {/* social and counter */}
            <div className="lg:space-y-12 space-y-6 max-lg:w-fit max-lg:mx-auto ">
              {/* social */}
              <div className="flex lg:flex-col flex-row items-center lg:justify-center lg:gap-12 gap-4  w-fit lg:ms-auto">
                <p className="lg:-rotate-90 text-lg font-bold text-white flex items-center gap-2">
                  تابعنا على ــــــــــــــ
                </p>
                <div className="space-y-2 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:gap-4">
                  <a
                    href="#"
                    className="w-15 h-15 rounded-full bg-white flex items-center justify-center"
                  >
                    <Image
                      src="/instagram.svg"
                      alt="instagram"
                      width={24}
                      height={24}
                      className="w-9 h-9"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-15 h-15 rounded-full bg-white flex items-center justify-center"
                  >
                    <Image
                      src="/facebook.svg"
                      alt="facebook"
                      width={24}
                      height={24}
                      className="w-9 h-9"
                    />
                  </a>
                </div>
              </div>
              {/* counter */}
              <div>
                <p className="text-gray-300">أرقــامنــــــا : </p>
                <div className="flex items-center gap-6 ">
                  <div className="flex flex-col gap-2">
                    <div className="text-white  font-bold flex items-end ">
                      <p className="text-lg">k</p>
                      <p className="text-5xl">10</p>
                      <p className="text-lg self-center">+</p>
                    </div>
                    <p className="text-gray-300 ">عدد عملاؤنا</p>
                  </div>
                  <div className="w-px h-8 bg-gray-400"></div>
                  <div className="flex flex-col gap-2">
                    <div className="text-white  font-bold flex items-end ">
                      <p className="text-lg">k</p>
                      <p className="text-5xl">47</p>
                      <p className="text-lg self-center">+</p>
                    </div>
                    <p className="text-gray-300 ">عدد الطلبات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* features */}
        <div className="container flex items-center justify-between  self-end mt-20 mb-10">
          <div className="flex items-center gap-2 text-white">
            <LucideClipboardCheck className="size-12 " />
            <p className=" text-lg font-bold">حجز فوري</p>
          </div>
          <div className="flex items-center gap-2 text-white">
            <RiFlashlightLine className="size-12" />
            <p className=" text-lg font-bold">حجز فوري</p>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FaHandHoldingUsd className="size-12" />
            <p className=" text-lg font-bold">سرعة فائقة</p>
          </div>
        </div>
      </div>
    </div>
  );
}
