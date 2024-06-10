import Link from "next/link";
import RectangleButton from "@/components/Button/RectangleButton";
import styled from "styled-components";

export default function NotFound() {
  return (
    <>
      <NotFoundLayout>
        <Paragraph>
          찾을 수 없는 페이지입니다.
          <br />
          요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.
        </Paragraph>
        <RectangleButton type="button">
          <Link href="/">홈으로 이동</Link>
        </RectangleButton>
      </NotFoundLayout>
    </>
  );
}

const NotFoundLayout = styled.div`
  margin-top: 200px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 3rem;
  margin-bottom: 24px;
`;
