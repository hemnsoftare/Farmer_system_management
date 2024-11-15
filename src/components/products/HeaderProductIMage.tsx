import Image from "next/image";
import React from "react";
import { imageHeaderProps } from "@/type";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const imageHeder = {
  imageBig: "/Catagory_laptop.svg",
  images: ["/laptop.svg", "/laptop1.svg", "/laptop1.svg", "/laptop1.svg"],
};
const HeaderProductIMage = ({
  mainImage,
  childImage,
}: {
  mainImage: string;
  childImage: string[];
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            src={mainImage}
            alt=""
            width={480}
            height={180}
            className="lg:w-full md:h-[250px] md:w-[380px] lg:h-[300px] "
          />
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-center ">
          <Image
            src={mainImage}
            alt=""
            width={480}
            height={180}
            className="lg:w-full md:min-h-[250px] md:max-h-[250px] md:w-[380px] lg:max-h-[300px] "
          />
          <div className="flex items-center justify-center gap-3 ">
            {" "}
            {childImage.map((image) => (
              <Image
                key={image}
                src={image}
                alt=""
                width={80}
                height={80}
                className="max-h-[80px] min-h-[80px] duration-300 hover:scale-[1.3]"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center md:gap-2 lg:gap-3">
        {childImage.map((image) => (
          <Image
            key={image}
            src={image}
            alt=""
            width={80}
            height={80}
            className="size-[80px] duration-300 hover:scale-[1.1]"
          />
        ))}
      </div>
    </>
  );
};

export default HeaderProductIMage;
