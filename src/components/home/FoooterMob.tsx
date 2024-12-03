import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPhoneVolume,
  FaRegUser,
  FaYoutube,
} from "react-icons/fa";
import { MdNavigateNext, MdOutlineMailOutline } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { footer } from "@/util/data";
import { IoLocationOutline } from "react-icons/io5";
import { LuTwitter } from "react-icons/lu";
const FoooterMob = () => {
  return (
    <div className="bg-gradient-to-t  sm:hidden px-3 w-full py-6 to-primary-800  via-primary-800 from-primary-700 flex-col flex text-white">
      <div className="w-full ">
        <h2 className="text-14">Sign up for News and updates</h2>

        <button className="flex justify-between items-center py-2 mt-2 px-2 border-2 w-full border-white rounded-lg">
          <span className="flex items-center gap-2">
            <FaRegUser color="white" />
            <span className="text-12 sm:text-16">E-mail Address</span>
          </span>
          <MdNavigateNext color="white" />
        </button>
      </div>
      <Accordion type="single" collapsible className="w-full mt-4">
        {footer.map((section) => (
          <AccordionItem
            key={section.name}
            value={section.name.toLowerCase().replace(/\s+/g, "-")}
          >
            <AccordionTrigger className="text-12 sm:text-16">
              {section.name}
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {section.item.map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    {item.icon && (
                      <span className="mr-2">
                        {item.icon === "phone" ? (
                          <FaPhoneVolume className="group-hover:text-blue-400 w-4 h-4 text-white" />
                        ) : item.icon === "location" ? (
                          <IoLocationOutline className="group-hover:text-blue-400 w-4 h-4" />
                        ) : (
                          <MdOutlineMailOutline className="group-hover:text-blue-400 w-4 h-4" />
                        )}
                      </span>
                    )}{" "}
                    <span className="text-primary-50">{item.name}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex w-full justify-between items-center">
        <FaFacebookSquare className="w-[24px] h-[24px] text-blue-800 =" />
        <LuTwitter className="w-[24px] h-[24px] text-blue-400 " />
        <FaInstagram className="w-[24px] h-[24px] text-[#E4405F] transition-colors duration-300" />

        <FaYoutube className="w-[24px] text-red-700 h-[24px] hover " />
      </div>
    </div>
  );
};

export default FoooterMob;
