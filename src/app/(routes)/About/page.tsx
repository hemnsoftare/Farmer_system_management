import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex w-full px-40 flex-col gap-4 ">
      <h2>
        home &gt;{" "}
        <span className="text-blue-600 underline underline-offset-4">
          {" "}
          about us
        </span>{" "}
      </h2>
      <Image
        src={"/About.png"}
        alt="about image "
        width={600}
        height={400}
        className="w-full rounded-md"
      />
      <p className="text-neutral-400 px-3 indent-2 -mt-2 ">
        Tech Heim is an innovative online store that offers a diverse selection
        of digital gadgets, available for purchase in both cash and installment
        options. Embodying the motto Join the digital revolution today the
        website not only provides a seamless shopping experience but also
        features a captivating blog section filled with insightful reviews,
        articles, and videos about cutting-edge technology and digital gadgets.
        Users can actively engage with the content through comments and a
        question-answer section, fostering a dynamic community of tech
        enthusiasts.{" "}
      </p>
      <h2 className="font-semibold text-18">Tech Heim Meaning </h2>
      <p className="text-neutral-400 px-3 indent-2 ">
        The name Tech Heim cleverly combines two languages (English & German),
        signifying a home of technology that provides all the essential tech
        products and services, making it a one-stop destination for tech-savvy
        individuals seeking the latest and most exciting gadgets.
      </p>
      <h2 className="font-semibold text-18">
        Some of Tech Heim’s impressive features :{" "}
      </h2>
      <p className="text-neutral-400 px-3 indent-2 ">
        Diverse digital gadgets for purchase in cash or installments A blog with
        reviews and articles about the latest technology and gadgets User
        comments and Q&A section for community interaction Represents a
        tech-savvy home with all necessary technology Easy-to-use interface for
        a great user experience Consistent and visually appealing design A hub
        for tech enthusiasts to connect and share insights Helps users make
        informed purchase decisions
      </p>
    </div>
  );
};

export default Page;
