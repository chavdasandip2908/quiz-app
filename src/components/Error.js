import React from "react";
import ErrorImage from "../image/images-removebg-preview.png";
import { Link } from "react-router-dom";

const Error = ({ msg }) => {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-900">
            <img
                src={ErrorImage}
                alt="Loading..."
                className="w-52 h-52 animate-pulse-scale"
            />
            <p className="text-red-400 mt-4 text-xl animate-pulse">{msg}</p>
            <Link to='/' className="text-blue-600 hover:text-blue-700 transition duration-400" >Go Back</Link>
        </div>
    );
};

export default Error;


