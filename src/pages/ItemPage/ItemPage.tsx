import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, LineDivider, StyledLink } from "@/styles/CommonStyles";
import { getProductDetail } from "@/api/itemApi";
import ItemProfileSection from "./components/ItemProfileSection";
import ItemCommentSection from "./components/ItemCommentSection";
import BackIcon from "@/assets/images/icons/ic_back.svg";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const BackToMarketPageLink = styled(StyledLink)<{$pill: boolean;}>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

function ItemPage() {
  const [product, setProduct] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // react-router-dom의 useParams 훅을 사용해 URL의 path parameter(상품 아이디)를 가져오세요.
  // Route에서 정의한 path parameter의 이름과 useParams 훅에서 사용하는 변수명이 일치해야 정상적으로 추출돼요.
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았어요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getProductDetail(productId);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // 데이터 fetching 오류 발생 시 UI
  // - 만약 서버에서 사용자 친화적으로 작성된 오류 메세지를 보내주지 않는다면 호출된 오류 메세지를 그대로 노출하는 것보다는 프론트단에서 별도의 내용을 넣어주는 것이 사용성에 좋아요
  if (error) {
    alert(`오류: ${error}`);
  }

  if (!productId || !product) return null;

  return (
    <>
      {/* 데이터를 불러올 동안 로딩 스피너 표시 */}
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productId} />

        {/* Styled-components에 사용자 정의 prop을 전달해 스타일링 시 참고사항:
        - 요소에 해당 HTML 태그의 기본 속성이 아닌 것이 추가되면 콘솔창에 "unknown prop"이 전달되고 있다는 경고가 뜰 수 있어요.
        - prop 이름 앞에 `$`를 붙여주면 styled-components가 `transient props`로 인식하고 DOM 요소에 전달되지 않도록 필터링해요.
      */}
        <BackToMarketPageLink $pill={true} to="/items">
          목록으로 돌아가기
          <img src={BackIcon} alt="뒤로가기 아이콘" />
        </BackToMarketPageLink>
      </Container>
    </>
  );
}

export default ItemPage;
