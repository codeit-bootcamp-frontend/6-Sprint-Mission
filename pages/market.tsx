import SearchForm from "@/components/SearchForm";

import { useRouter } from "next/router";

export default function MarketPage() {
  const router = useRouter();
  const { q } = router.query;

  const searchQuery = Array.isArray(q) ? q[0] : q;
  return (
    <>
      <h2>중고 마켓 구경 하실래요</h2>
      <SearchForm keyword={searchQuery} />
      <h2>{q} 검색결과</h2>
    </>
  );
}
