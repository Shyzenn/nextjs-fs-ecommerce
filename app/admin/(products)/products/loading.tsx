import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader loading={true} size={50} color="#0065e8" />
    </div>
  );
};

export default Loading;
