import React from "react";
import LandingImg from "../assets/bg.jpg";

function Landing() {
  return (
    <div className="bg-[#F3F4F5] min-h-[calc(100vh-80px)] flex items-center px-6 md:px-16 py-10">

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">

        <div className="space-y-6 text-center md:text-left">

          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-800">
            WELCOME TO
          </h1>

          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#FF0000] mr-2">LIVE</span>
            <span className="text-[#FF0000]">TALK</span>
          </h2>

          <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
            <span className="text-[#3A04FF] font-semibold">INDIA’S</span> new live chat web application
          </p>

          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            Be the part of our growing community by clicking on the button below.
          </p>

          <button className="bg-[#009DFF] hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition">
            REGISTER
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={LandingImg}
            alt="Landing Image"
            className="w-full max-w-md md:max-w-lg rounded-xl shadow-sm"
          />
        </div>

      </div>
    </div>
  );
}

export default Landing;