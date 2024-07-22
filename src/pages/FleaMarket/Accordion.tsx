import { useState } from 'react';
import { styled } from 'styled-components';
import arrow from '../../assets/arrowDown.svg';

interface AccordionItem {
  label: string;
  onClick: () => void;
}

interface AccordionProps {
  items: AccordionItem[];
}

function Accordion({ items }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledAccordion>
      <StyledButton onClick={toggleOpen}>
        <Text>최신순</Text>
        <ArrowDown src={arrow} alt="아래 화살표" />
      </StyledButton>
      {isOpen && (
        <AccList>
          {items.map((item, index) => (
            <AccEle key={index} onClick={item.onClick}>
              {item.label}
            </AccEle>
          ))}
        </AccList>
      )}
    </StyledAccordion>
  );
}

const StyledAccordion = styled.div``;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  height: 42px;
  padding: 12px 20px;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const ArrowDown = styled.img``;

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

export default Accordion;
