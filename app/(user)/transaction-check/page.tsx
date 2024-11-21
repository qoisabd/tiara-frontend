"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransactionDataTable from "@/components/TransactionCheck/TransactionDataTable";
import React from "react";

const TransactionCheck = () => {
  return (
    <>
      <Navbar />
      <TransactionDataTable />
      <Footer />
    </>
  );
};

export default TransactionCheck;
