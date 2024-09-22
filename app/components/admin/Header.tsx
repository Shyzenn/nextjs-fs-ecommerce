import React from "react";
import ProfileDropDown from "./ProfileDropDown";
import MobileMenu from "../MobileMenu";

const Header = () => {
  return (
    <header className="flex justify-between px-4 py-8 xl:py-4 items-center sticky top-0 bg-white shadow-sm z-40 mb-5">
      <MobileMenu />
      <div className="text-xl  sm:block font-semibold ">Dashboard</div>
      <div>
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
