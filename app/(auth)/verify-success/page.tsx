"use client";
import React from "react";
import { useRouter } from "next/navigation";

const VerifySuccess = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-green-50">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Verification Successful
        </h1>
        <p className="mt-4 text-gray-600">
          Your account has been successfully verified! You can now continue to
          enjoy our services.
        </p>
        <button
          onClick={() => router.push("/sign-in")}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifySuccess;
