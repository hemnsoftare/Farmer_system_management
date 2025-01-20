"use client";
import CardContactUs from "@/components/contactus/CardContactUs";
import LoadingSpinner from "@/components/contactus/LoadingSpinner";
import { getConactUs } from "@/lib/action/uploadimage";
import { contactUSProps } from "@/lib/action";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const Page = () => {
  const [load, setLoad] = useState(false);
  const [contacts, setContacts] = useState<contactUSProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      const data = await getConactUs();
      setLoad(false);
      setContacts(data);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col px-3 xl:py-12 py-4 w-full gap-4">
      <h2 className="mt-4  px-3">
        <Link href={"/"} className="text-blue-600 border-blue-600  border-b">
          home{" "}
        </Link>{" "}
        &gt; <span className="">Contact Us</span>
      </h2>
      <motion.div
        transition={{
          duration: 0.9,
          staggerChildren: 0.3,
        }}
        className="w-full flex py-7 px-1  overflow-x-auto md:flex-wrap gap-3 items-center justify-start md:justify-center"
      >
        {!load ? (
          contacts.map((item, index) => (
            <motion.div
              initial={{
                y: index % 2 === 0 ? -100 : 100,
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
              }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={item.title}
              className=""
            >
              <CardContactUs
                formMessage={item.formMessage}
                imageUrl={item.imageUrl}
                id={item.id}
                showActions={false}
                title={item.title}
              />
            </motion.div>
          ))
        ) : (
          <>
            <LoadingSpinner /> <LoadingSpinner /> <LoadingSpinner />
          </>
        )}
      </motion.div>
      <div className="flex flex-col sm:flex-row items-start mt-8 sm:px-24 px-2 sm:gap-10 justify-center">
        <div className="flex flex-col w-full sm:w-[40%] items-start gap-3 justify-normal">
          <h2 className="font-semibold">Message us</h2>
          <p className="text-neutral-400 dark:text-neutral-600">
            We are here to assist you every step of the way. Whether you have a
            question, need technical support, or simply want to share your
            feedback, our dedicated team is ready to listen and provide prompt
            assistance.
          </p>
        </div>
        <div className="flex flex-col self-end w-full sm:w-[60%] mt-5 items-center justify-center gap-3 ">
          <textarea
            name="message"
            placeholder="* message .."
            id=""
            rows={5}
            className="placeholder:text-neutral-400 w-full rounded-sm duration-300 transition-all text-neutral-700 shadow-md focus:shadow-md shadow-slate-100 border-neutral-300/50 dark:border-black/60 dark:shadow-secondary outline-none px-4 py-2 border-2"
          />
          <button className="text-white bg-primary rounded-lg px-10 py-2 self-end hover:bg-blue-700 ">
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
