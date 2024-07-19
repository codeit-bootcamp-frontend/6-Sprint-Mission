import getArticles from "@/apis/article/getArticles";
import getProducts from "@/apis/product/getProducts";
import AllProduct from "@/components/itemsComponents/AllProduct";
import BestProducts from "@/components/itemsComponents/BestProducts";
import ControlBar from "@/components/itemsComponents/ControlBar";
import Header from "@/components/shared/Header/Header";
import { GetArticlesResponse } from "@/types/articles";
import { useQuery } from "@tanstack/react-query";

export async function getServerSideProps() {
  const Products = await getProducts();
  return { props: { Products } };
}

function Items({ Products }: { Products: GetArticlesResponse }) {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getProducts(), // 리액트 쿼리 수업이나 들어라 ㅋㅋㅋ
    initialData: Products,
  });

  console.log(data);
  return (
    <div>
      <Header />
      <h1>베스트 상품</h1>
      <BestProducts />
      <div>
        <h1>전체 상품</h1>
        <ControlBar />
      </div>
      <AllProduct />
    </div>
  );
}

export default Items;
