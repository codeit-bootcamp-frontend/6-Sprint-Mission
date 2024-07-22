import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, LineDivider, StyledLink } from '../../styles/CommonStyles';
import { getProductDetail } from '../../api/itemApi';
import ItemProfileSection from './components/ItemProfileSection';
import ItemCommentSection from './components/ItemCommentSection';
import { ReactComponent as BackIcon } from '../../assets/images/icons/ic_back.svg';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Product } from '../../types/ProductTypes';

const BackToMarketPageLink = styled(StyledLink)<{ $pill?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
`;

function ItemPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { productId } = useParams();

  const productIdNumber = Number(productId);

  useEffect(() => {
    async function fetchProduct() {
      if (!productIdNumber) {
        setError('상품 아이디가 제공되지 않았어요.' || '');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data: Product = await getProductDetail(productIdNumber);
        if (!data) {
          throw new Error('해당 상품의 데이터를 찾을 수 없습니다.');
        }
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productIdNumber]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!productId || !product) return null;

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />

      <Container>
        <ItemProfileSection product={product} />

        <LineDivider />

        <ItemCommentSection productId={productIdNumber} />

        <BackToMarketPageLink $pill="true" to="/items">
          목록으로 돌아가기
          <BackIcon />
        </BackToMarketPageLink>
      </Container>
    </>
  );
}

export default ItemPage;
