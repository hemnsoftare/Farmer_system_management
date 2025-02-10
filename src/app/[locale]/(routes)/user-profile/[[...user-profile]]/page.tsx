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
            footerAction: "hidden",
            footerAction__alternativeMethods: "hidden",
            footer: "hidden", // Hide the footer if desired
            environmentBadge: "hidden", // Hide the development mode badge if desired
            footerAction__usePasskey: "hidden",
            footerAction__havingTrouble: "hidden",
            footerAction__signIn: "hidden",
            footerAction__signUp: "hidden",
            footerPages: "hidden",
            footerActionLink: "hidden",
            footerActionText: "hiddden",
            footerItem: "hidden",
            footerPagesLink: "hidden",
            footerPagesLink__terms: "hidden",
            footerPagesLink__help: "hidden",
            footerPagesLink__privacy: "hidden",
          },
        }}
      />
    </div>
  );
};

export default Page;
