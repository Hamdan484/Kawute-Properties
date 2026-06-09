import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/BlogImages/blog1.png";

function Sign_up_card() {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center text-white overflow-hidden">

      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center px-6 text-center">

        {/* Customer Card */}
        <Link
          to="/signup"
          className="border border-white bg-black/40 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 rounded-xl text-sm md:text-lg font-semibold hover:bg-white hover:text-black transition duration-300 w-64 md:w-72"
        >
          Sign up as Customer
        </Link>

        {/* Agent Card */}
        <Link
          to="/agent-signup"
          className="border border-white bg-black/40 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 rounded-xl text-sm md:text-lg font-semibold hover:bg-white hover:text-black transition duration-300 w-64 md:w-72"
        >
          Sign up as Agent
        </Link>

      </div>
    </div>
  );
}

export default Sign_up_card;