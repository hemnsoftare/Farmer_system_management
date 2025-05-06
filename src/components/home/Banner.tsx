import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { lang } from "@/lib/action/uploadimage";
const Banner = () => {
  const t = useTranslations("banner");
  const l = lang().startsWith("ar") || lang().startsWith("ku");
  return (
    <div className="bg-[#223949] dark:bg-[#18232E] relative w-full sm:max-w-[1000px] self-center duration-200 transition-all shadow-md sm:hover:shadow-lg sm:hover:shadow-[#223949] dark:sm:hover:shadow-[#18232E] shadow-[#223949] dark:shadow-[#18232E]  md:px-[25px] lg:px-[100px] h-[250px] sm:h-[420px] py-8 sm:py-12 rounded-md flex overflow-hidden items-center justify-between">
      <div className="flex justify-between sm:gap-7 gap-4 w-full items-center flex-col">
        <motion.h1
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="lg:text-[44px] md:text-34 font-semibold uppercase text-white dark:text-gray-200"
        >
          {/* {t("smartWatch")} */}
          Raise the Pride of the Farm
        </motion.h1>
        <motion.p
          initial={{ x: 300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="lg:text-[24px] w-[130px] sm:w-full md:text-20 text-14 text-center text-white dark:text-gray-300"
        >
          {t("variousDesignsAndBrands")}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="px-12 ml-3 mt-5 sm:hover:bg-secondary-600 duration-300 transition-all py-[6px] text-[16px] font-bold text-[#223949] dark:text-[#18232E] rounded-md bg-secondary-400 dark:bg-secondary-500"
        >
          <Link href={"#"}>{t("view")}</Link>
        </motion.button>
      </div>
      <motion.div
        initial={{ x: 80 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="z-[2]"
      >
        <Image
          src={"threeOclock.svg"}
          alt=""
          width={500}
          height={328}
          className="z-[2] max-w-[200px] h-[150px] md:max-w-[400px] md:min-h-[450px]"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
        className={`absolute dark:hidden w-1/2  ${
          l
            ? "left-[10px] md:left-[50px] lg:-left-[50px]  top-auto rotate-180"
            : "-right-[10px] md:-right-[50px] lg:-right-[50px] top-auto"
        }  h-full `}
      >
        <Image
          src={"shape3.svg"}
          alt=""
          width={533}
          height={250}
          className="w-full h-full"
        />
      </motion.div>
      <motion.div className="dark:block absolute scale-[1.5] hidden -right-[210px] h-full md:-right-[50px] lg:-right-[50px] rounded-l-full top-auto bg-secondary-500 min-w-[300px] max-w-[300px]"></motion.div>
    </div>
  );
};

export default Banner;
