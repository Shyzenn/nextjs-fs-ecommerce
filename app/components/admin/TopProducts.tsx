import React from "react";
import Image from "next/image";
import shoesPlaceholder from "@/app/assets/images/shoes.jpg";

const TopProducts = () => {
  return (
    <>
      <h1 className="text-lg text-slate-800">Top Products</h1>
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={shoesPlaceholder} width={60} height={60} alt=""></Image>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Air Jordan Nike</h1>
              <p className="text-xs text-slate-500">Price:$100</p>
            </div>
          </div>
          <div className="text-xs ml-8 bg-slate-100 p-2 text-slate-500 rounded-md text-center w-20">
            345 Sale
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={shoesPlaceholder} width={60} height={60} alt=""></Image>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Air Jordan Nike</h1>
              <p className="text-xs text-slate-500">Price:$100</p>
            </div>
          </div>
          <div className="text-xs ml-8 bg-slate-100 p-2 text-slate-500 rounded-md text-center w-20">
            345 Sale
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src={shoesPlaceholder} width={60} height={60} alt=""></Image>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Air Jordan Nike</h1>
              <p className="text-xs text-slate-500">Price:$100</p>
            </div>
          </div>
          <div className="text-xs ml-8 bg-slate-100 p-2 text-slate-500 rounded-md text-center w-20 ">
            345 Sale
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProducts;
