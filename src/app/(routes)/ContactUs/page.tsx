import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RiMapPinAddLine } from "react-icons/ri";
const contactInfo = [
  {
    type: "Office",
    icon: RiMapPinAddLine, // Use the correct icon here
    address: "123 Main Street, Anytown, USA",
  },
  {
    type: "Email",
    icon: MdOutlineMail, // Use the correct icon here
    address: "info@techheim.com",
  },
  {
    type: "Phone",
    icon: FaPhoneVolume, // Use the correct icon here
    address: "+1 (555) 123-4567",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-4">
        home &gt;{" "}
        <span className="text-blue-600 border-blue-600  border-b">
          Contact Us
        </span>
      </h2>
      <div className="flex items-center justify-center  gap-5 w-full">
        {contactInfo.map((item) => (
          <div
            key={item.type}
            className="flex flex-col items-center w-[200px]  justify-center gap-3"
          >
            <item.icon color="blue" className=" w-8 h-8" />
            <h3 className="font-semibold text-16">{item.type}</h3>
            <span className="text-neutral-500 text-wrap text-14 text-center">
              {item.address}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-start mt-8 px-24 gap-10 justify-center">
        <div className="flex flex-col w-[40%] items-start gap-3 justify-normal">
          <h2 className="font-semibold">Message us</h2>
          <p className="text-neutral-400">
            We are here to assist you every step of the way. Whether you have a
            question, need technical support, or simply want to share your
            feedback, our dedicated team is ready to listen and provide prompt
            assistance.
          </p>
        </div>
        <div className="flex flex-col self-end w-[60%] mt-5 items-center justify-center gap-3 ">
          <textarea
            name="message"
            placeholder="* message .."
            id=""
            rows={5}
            className="placeholder:text-neutral-400 w-full rounded-sm duration-300 transition-all text-neutral-700 shadow-md focus:shadow-md shadow-slate-100 border-neutral-300/50 outline-none px-4 py-2 border-2"
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
