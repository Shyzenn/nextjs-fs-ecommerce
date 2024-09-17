import React from "react";
import ProfileDropDown from "./ProfileDropDown";
import MobileMenu from "../MobileMenu";

const Header = () => {
  return (
    <header className="flex justify-between px-4 py-8 xl:py-2 items-center">
      <MobileMenu />
      <div className="text-xl  sm:block font-semibold ">Dashboard</div>
      <div>
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
