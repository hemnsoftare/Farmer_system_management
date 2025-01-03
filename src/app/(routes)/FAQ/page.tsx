"use client";
import { faq } from "@/util/data";
import Image from "next/image";
import React, { useState } from "react";
import { FAQProps } from "../../../type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCaretRight } from "react-icons/fa6";

const Page = () => {
  const [questions] = useState<FAQProps[]>(faq);
  const [IndexItem, setIndexItem] = useState<number>(0);
  const showQ = questions[IndexItem];

  return (
    <div className="flex flex-col gap-10 px-5 sm:px-10 xl:px-20 justify-center py-4 items-center ">
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
          <div className="flex flex-col gap-2">
            {questions.map((item, index) => (
              <button
                key={item.title}
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
                <span className="text-sm sm:text-base">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {showQ.title}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {showQ.QA.map((Item, index) => (
              <AccordionItem
                className="border-b last:border-none"
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-base sm:text-lg font-medium text-gray-800 py-3">
                  {Item.questions[0]}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {Item.answers[0]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Page;
