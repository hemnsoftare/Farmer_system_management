"use client";
import CardTeam from "@/components/about/CardTeam";
import { getAboutUs, getTeam } from "@/lib/action/uploadimage";
import { teamProps } from "@/type";
import { image } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Page = () => {
  const [about, setabout] = useState({
    description: "",
    imageUrl: "",
    descriptions: [
      {
        title: "",
        description: "",
      },
    ],
  });
  const [team, setteam] = useState<teamProps[]>([]);

  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const data = await getAboutUs();
    const datateam = await getTeam();
    setteam(datateam);
    setabout(data as any);
  };

  return (
    <div className="flex w-full  sm:px-40 flex-col py-8 gap-4 px-2 sm:gap-4 ">
      <h2>
        <Link href={"/"} className="hover:text-blue-800 hover:underline">
          home
        </Link>
        &gt;{" "}
        <span className="text-blue-600 cursor-pointer underline underline-offset-4">
          {" "}
          about us
        </span>{" "}
      </h2>
      <Image
        src={about.imageUrl}
        alt="about image "
        width={600}
        height={400}
        className="w-full rounded-md md:h-full max-h-[450px] "
      />
      <p className="text-neutral-400 dark:text-neutral-600 px-3  text-12 sm:text-16 line-clamp-0 indent-2 -mt-2 ">
        {about.description}
      </p>
      <div className="">
        {about.descriptions.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <h2 className="text-20 font-semibold">{item.title}</h2>
            <p className="text-14">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="w-full h-full flex md:flex-row flex-wrap flex-col gap-4">
        {team.map((item) => (
          <CardTeam
            key={item.description}
            description={item.description}
            imageUrl={item.imageUrl}
            isDashboard={false}
            name={item.fullName}
            role={item.position}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
