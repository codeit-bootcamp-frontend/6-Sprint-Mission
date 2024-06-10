import styled from "styled-components";
import EmptyStateImage from "@/public/images/ui/empty-comments.svg";
import Image from "next/image";

const EmptyStateContainer = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 16px;
  line-height: 24px;
`;

interface EmptyStateProps {
  text: string;
  imageComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const EmptyState = ({ text }: EmptyStateProps) => {
  return (
    <EmptyStateContainer>
      <Image src={EmptyStateImage} alt="빈 이미지" />
      <EmptyStateText>{text}</EmptyStateText>
    </EmptyStateContainer>
  );
};

export default EmptyState;
