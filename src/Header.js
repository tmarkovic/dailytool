import React from "react";
import { format } from "date-fns";
import CountDown from "./CountDown";

const Header = ({ children }) => {
  return (
    <div className="container mx-auto flex justify-between w-full py-4 text-2xl border-b border-base-300">
      <p className="">{format(new Date(), "yyyy-MM-dd")}</p>
      <CountDown className="text-9xl" minutes="15" />
    </div>
  );
};

export default Header;
