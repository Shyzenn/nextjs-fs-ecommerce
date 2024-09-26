import Image from "next/image";
import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface MainImageLabelProps {
  mainImage: string | null;
}

const MainImageLabel: React.FC<MainImageLabelProps> = ({ mainImage }) => {
  return (
    <>
      <label
        htmlFor="mainImage"
        className={`border-2 border-blue-300 bg-blue-50 border-dashed w-full flex justify-center flex-col items-center md:h-[25rem] ${
          mainImage ? "py-0" : "py-8"
        }`}
      >
        {mainImage ? (
          <div className="relative my-2 w-[15rem] h-[16rem] md:w-[25rem] md:h-[25rem]">
            <Image
              objectFit="cover"
              fill
              src={mainImage as string}
              alt="Selected Image"
            />
          </div>
        ) : (
          <>
            <MdOutlineFileUpload className="text-4xl" />
            Choose a file
          </>
        )}
      </label>
    </>
  );
};

export default MainImageLabel;
