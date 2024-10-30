"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const CreateNewPasswordSuccess = () => {
  const imgSuccess = "/assets/images/img-success-update.svg";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-[#285CC4] items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">Success!</h1>
          <p className="text-white text-lg">
            Your password has been updated successfully.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Image
              src={imgSuccess}
              alt="Password Updated Successfully Illustration"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Password Updated Successfully!
          </h2>
          <p className="mt-2 text-gray-600">
            You can now use your new password to log in to your account.
          </p>
          <Link
            href="/sign-in"
            className="mt-8 inline-block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150 text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPasswordSuccess;
