"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from "react";

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div>
          <Image src={imageUrl} alt="myImage" width={300} height={300} />
        </div>
      ) : null}
    </div>
  );
};

export default UploadImage;
