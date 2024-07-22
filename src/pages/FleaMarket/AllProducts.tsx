import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import ProductContainer from './ProductContainer';
import DefaultButton from '../../common/DefaultButton';
import Accordion from './Accordion';
import readingGlasses from '../../assets/readingGlasses.svg';
import { Product } from '../../types';

interface AllProsProps {
  products: Product['list'];
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
}

function AllProducts({ products, setOrderBy }: AllProsProps) {
  const handleRecent = () => {
    setOrderBy('recent');
  };

  const handleFavorite = () => {
    setOrderBy('favorite');
  };

  const accordionItems = [
    { label: '최신순', onClick: handleRecent },
    { label: '좋아요순', onClick: handleFavorite },
  ];

  return (
    <AllProductsContainer>
      <AllProductsHeader>
        <Title>전체 상품</Title>
        <div>
          <InputForm>
            <Input placeholder="검색할 상품을 입력해주세요" />
            <Icon src={readingGlasses} />
            <Link to="/additem">
              <StyledButton>상품 등록하기</StyledButton>
            </Link>
            <Accordion items={accordionItems} />
          </InputForm>
        </div>
      </AllProductsHeader>

      <AllProductsLayout>
        {products?.map((product) => (
          <ProductContainer
            key={product.id}
            src={product.images}
            alt={product.name}
            description={product.name}
            price={product.price}
            favoriteCount={product.favoriteCount}
            productId={product.id}
          />
        ))}
      </AllProductsLayout>
    </AllProductsContainer>
  );
}

const AllProductsContainer = styled.div`
  margin-bottom: 40px;
`;

const AllProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: var(--main-text-color);
  margin-bottom: 16px;
`;

const InputForm = styled.form`
  position: relative;
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  width: 352px;
  height: 42px;
  background: #f3f4f6;
  padding: 9px 0 9px 44px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--input-color);
  }
`;

const Icon = styled.img`
  position: absolute;
  padding: 13px 20px;
`;

const StyledButton = styled(DefaultButton)`
  background-color: var(--main-color);
`;

const AllProductsLayout = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 24px;
`;

export default AllProducts;
