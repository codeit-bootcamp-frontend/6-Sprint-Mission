"use client";
import { getBoardList } from "@/app/api/board";
import styles from "@/styles/boardList.module.css";
import BoardItem from "./boardItem";
import { IBoard } from "@/@types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BoardList() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [order, setOrder] = useState("recent");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleOrderChange = (value: string) => {
    setOrder(value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBoard(order, search, 1);
    }, 250); // 250ms 디바운싱 적용

    return () => clearTimeout(timer); // 이전 타이머 해제
  }, [order, search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchBoard(order, search, page); // 타겟이 보이면 데이터 가져오기
        }
      },
      {
        threshold: 1.0, //대상 요소가 완전히 보일 때 콜백이 실행
        /*
          대상 요소가 얼마나 보였을 때 콜백이 실행될 지 결정
          0.5: 절반, 
          0: 조금이라도 보이면 콜백 실행
        */
      }
    );

    const observeTarget = observerRef.current;

    if (observeTarget) {
      observer.observe(observeTarget);
    }

    return () => {
      if (observeTarget) {
        observer.unobserve(observeTarget);
        // 현재 관찰 중인 대상을 관찰 해지
      }
    };
  }, [order, search, page]);

  const fetchBoard = async (order: string, search: string, page: number) => {
    const fetchedboard = await getBoardList({
      page: page,
      pageSize: 10,
      orderBy: order,
      keywords: search,
    });
    if (page === 1) {
      setBoards(fetchedboard);
    } else {
      setBoards((prevBoards) => [...prevBoards, ...fetchedboard]);
    }
    setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
  };

  return (
    <div>
      <div className={styles.boardListHeader}>
        <h3>게시글</h3>
        <Link href="/board/addBoard" className="primaryBtn">
          글쓰기
        </Link>
      </div>
      <div className={styles.boardListSearch}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            onChange={handleSearchChange}
          />
          <Image
            src="/images/ic_search.png"
            alt="search icon"
            width={15}
            height={15}
          />
        </div>
        <select
          onChange={(e) => {
            handleOrderChange(e.target.value);
          }}
        >
          <option value="recent">최신순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>
      <div className={styles.boardListContents}>
        {boards.map((board) => {
          return (
            <Link key={board.id} href={`/board/${board.id}`} prefetch>
              <BoardItem board={board} />
            </Link>
          );
        })}

        <div ref={observerRef} className={styles.observer}>
          {/* IntersectionObserver의 타겟 요소 */}
        </div>
      </div>
    </div>
  );
}
