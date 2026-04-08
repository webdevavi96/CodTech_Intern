import React from 'react';
import LandingImg from '../assets/bg.jpg';

function Landing() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center bg-[#e1ecf7] px-6 py-10 md:px-16">
      <div className="max-w-8xl mx-auto grid w-full items-center gap-10 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-wide text-gray-800 md:text-4xl">
            WELCOME TO
          </h1>

          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="mr-2 text-[#FF0000]">LIVE</span>
            <span className="text-[#FF0000]">TALK</span>
          </h2>

          <p className="mx-auto max-w-md text-lg text-gray-700 md:mx-0">
            <span className="font-semibold text-[#3A04FF]">INDIA’S</span> new live chat web
            application
          </p>

          <p className="mx-auto max-w-md text-gray-600 md:mx-0">
            Be the part of our growing community by clicking on the button below.
          </p>

          <button className="rounded-full bg-[#009DFF] px-6 py-2 font-medium text-white transition hover:bg-blue-600">
            REGISTER
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={LandingImg}
            alt="Landing Image"
            className="w-full max-w-md rounded-xl shadow-sm md:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
