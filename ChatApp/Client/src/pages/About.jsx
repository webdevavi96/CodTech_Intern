import React from "react";
import people from "../assets/people.svg";
import security from "../assets/security.svg";

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-10 text-center text-4xl font-bold">About Us</h1>

      <div className="mb-12 grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>

          <p className="mb-4 text-gray-600">
            Our goal is to provide a fast, secure, and real-time communication platform that
            connects people seamlessly. We aim to deliver a modern chatting experience with powerful
            features while maintaining simplicity and reliability.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-gray-600">
            <li>Real-time one-to-one chat with instant message delivery</li>
            <li>Live one-to-one calling for seamless communication</li>
            <li>Modern and responsive user interface</li>
            <li>Reliable backend for smooth performance</li>
          </ul>
        </div>

        <div className="aspect-4/3 w-full">
          <img src={people} alt="Users communicating" className="h-full w-full object-contain" />
        </div>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="mb-4 text-2xl font-semibold">Our Policy</h2>

          <p className="mb-4 text-gray-600">
            We prioritize user privacy, security, and control. Our platform ensures that your data
            is handled responsibly while giving you full control over your account.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-gray-600">
            <li>Email OTP verification using secure Google SMTP</li>
            <li>Profile management (update or delete your account anytime)</li>
            <li>Secure authentication and data protection</li>
            <li>User-focused privacy and control policies</li>
          </ul>
        </div>

        <div className="aspect-4/3 w-full">
          <img
            src={security}
            alt="Security illustration"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
