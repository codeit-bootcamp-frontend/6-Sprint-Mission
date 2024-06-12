import "@/styles/home.module.css";
import BannerTop from "@/components/home/bannerTop";
import BannerMiddle from "@/components/home/bannerMiddle";
import BannerBottom from "@/components/home/bannerBottom";
import Footer from "@/components/home/footer";

export default function HomePage() {
  return (
    <>
      <main>
        <BannerTop />
        <BannerMiddle />
        <BannerBottom />
      </main>
      <Footer />
    </>
  );
}