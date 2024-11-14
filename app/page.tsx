"use client";
import BannerSwiper from "@/components/BannerSwiper";
import CardGame from "@/components/CardGame";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PopularCardGame from "@/components/PopularCardGame";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyPayment } from "@/features/order/orderThunk";

export default function Home() {
  const queryParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const orderIdMidtrans = queryParams ? queryParams.get("order_id") : null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderIdMidtrans) {
      dispatch(verifyPayment(orderIdMidtrans));
    }
  }, [orderIdMidtrans]);

  return (
    <>
      <div className="bg-gradient-detail">
        <Navbar />
        <BannerSwiper />
        <PopularCardGame />
        <CardGame />
        <Footer />
      </div>
    </>
  );
}
