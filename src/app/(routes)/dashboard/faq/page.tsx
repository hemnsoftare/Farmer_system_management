"use client";
import { useToast } from "@/hooks/use-toast";
import { addFAQ, deleteFAQ, getFAQ, updateFAQ } from "@/lib/action/uploadimage";
import { faqProps } from "@/lib/action";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
  const [category, setCategory] = useState("");
  const refquestion = React.useRef<HTMLInputElement>(null);
  const refanswer = React.useRef<HTMLTextAreaElement>(null);
  const [id, setid] = useState("");
  const [faq, setfaq] = useState<faqProps[]>([]);
  const [IndexItem, setIndexItem] = useState<number>(0);
  const [questionAndAnswer, setquestionAndAnswer] = useState<
    { question: string; answer: string }[]
  >([]);
  const [error, seterror] = useState({
    category: "",
    questionAndAnswer: "",
  });
  const { toast } = useToast();

  const validation = z.object({
    category: z.string().min(1, { message: "Please enter category" }),
    questionAndAnswer: z
      .array(
        z.object({
          question: z.string().min(1, { message: "Please enter question" }),
          answer: z.string().min(1, { message: "Please enter answer" }),
        })
      )
      .nonempty({ message: "Please add at least one question and answer" }),
  });

  const handlequestionAndAnswer = () => {
    setquestionAndAnswer([
      ...questionAndAnswer,
      {
        question: refquestion.current?.value || "",
        answer: refanswer.current?.value || "",
      },
    ]);
    if (refquestion.current) refquestion.current.value = "";
    if (refanswer.current) refanswer.current.value = "";
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seterror({ category: "", questionAndAnswer: "" });

    const validate = validation.safeParse({
      category: category,
      questionAndAnswer: questionAndAnswer,
    });

    if (!validate.success) {
      validate.error.errors.forEach((err) => {
        seterror((prev) => ({
          ...prev,
          [err.path[0]]: err.message,
        }));
      });
    } else {
      if (id) {
        updateFAQ({ item: { id, category, questionAndAnswer } });
        setfaq((prev) =>
          prev.map((item) =>
            item.id === id ? { id, category, questionAndAnswer } : item
          )
        );
        setid("");
        setCategory("");
        setquestionAndAnswer([]);
        refquestion.current.value = "";
        refanswer.current.value = "";
        toast({
          title: "FAQ updated",
          description: "FAQ updated successfully",
        });
      } else {
        addFAQ(category, questionAndAnswer);
        setfaq((prev) => [...prev, { category, questionAndAnswer }]);

        setCategory("");
        setquestionAndAnswer([]);
        refquestion.current.value = "";
        refanswer.current.value = "";

        toast({ title: "FAQ added", description: "FAQ added successfully" });
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getFAQ();
      setfaq(data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-start w-full justify-between gap-8 px-4 md:px-6 lg:px-10 py-8 box-border">
      {/* Form Section */}
      <div className="flex w-full items-start gap-6 justify-between flex-col md:flex-row">
        <form
          onSubmit={handlesubmit}
          className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-24 font-semibold mb-6 text-gray-800">
            Add a New Question
          </h2>
          {/* Category Input */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter question category"
            />
            {error.category && (
              <p className="text-red-500 text-sm">{error.category}</p>
            )}
          </div>
          {/* Question Input */}
          <div className="flex flex-col mb-4">
            <label
              htmlFor="question"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              ref={refquestion}
              id="question"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the question"
            />
          </div>
          {/* Answer Input */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="answer"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Answer
            </label>
            <textarea
              name="answer"
              id="answer"
              ref={refanswer}
              rows={4}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the answer"
            ></textarea>
          </div>
          {error.questionAndAnswer && (
            <p className="text-red-500 mb-3 -mt-4 text-sm">
              {error.questionAndAnswer}
            </p>
          )}
          <button
            type="button"
            onClick={handlequestionAndAnswer}
            className="w-full mb-4 bg-secondary-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Add Question
          </button>
          {/* Submit Button */}
          <footer className="w-full flex items-center justify-between gap-3">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              {id ? "Edit FAQ" : "Add FAQ"}
            </button>
            <button className="w-full border-blue-500 md:hover:bg-blue-200 active:bg-blue-200 border text-blue-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Cancel
            </button>
          </footer>
        </form>

        {/* Preview Section */}
        <div className="flex w-full md:w-1/2 flex-col bg-gray-100 shadow-lg rounded-lg p-6">
          <h2 className="text-24 font-semibold mb-4 text-gray-800">
            Preview the Question
          </h2>
          <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm text-gray-500 font-medium">Category:</h3>
              <p className="text-base text-gray-800 font-medium">
                {category || "No category added"}
              </p>
              <h3>Question and Answer</h3>
              {questionAndAnswer.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col border md:hover:shadow-lg duration-200 transition-all gap-2 py-2 px-4 bg-white shadow-md rounded-lg"
                >
                  <header className="w-full flex items-center justify-between">
                    <h3 className="text-sm text-gray-500 font-medium">
                      Question:
                    </h3>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => {
                          refquestion.current.value = item.question;
                          refanswer.current.value = item.answer;
                        }}
                        className="text-blue-600 md:hover:bg-blue-200 px-4 py-1 rounded-lg duration-300 transition-all active:bg-blue-200 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setquestionAndAnswer((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="text-red-600 md:hover:bg-red-200 px-4 py-1 rounded-lg duration-300 transition-all active:bg-red-200 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </header>
                  <p className="text-base text-gray-800 font-medium">
                    {item.question}
                  </p>
                  <h3 className="text-sm text-gray-500 font-medium">Answer:</h3>
                  <p className="text-base text-gray-800 font-medium">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Display Section */}
      {faq.length > 0 && (
        <div className="flex flex-col border-2 p-3 shadow-lg shadow-gray-300 rounded-lg w-full gap-8">
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Table of Contents
            </h2>
            {faq.map((item, index) => (
              <button
                key={item.category}
                onClick={() => setIndexItem(index)}
                className={`flex items-center font-semibold gap-3 px-4 py-2 rounded-lg text-left transition-all duration-300 ${
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
          <div className="flex-1 border w-full bg-white p-2 md:p-6 rounded-lg shadow-md">
            <div className="w-full flex items-center justify-between">
              <h2 className="md:text-xl text-16 font-semibold text-gray-800">
                {faq[IndexItem]?.category}
              </h2>
              <div className="flex items-center gap-1 md:gap-4">
                <button
                  onClick={() => {
                    setfaq((prev) => prev.filter((_, i) => i !== IndexItem));
                    setIndexItem(0);
                    deleteFAQ(faq[IndexItem]?.id);
                  }}
                  className="text-red-600 hover:bg-red-200 md:px-4 py-1 px-1 rounded-lg duration-300 transition-all active:bg-red-200 font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setCategory(faq[IndexItem]?.category);
                    setquestionAndAnswer(faq[IndexItem]?.questionAndAnswer);
                    setid(faq[IndexItem]?.id);
                    setIndexItem(0);
                  }}
                  className="text-blue-600 hover:bg-blue-200 px-4 py-1 rounded-lg duration-300 transition-all active:bg-blue-200 font-semibold"
                >
                  Edit
                </button>
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faq[IndexItem]?.questionAndAnswer.map((Item, index) => (
                <AccordionItem
                  className="border-b  last:border-none"
                  key={index}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="text-14 sm:text-15 font-medium text-gray-800 py-3">
                    {Item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-12 text-gray-600 leading-relaxed">
                    {Item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
