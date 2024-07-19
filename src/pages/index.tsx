import homeSectionImage01 from "@/assets/images/home-section-01.png";
import homeSectionImage02 from "@/assets/images/home-section-02.png";
import homeSectionImage03 from "@/assets/images/home-section-03.png";
import { vstack } from "@/styled-system/patterns";
import TopBanner from "@/components/homeComponents/TopBanner";
import Section from "@/components/homeComponents/Section";
import BottomBanner from "@/components/homeComponents/BottomBanner";
import Footer from "@/components/homeComponents/Footer";
import Header from "@/components/shared/Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <TopBanner />
      <div
        className={vstack({
          gap: { base: "64px", xl: "276px" },
          mt: { base: "51px", md: "24px", xl: "138px" },
          mb: { base: "64px", md: "80px", xl: "277px" },
        })}
      >
        <Section
          index={0}
          imageSrc={homeSectionImage01}
          itemText="Hot item"
          titleText="인기 상품을 확인해보세요"
          descriptionText={`가장 HOT한 중고거래 상품을\n판다 마켓에서 확인해보세요`}
        />
        <Section
          index={1}
          imageSrc={homeSectionImage02}
          itemText="Search"
          titleText="구매를 원하는 상품을 검색하세요"
          descriptionText={`구매하고 싶은 물품은 검색해서\n쉽게 찾아보세요`}
        />
        <Section
          index={2}
          imageSrc={homeSectionImage03}
          itemText="Register"
          titleText="판매를 원하는 상품을 등록하세요"
          descriptionText={`어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요`}
        />
      </div>
      <BottomBanner />
      <Footer />
    </div>
  );
}
