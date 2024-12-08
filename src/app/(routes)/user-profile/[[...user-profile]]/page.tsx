import { UserProfile } from "@clerk/nextjs";
import React from "react";
const Page = () => {
  return (
    <div className="flex items-center py-4 bg-white h-screen justify-center overflow-hidden ">
      {/* Change the background color to black */}
      <UserProfile
        appearance={{
          layout: { shimmer: false },
          elements: {
            root: "bg-gray-800", // Change root background to dark gray for contrast
            sidebar: "bg-gray-800", // Set sidebar background to dark gray
            footer: "hidden", // Hide the footer if desired
            environmentBadge: "hidden", // Hide the development mode badge if desired
          },
        }}
      />
    </div>
  );
};

export default Page;
