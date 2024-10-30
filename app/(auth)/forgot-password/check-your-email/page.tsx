"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const CheckEmail = () => {
  const imgCheckEmail = "/assets/images/img-check-email.svg";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-[#285CC4] items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Check Your Email
          </h1>
          <p className="text-white text-lg">
            We've sent a password reset link to your email. Please check your
            inbox to proceed.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Image
              src={imgCheckEmail}
              alt="Check Email"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      {/* Right side*/}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Check Your Email
          </h2>
          <p className="mt-2 text-gray-600">
            A password reset link has been sent to your email address. Please
            follow the instructions in the email to reset your password.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
