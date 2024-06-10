import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, LineDivider, StyledLink } from "@/styles/CommonStyles";
import { getProductDetail } from "@/api/itemApi";
import ItemProfileSection from "../../components/items/itemPage/ItemProfileSection";
import ItemCommentSection from "../../components/items/itemPage/ItemCommentSection";
import BackIcon from "@/public/images/icons/ic_back.svg";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product } from "@/types/productTypes";
import { useRouter } from "next/router";

const BackToMarketPageLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

const ItemPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const productId = Number(id);

  useEffect(() => {
    // router.query를 가져오기 전에 router가 준비되었는지 확인
    if (!router.isReady) return;

    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았어요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data: Product = await getProductDetail(productId);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error) {
        // error가 Error의 인스턴스인지 확인
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId, router.isReady]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!id || !product) return null;

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productId} />

        <BackToMarketPageLink $pill href="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackToMarketPageLink>
      </Container>
    </>
  );
};

export default ItemPage;
