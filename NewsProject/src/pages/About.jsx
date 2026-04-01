import React from "react";
import newsSource from "../assets/sources.jpg";
import newsAnchor from "../assets/anchor.jpg";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">About Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with real-time news from around the world. Our platform
          delivers curated, fast, and reliable updates.
        </p>
      </div>

    <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our goal is to make news accessible, fast, and engaging. We bring
            together headlines from trusted sources so you can stay updated
            without noise.
          </p>
        </div>

        <div>
          <div className="bg-gray-100 h-64 rounded-xl overflow-hidden">
            <img
              src={newsAnchor}
              alt="News anchor"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Image by{" "}
            <a
              href="https://www.freepik.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 italic mt-2"            >
              Freepik
            </a>
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

        <div>
          <div className="bg-gray-100 h-64 rounded-xl overflow-hidden">
            <img
              src={newsSource}
              alt="News sources"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Image by{" "}
            <a
              href="https://www.freepik.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 italic mt-2"
            >
              Freepik
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
          <ul className="text-gray-600 space-y-2">
            <li>• Latest news from multiple sources</li>
            <li>• Clean and minimal reading experience</li>
            <li>• Fast loading and responsive design</li>
            <li>• Continuous updates with pagination</li>
          </ul>
        </div>

      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-3">Built With Love</h2>
        <p className="text-gray-600">
          This project is crafted using React, Tailwind CSS, and modern web
          technologies to deliver a smooth user experience.
        </p>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-3">
          Know About Developer
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          I'm{" "}
          <a
            href="https://webdevavi96.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Developer's Portfolio"
            className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
          >
            Avinash Chaurasiya
          </a>{" "}
          — a Full-Stack Web Developer focused on building responsive,
          user-friendly applications using modern frontend technologies.
        </p>
      </div>

    </div>
  );
}

export default About;