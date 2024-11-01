import BannerSwiper from "@/components/BannerSwiper";
import CardGame from "@/components/CardGame";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PopularCardGame from "@/components/PopularCardGame";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <BannerSwiper />
        <PopularCardGame />
        <CardGame />
        <Footer />
      </div>
    </>
  );
}
