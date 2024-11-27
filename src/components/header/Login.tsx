"use client";
import React, { FormEvent, useState } from "react";
import { FaFacebook, FaGoogle, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { LiaKeySolid } from "react-icons/lia";
import { IoEyeOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { set, z } from "zod";

const Login = ({ type }: { type: "login" | "signUp" }) => {
  const [isSee, setisSee] = useState(false);
  const [email, setemail] = useState<undefined | string>();
  const [fullNAMe, setfullNAMe] = useState<undefined | string>();
  const [password, setpassword] = useState<undefined | string>();
  const [agree, setagree] = useState<undefined | string>();
  const [keep, setkeep] = useState<undefined | string>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const datainput = Object.fromEntries(data.entries());
    const validate = z.object({
      fullname: z.string(),
      email: z.string().email(),
      password: z.string().min(8, { message: "dabi la 8 wsha zyatr bi" }),
      keep: z.string(),
      agree: z.string(),
    });
    const result = validate.safeParse(datainput);
    if (!result.success) {
      const formError = result.error.format();
      setfullNAMe(formError.fullname?._errors.join(" "));
      setemail(formError.email?._errors.join(" "));
      setpassword(formError.password?._errors.join(" "));
      setkeep(formError.keep?._errors.join(" "));
      setagree(formError.agree?._errors.join(" "));
    }
    console.log("object");
    console.log(fullNAMe, email, agree, keep, password);
  };
  return (
    <form action="" onSubmit={submit}>
      <div className="flex flex-col items-center mt-6  justify-center w-full gap-3">
        <h2 className="text-28  font-semibold">
          {type === "login" ? "Log in to Tech Heim" : "Create your account"}
        </h2>
        {type === "signUp" && (
          <div className="w-full flex-col flex  overflow-hidden relative">
            <input
              type="text"
              placeholder={"full name"}
              name="fullname"
              onChange={() => setfullNAMe(undefined)}
              className={`border-gray-300  border-2 w-full rounded-lg  px-10 ${
                fullNAMe && "border-red-500 shadow-inner shadow-red-200"
              }    py-1 outline-none`}
            />
            <LuUser
              color="#B4B4B4"
              className="absolute h-[19px] w-[19px] top-[25%] left-3"
            />
          </div>
        )}
        <div className="w-full flex-col flex  overflow-hidden relative">
          <input
            type="text"
            placeholder={"E-mail"}
            name="email"
            onChange={() => setemail(undefined)}
            className={`border-gray-300  border-2 w-full rounded-lg  px-10 ${
              email && "border-red-500 shadow-inner shadow-red-200"
            }    py-1 outline-none`}
          />
          <TfiEmail color="#B4B4B4" className="absolute top-[25%] left-3" />
        </div>
        <div className="flex flex-col w-full ">
          <div className="w-full flex-col flex  overflow-hidden relative">
            <input
              type={isSee ? "text" : "password"}
              placeholder="password"
              name="password"
              onChange={() => setpassword(undefined)}
              className={`border-gray-300  border-2 w-full rounded-lg  px-10 ${
                password && "border-red-500  shadow-inner shadow-red-200"
              }    py-1 outline-none`}
            />
            <LiaKeySolid
              color="#B4B4B4"
              className="absolute w-[19px] h-[19px] top-[25%] left-3"
            />
            {!isSee ? (
              <FaRegEyeSlash
                onClick={() => {
                  console.log("click");
                  setisSee(true);
                }}
                color="#B4B4B4"
                className="absolute w-[19px] h-[19px] top-[25%] right-3"
              />
            ) : (
              <IoEyeOutline
                onClick={() => {
                  console.log("click");
                  setisSee(false);
                }}
                color="#B4B4B4"
                className="absolute w-[19px] h-[19px] top-[25%] right-3"
              />
            )}
          </div>
          {type === "login" && (
            <p className="text-blue-600 cursor-pointer self-end text-14">
              Forgot Password ?
            </p>
          )}
        </div>
        <div className="flex gap-1 items-center w-full">
          {type === "login" ? (
            <>
              <input type="checkbox" name="keep" id="" className="p-1" />
              <span className="text-13 text-neutral-400">
                {" "}
                Keep me logged in{" "}
              </span>
            </>
          ) : (
            <>
              <input type="checkbox" name="agree" id="" className="p-1" />
              <span>
                <span className="text-13 text-neutral-400">
                  I agree to all{" "}
                </span>
                <span className="text-blue-700 text-13 underline">
                  Terms & Conditions
                </span>
              </span>
            </>
          )}
        </div>
        <button className="bg-primary text-center rounded-lg py-2 text-white w-full">
          login
        </button>
        <div className="flex gap-2 w-full justify-center items-center">
          <hr className="w-full " color="gray" />{" "}
          <span className="text-15 text-center w-full">
            {type === "login" ? "Or Log In with" : "Or Sign Up with"}
          </span>
          <hr className="w-full " color="gray" />
        </div>
        <div className="flex w-full items-center gap-4">
          <button className="hover:bg-blue-100 divide-red-300 transition-all border-blue-500  border-2 text-blue-700 flex items-center justify-center py-2 rounded-lg gap-2 w-full">
            <FaGoogle color="blue" />
            <span className="text-blue-700">Google</span>
          </button>
          <button className="hover:bg-blue-100 divide-red-300 transition-all border-blue-500  border-2 text-blue-700 flex items-center justify-center py-2 rounded-lg gap-2 w-full">
            <FaFacebook color="blue" />
            <span className="text-blue-700">facebook</span>
          </button>
        </div>
        <div className="flex items-center w-full justify-center gap-2">
          <p className="text-neutral-600">Don’t have an account ? </p>
          <p className="text-primary"> sign up</p>
        </div>
      </div>
    </form>
  );
};

export default Login;
