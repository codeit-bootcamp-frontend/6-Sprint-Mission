import React from "react";
import BannerBottom from "../components/Home/BannerBottom";
import BannerMiddle from "../components/Home/BannerMiddle";
import BannerTop from "../components/Home/BannerTop";
import Footer from "../components/Home/Footer";
import "../style/home.css";
import NavBar from "../components/Header";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <BannerTop />
        <BannerMiddle />
        <BannerBottom />
      </main>
      <Footer />
    </>
  );
}
