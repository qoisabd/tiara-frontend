"use client";
import React from "react";
import { useRouter } from "next/navigation";

const VerifyFailed = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-red-50">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-red-600">Verification Failed</h1>
        <p className="mt-4 text-gray-600">
          We were unable to verify your account. Please try again or contact
          support if the issue persists.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default VerifyFailed;
