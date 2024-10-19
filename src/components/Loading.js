import React from "react";
import LoadingImage from "../image/image-removebg-preview.png";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-900">
      <img
        src={LoadingImage}
        alt="Loading"
        className="w-24 h-24 animate-spin"
      />
      <p className="text-gray-100 mt-4 text-xl animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
