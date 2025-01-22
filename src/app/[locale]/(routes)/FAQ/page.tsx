"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { faqProps } from "../../../../lib/action";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCaretRight } from "react-icons/fa6";
import { getFAQ } from "@/lib/action/uploadimage";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const Page = () => {
  const [load, setLoad] = useState(false);
  const [IndexItem, setIndexItem] = useState<number>(0);
  const [faq, setFaq] = useState<faqProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const data = await getFAQ().finally(() => setLoad(false));
      setFaq(data);
    };
    getData();
  }, []);

  // Framer Motion Variants
  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const listVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex flex-col gap-10 px-5 sm:px-10 xl:px-20 justify-center py-4 items-center"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Breadcrumbs */}
      <motion.h2
        className="self-start text-sm sm:text-base pt-10 text-gray-700"
        variants={fadeIn}
      >
        Home &gt;{" "}
        <span className="text-primary border-b-2 border-primary">FAQs</span>
      </motion.h2>

      {/* Hero Image */}
      <motion.div className="w-full sm:w-[80%]" variants={fadeIn}>
        <Image
          src={"/FAQ.png"}
          alt="FAQ Illustration"
          width={500}
          height={600}
          className=" w-full h-full rounded-lg shadow-gray-500 shadow-lg"
        />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="flex flex-col sm:flex-row w-full sm:w-[80%] justify-center gap-8"
        variants={listVariant}
      >
        {/* Table of Contents */}
        <motion.div
          className="flex flex-col gap-5 w-full sm:w-1/3"
          variants={fadeIn}
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Table of Contents
          </h2>
          {load ? (
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-2/3 rounded-md" />
              <Skeleton className="h-6 w-5/6 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </div>
          ) : (
            <motion.div
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={listVariant}
            >
              {faq.map((item, index) => (
                <motion.button
                  key={item.category}
                  onClick={() => setIndexItem(index)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all duration-300 ${
                    IndexItem === index
                      ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  variants={itemVariant}
                >
                  <FaCaretRight
                    size={16}
                    className={`transition-transform ${
                      IndexItem === index
                        ? "rotate-90 text-blue-600"
                        : "rotate-0 text-gray-500"
                    }`}
                  />
                  <span className="text-sm sm:text-base">{item.category}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          className="flex-1 bg-white p-6 rounded-lg shadow-md"
          variants={fadeIn}
        >
          {faq.length > 0 && !load ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {faq[IndexItem]?.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faq[IndexItem]?.questionAndAnswer.map((Item, index) => (
                  <AccordionItem
                    className="border-b last:border-none"
                    key={index}
                    value={`item-${index}`}
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-medium text-gray-800 py-3">
                      {Item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {Item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <p className="text-gray-500">No FAQs available.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
