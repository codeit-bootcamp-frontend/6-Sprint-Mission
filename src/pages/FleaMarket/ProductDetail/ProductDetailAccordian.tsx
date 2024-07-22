import { styled } from 'styled-components';

interface ProductDetailAccordianItem {
  label: string;
  onClick: () => void;
}

interface ProductDetailAccordianProps {
  items: ProductDetailAccordianItem[];
  isOpen: boolean;
}

function ProductDetailAccordian({
  items,
  isOpen,
}: ProductDetailAccordianProps) {
  return (
    <StyledProductDetailAccordian>
      {isOpen && (
        <AccList>
          {items.map((item, index) => (
            <AccEle key={index} onClick={item.onClick}>
              {item.label}
            </AccEle>
          ))}
        </AccList>
      )}
    </StyledProductDetailAccordian>
  );
}

const StyledProductDetailAccordian = styled.div``;

const AccList = styled.ul`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 130px;
  height: 84px;
  border-radius: 12px;
  background: white;
`;

const AccEle = styled.li`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  padding: 9px 22px;
  text-align: center;
  cursor: pointer;

  &:first-of-type {
    border-bottom: 1px solid #e5e7eb;
  }
`;

export default ProductDetailAccordian;
