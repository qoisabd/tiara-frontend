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
  metadataBase: new URL("https://tiaragames.netlify.app/"),
  title: {
    default: "Tiara Games",
    template: "%s | Tiara Games",
  },
  description:
    "Tiara Games Platform Top Up game online terpercaya. Proses cepat, aman, dan murah untuk semua game populer. Dapatkan diamond, coin, dan voucher game dengan mudah.",
  keywords: [
    "top up game",
    "beli diamond",
    "top up online",
    "voucher game",
    "top up terpercaya",
    "harga murah",
    "diamond game",
    "top up game murah",
    "jual voucher game",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://tiaragames.netlify.app/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://tiaragames.netlify.app/",
    title: "Tiara Games",
    description:
      "Platform top up game online terpercaya. Proses cepat, aman, dan murah untuk semua game populer.",
    siteName: "Tiara Games",
    images: [
      {
        url: "/public/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tiara Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiara Games",
    description:
      "Platform top up game online terpercaya. Proses cepat, aman, dan murah untuk semua game populer.",
    images: ["/public/assets/images/og-image.jpg"],
  },
  applicationName: "Tiara Games",
  authors: [{ name: "Tiara Games Team" }],
  generator: "Next.js",
  creator: "Tiara Games Team",
  publisher: "Tiara Games Team",
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
