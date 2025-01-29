"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const HeaderProductImage = ({
  mainImage,
  childImage,
}: {
  mainImage: string;
  childImage: string[];
}) => {
  // State to track the current main image
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentMainImage}
              alt="Main Product"
              width={480}
              height={180}
              className="lg:w-full md:h-[250px] rounded-lg text-center size-[250px] md:w-[380px] lg:h-[300px]"
            />
          </motion.div>
        </DialogTrigger>

        <DialogContent className="flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentMainImage}
              alt="Main Product"
              width={480}
              height={180}
              className="lg:w-full md:min-h-[250px] md:max-h-[250px] md:w-[380px] lg:max-h-[300px]"
            />
          </motion.div>

          <div className="flex items-center justify-center gap-3">
            {childImage.map((image) => (
              <motion.div
                key={image}
                onClick={() => setCurrentMainImage(image)} // Update main image on click
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="cursor-pointer"
              >
                <Image
                  src={image}
                  alt="Child image"
                  width={80}
                  height={80}
                  className="max-h-[80px] min-h-[80px] duration-300 hover:scale-[1.3]"
                />
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Small Image Thumbnails */}
      <div className="flex justify-between items-center md:gap-2 lg:gap-3">
        {childImage.map((image) => (
          <motion.div
            key={image}
            onClick={() => setCurrentMainImage(image)} // Update main image on click
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="cursor-pointer"
          >
            <Image
              src={image}
              alt="Child image"
              width={80}
              height={80}
              className="size-[80px] duration-300 hover:scale-[1.1]"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default HeaderProductImage;
