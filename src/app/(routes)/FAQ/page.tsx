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
    <div className="flex flex-col gap-5 px-[px100] justify-center items-center ">
      <h2 className="self-start px-3 text-12 sm:text-16 pt-10">
        home &gt;{" "}
        <span className="text-primary border-b-primary border-b-2"> FQAs</span>
      </h2>
      <Image
        src={"/FAQ.png"}
        alt="image quesin"
        width={500}
        height={600}
        className="w-full sm:w-[80%] min-h-[180px] above-405:min-h-[200px] px-3 sm:h-[400px]"
      />
      <div className="flex items-start flex-col sm:flex-row w-full sm:w-[80%] justify-center gap-3 ">
        <div className="flex gap-3 items-start px-3 mt-3 w-full sm:w-[23%] justify-start flex-col ">
          <h2 className="font-semibold ">Table of Contents</h2>
          <div className="w-full overflow-x-auto sm:overflow-hidden justify-center flex flex-row sm:flex-col gap-1">
            {questions.map((item, index) => (
              <h2
                className={` ${
                  IndexItem === index
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "border-black "
                } md:text-14 lg:text-16 border-b justify-center  px-4 text-12 text-center  sm:w-full flex items-center gap-2 sm:hover:bg-slate-100 duration-300 transition-all`}
                onClick={() => setIndexItem(index)}
                key={item.title}
              >
                <FaCaretRight
                  color={IndexItem === index ? "blue" : "black"}
                  className={`${
                    IndexItem === index ? "rotate-[90deg] " : "rotate-[0deg]"
                  } duration-300 hidden sm:block transition-all`}
                />
                <span className="text-11  sm:text-16"> {item.title}</span>
              </h2>
            ))}
          </div>
        </div>
        <div className="sm:w-[77%] w-full px-3 sm:px-0 ">
          <Accordion type="single" collapsible className="w-full mt-7">
            {showQ.QA.map((Item, index) => (
              <AccordionItem
                className="w-full"
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="md:text-14 w-full text-center  lg:text-16 text-12">
                  {Item.questions[0]}
                </AccordionTrigger>
                <AccordionContent className="md:text-12 text-10 text-neutral-600 lg:text-14">
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
