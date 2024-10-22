import React from "react";
import FooterItem from "./FooterItem";
import {
  FaFacebookSquare,
  FaInstagram,
  FaUserAlt,
  FaYoutube,
} from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { LuTwitter } from "react-icons/lu";
import { RiCopyrightLine } from "react-icons/ri";
import { SignUpButton } from "@clerk/nextjs";

const Footer = () => {
  return (
    <>
      <div
        className="bg-gradient-to-t px-3 w-full to-primary-800  via-primary-800 from-primary-700 flex-col flex text-white
      py-[20px] justify-between items-center"
      >
        <div className="flex justify-between w-full items-center">
          <FooterItem />
          <div className="flex flex-col w-fit items-center gap-4">
            <h2 className="font-semibold text-[16px]">
              Sign up for News and updates
            </h2>{" "}
            <SignUpButton>
              <fieldset className="relative border group w-[280px] focus-within:border-blue-700 border-gray-300 px-2 rounded-lg">
                <legend
                  className="text-blue-700 absolute bg-primary-800  -top-3 left-2 text-sm hidden group-focus-within:block
               duration-300 transition-all  px-2"
                >
                  E-mail address
                </legend>
                <div className="flex items-center gap-2">
                  <FaUserAlt className="w-[24px] h-[24px] group-focus-within:text-blue-700" />
                  <input
                    type="text"
                    disabled
                    className="mt-2 p-2 group-focus-within:placeholder:text-blue-700 bg-transparent outline-none rounded-md w-full"
                    placeholder="E-mail Address"
                  />
                  <MdNavigateNext className="w-[34px] h-[34px]" />
                </div>
              </fieldset>
            </SignUpButton>
            <div className="flex w-full justify-between items-center">
              <FaFacebookSquare className="w-[24px] h-[24px] hover:text-blue-800 text-white" />
              <LuTwitter className="w-[24px] h-[24px] hover:text-blue-400 text-white" />
              <FaInstagram className="w-[24px] h-[24px] text-white hover:text-[#E4405F] transition-colors duration-300" />

              <FaYoutube className="w-[24px] hover:text-red-700 h-[24px] hover text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-800 w-full px-[60px] flex justify-between">
        <span className="text-[12px] text-neutral-300 p-2 flex items-center gap-2">
          <RiCopyrightLine /> <span> 2023 Tech Heim. </span>
        </span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-neutral-300 hover:underline underline-offset-2 text-[12px]">
            cookie settings
          </span>
          <span className="text-neutral-300 hover:underline underline-offset-2 text-[12px]">
            Privacy Policy
          </span>
          <span className="text-neutral-300 hover:underline underline-offset-2 text-[12px]">
            Terms and Conditions{" "}
          </span>
          <span className="text-neutral-300 hover:underline underline-offset-2 text-[12px]">
            Imprint
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
