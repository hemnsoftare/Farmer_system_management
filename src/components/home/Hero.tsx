import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <>
      {/* <div className="relative md:hidden h-screen overflow-hidden flex flex-col w-screen ">
        <div className="absolute sm:relative sm:w-1/2 w-full py-4 h-full flex flex-col items-center justify-center gap-8 z-[2] bg-opacity-50 sm:bg-transparent">
          <h1 className="text-white lg:text-35 xl:text-45 text-24 md:text-29 font-bold capitalize text-center">
            Tech Heim
          </h1>
          <h3 className="font-[500] text-neutral-200 sm:text-neutral-500 text-19 md:text-20 lg:text-24 text-center w-full">
            &quot;Join
            <span className="text-secondary">
              {" "}
              the digital <br className="hidden lg:block" /> revolution&quot;
            </span>
          </h3>

          <Link href={"#newProducts"}>
            <button className="capitalize px-7 py-2 text-12 lg:text-16 sm:text-20 bg-secondary text-white rounded-lg sm:mt-0 mt-4 lg:hover:bg-red-800 transition-all duration-300">
              explore more
            </button>
          </Link>
        </div>

        {/* Image Section */}
      {/* Background Image for Mobile 
        <Image
          src={"/heroN.png"}
          alt="image hero"
          width={100}
          height={550}
          className="  w-full  scale-x-[1.8] h-screen sm:hidden"
        />
      </div> 
      */}
      <motion.div className="flex sm:mt-12 relative md:flex-row m-0 flex-col-reverse min-h-[410px] md:min-h-fit overflow-hidden above-405:px-3 mt-0 md:items-center items-start w-full justify-center md:justify-between ">
        <motion.div
          transition={{ duration: 0.3 }}
          initial={{ x: -150, opacity: 0.5 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="flex w-full  md:w-[300px] z-[2] justify-between   md:justify-center flex-col md:py-4 h-full items-center gap-8"
        >
          <h1 className="lg:text-35 mt-8 text-secondary dark:text-primary-200 xl:text-45 relative  text-48 md:text-29 font-bold capitalize ">
            Tech Heim
          </h1>
          <div className=" flex items-center gap-2 -mb-[190px] md:mb-0 box-content md:justify-center justify-between h-full flex-col">
            <h3 className="font-[500] dark:text-neutral-500 text-22  text-center w-full md:text-20 lg:text-24">
              &quot;Join
              <span className="text-secondary">
                {" "}
                the digital <br className="lg:block hidden " /> revolution&quot;
              </span>
            </h3>
            <Link
              href={"#newProducts"}
              className="transition-all w-full md:w-fit duration-300"
            >
              <button className="capitalize px-7 w-full  md:w-fit py-2 text-15 lg:text-16 sm:text-20 -mb-6 above-405:px-7 sm:hover:bg-red-800 duration-300 transition-all md:px-12 lg:px-10 bg-secondary text-white sm:py-4 rounded-lg mt-auto">
                explore more
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 0.8 }}
          className=" mr-0 xl:w-[60%] opacity-75 md:opacity-100 md:static brightness-95 absolute left-0 right-0 -top-7 scale-[1.24] w-screen h-[370px] sm:scale-[1] sm:h-auto md:self-end lg:w-[50%] sm:w-[60%]"
        >
          <Image
            src="/hero.svg"
            alt="image hero"
            className="w-full h-full"
            width={628}
            height={400}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Hero;
