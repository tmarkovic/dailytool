import { format } from "date-fns";

const Header = () => (
  <div className="container mx-auto flex justify-between w-full py-4 text-2xl border-b border-base-300">
    <p className="">{format(new Date(), "yyyy-MM-dd")}</p>

  </div>
);

export default Header;
