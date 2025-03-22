"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Login from "./Login";

const CreateAcount = () => {
  const [isSee, setisSee] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={"/user.png"}
          alt="user"
          width={24}
          height={24}
          className="lg:w-[24px]  md:w-[15px] lg:h-[24px] md:h-[15px]"
        />
      </DialogTrigger>
      <DialogContent className="px-[30px] md:scale-[0.7]  lg:scale-[1] flex flex-col items-center gap-3 justify-center">
        <Tabs defaultValue="login" className="w-[400px] rounded-none">
          <TabsList className="flex items-center  w-full mb-3   justify-center ">
            <TabsTrigger
              className=" w-full font-light m-0 text-neutral-600 border-b-2 border-neutral-300 text-18 "
              value="login"
            >
              Log in
            </TabsTrigger>
            <TabsTrigger
              className=" w-full font-light text-neutral-600 border-b-2 border-neutral-300 text-18 "
              value="createAccount"
            >
              Create Account
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login type="login" />
          </TabsContent>
          <TabsContent value="createAccount">
            <Login type="signUp" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAcount;
