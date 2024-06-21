import React, { useState, useEffect } from "react";
import styles from "@/styles/PageButton.module.css";

interface Props {
  page: number;
  handlePage: (value: number) => void;
  totalCount: number;
}

const PAGE_SIZE = 5;

const PageButton = ({ totalCount, handlePage, page }: Props) => {
  const [isPageDownBtnDisabled, setIsPageDownBtnDisabled] = useState(true);
  const [isPageUpBtnDisabled, setIsPageUpBtnDisabled] = useState(false);
  const totalPages = totalCount / PAGE_SIZE;

  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getButtonValue = (value: number) => {
    handlePage(value);
  };

  const handlepageDown = () => {
    if (page > 1) {
      handlePage(page - 1);
    }
  };
  const handlepageUp = () => {
    if (page < pageArr.length) {
      handlePage(page + 1);
    }
  };

  const setPageFirst = () => {
    if (page > 1) {
      handlePage(1);
    }
  };
  const setPageLast = () => {
    if (page < pageArr.length) {
      handlePage(pageArr.length);
    }
  };

  useEffect(() => {
    if (page > 1) {
      setIsPageDownBtnDisabled(false);
    } else {
      setIsPageDownBtnDisabled(true);
    }
    if (page >= pageArr.length && pageArr.length !== 0) {
      setIsPageUpBtnDisabled(true);
    } else {
      setIsPageUpBtnDisabled(false);
    }
  }, [pageArr, page]);

  return (
    <div className={styles.button}>
      <button disabled={isPageDownBtnDisabled} className={styles["page-side-btn"]} onClick={setPageFirst}>
        &lt;&lt;
      </button>
      <button disabled={isPageDownBtnDisabled} className={styles["page-side-btn"]} onClick={handlepageDown}>
        &lt;
      </button>
      {pageArr.map((num) => {
        const isVisible =
          page > PAGE_SIZE ? num >= page - (PAGE_SIZE - 1) && num <= page + (PAGE_SIZE - 1) : num >= 1 && num <= 9;
        return (
          isVisible && (
            <button
              className={styles[page === num ? "page-btn-active" : "page-btn"]}
              key={num}
              onClick={() => getButtonValue(num)}
              value={num}
            >
              {num}
            </button>
          )
        );
      })}
      <button disabled={isPageUpBtnDisabled} className={styles["page-side-btn"]} onClick={handlepageUp}>
        &gt;
      </button>
      <button disabled={isPageUpBtnDisabled} className={styles["page-side-btn"]} onClick={setPageLast}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default PageButton;
