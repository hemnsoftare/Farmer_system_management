"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { faqProps } from "../../../type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCaretRight } from "react-icons/fa6";
import { getFAQ } from "@/lib/action/uploadimage";
import { Skeleton } from "@/components/ui/skeleton";
const Page = () => {
  const [load, setload] = useState(false);
  const [IndexItem, setIndexItem] = useState<number>(0);
  const [faq, setfaq] = useState<faqProps[]>([]);
  useEffect(() => {
    const getdata = async () => {
      setload(true);
      const data = await getFAQ().finally(() => setload(false));
      setfaq(data);
    };
    getdata();
  }, []);
  return (
    <div className="flex flex-col gap-10 px-5 sm:px-10 xl:px-20 justify-center py-4 items-center">
      {/* Breadcrumbs */}
      <h2 className="self-start text-sm sm:text-base pt-10 text-gray-700">
        Home &gt;{" "}
        <span className="text-primary border-b-2 border-primary">FAQs</span>
      </h2>

      {/* Hero Image */}
      <Image
        src={"/FAQ.png"}
        alt="FAQ Illustration"
        width={500}
        height={600}
        className="w-full sm:w-[80%] rounded-lg shadow-gray-500 shadow-lg"
      />

      {/* FAQ Section */}
      <div className="flex flex-col sm:flex-row w-full sm:w-[80%] justify-center gap-8">
        {/* Table of Contents */}
        <div className="flex flex-col gap-5 w-full sm:w-1/3">
          <h2 className="text-lg font-semibold text-gray-800">
            Table of Contents
          </h2>
          {load ? (
            <div className="flex w-full flex-col gap-2">
              {/* Skeleton loading placeholders */}
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-2/3 rounded-md" />
              <Skeleton className="h-6 w-5/6 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {faq.map((item, index) => (
                <button
                  key={item.category}
                  onClick={() => setIndexItem(index)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all duration-300 ${
                    IndexItem === index
                      ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
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
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
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
        </div>
      </div>
    </div>
  );
};

export default Page;
