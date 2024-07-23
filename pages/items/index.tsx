"use client";

import Link from "next/link";
import { useState } from "react";
import useResponsive from "@/src/hooks/useResponsive";
import ItemList from "@/components/ItemList";
import Input from "@/components/Input";
import Header from "@/components/Header";
import ImgProductEmpty from "@/src/img/Img_product_empty.png";


export default function Page() {
  const [isPC, isTablet, isMobile] = useResponsive();

  const [values, setValues] = useState({
    search: "",
    order: "recent",
    page: 1,
  });

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <section className="section-items best">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">베스트 상품</h2>
          </header>
          <div className="section-content">
            <ItemList order="favorite" pageSize={isMobile ? 1 : isTablet ? 2 : 4} />
          </div>
        </div>
      </section>
      <section className="section-items">
        <div className="section-wrap">
          <header className="section-header">
            <h2 className="section-tit">전체 상품</h2>
            <Input.Search name="search" value={values.search} onSubmit={handleSearch} onChange={handleInputChange} className="section-item__search" placeholder="검색할 상품을 입력해주세요." />
            <Link href="/additem" className="section-item__btn">
              상품 등록하기
            </Link>
            <Input.Select
              selectOptions={[
                { value: "recent", name: "최신순" },
                { value: "favorite", name: "좋아요순" },
              ]}
              name="order"
              value={values.order}
              onChange={handleChange}
              className="section-item__dropdown"
            />
          </header>
          <div className="section-content">
            <ItemList order={values.order} pageSize={isMobile ? 4 : isTablet ? 6 : 10} keyword={values.search} page={values.page} />
          </div>
        </div>
      </section>
    </>
  );
}
