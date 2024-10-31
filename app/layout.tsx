import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/store-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Top Up Game Terpercaya - Cepat & Aman",
  description:
    "Website top up game online terpercaya. Dapatkan diamond, coin, dan voucher dengan cepat dan aman untuk game favorit Anda.",
  keywords:
    "top up game, beli diamond, top up online, voucher game, top up terpercaya, harga murah",
  robots: "index, follow",
  authors: null,

  // openGraph: {
  //   title: "Top Up Game Terpercaya - Cepat & Aman",
  //   description:
  //     "Website top up game online terpercaya. Dapatkan diamond, coin, dan voucher dengan cepat dan aman untuk game favorit Anda.",
  //   url: "https://website-anda.com",
  //   site_name: "Top Up Game",
  // },
  twitter: {
    card: "summary_large_image",
    title: "Top Up Game Terpercaya - Cepat & Aman",
    description:
      "Website top up game online terpercaya. Dapatkan diamond, coin, dan voucher dengan cepat dan aman untuk game favorit Anda.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
