import { OrganizationList } from "@clerk/nextjs";

import React from "react";

const page = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      {/* <OrganizationSwitcher /> */}
      <OrganizationList appearance={{ elements: { footer: "hidden" } }} />
    </div>
  );
};

export default page;
