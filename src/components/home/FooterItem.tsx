"use client";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { footerProps } from "@/lib/action";
import { useTranslations } from "next-intl";
const FooterItem = ({ lang }: { lang: boolean }) => {
  const t = useTranslations("footer");
  const footer: footerProps[] = [
    {
      name: t("company"),
      item: [
        { name: t("about_us") },
        { name: t("contact_us") },
        { name: t("returns") },
        { name: t("order_status") },
      ],
    },
    {
      name: t("info"),
      item: [
        { name: t("how_it_works") },
        { name: t("our_promises") },
        { name: t("faq") },
      ],
    },
    {
      name: t("contact_us"),
      item: [
        { name: t("address"), icon: "location" },
        { name: t("phone"), icon: "phone" },
        { name: t("email"), icon: "eamil" },
      ],
    },
  ];
  return (
    <div className="flex justify-between flex-1 mx-6   items-center lg:gap-8 md:gap-4">
      {footer.map((items) => (
        <div
          key={items.name}
          className="flex justify-between md:text-14 min-w-[270px] max-w-[270px]  lg:text-16 flex-col gap-2 text-white"
        >
          <h2
            className={`text-[16px] w-full ${lang ? "text-right " : "text-left "} font-semibold`}
          >
            {items.name}
          </h2>
          {items.item.map((data) => (
            <p
              key={data.name}
              className={`flex items-center ${lang ? "flex-row" : "flex-row "}   md:text-8 lg:text-10 group cursor-pointer hover:underline hover:text-blue-400 hover:underline-offset-4 w-full   gap-2`}
            >
              {data.icon && (
                <p className="mr-2">
                  {data.icon === "phone" ? (
                    <FaPhoneVolume className="group-hover:text-blue-400 w-4 h-4 text-white" />
                  ) : data.icon === "location" ? (
                    <IoLocationOutline className="group-hover:text-blue-400 w-4 h-4" />
                  ) : (
                    <MdOutlineMailOutline className="group-hover:text-blue-400 w-4 h-4" />
                  )}
                </p>
              )}
              <p
                className={`text-[14px] w-full ${lang ? "text-right " : "text-left "} `}
              >
                {data.name}
              </p>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterItem;
