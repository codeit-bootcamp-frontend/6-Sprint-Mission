import { useEffect, useState } from "react";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";

// 렌더링 중인 컴포넌트들을 가리기 위해 불투명한 흰색 바탕 위에 반투명한 검정 바탕의 overlay를 씌웠어요
const MaskedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9998;
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// 데이터 로딩 중임을 사용자에게 알려주는 UI
// - 대표적으로 로딩 스피너가 많이 사용되고, 라이브러리 또는 이미지(gif, lottie animation) 등으로 구현할 수 있어요.
// - 요소가 렌더링되기 전까지 비슷한 형태의 placeholder 레이아웃를 띄워주는 `skeleton` 로딩도 선호되는 방식이에요.
// - 이번 미션에서는 `react-spinners`라는 라이브러리를 이용해 간단한 로딩 스피너를 적용해 볼게요.

interface LoadingSpinnerProps {
  isLoading: boolean;
  size?: number; // 컴포넌트 내에서 디폴트 값을 부여한 경우엔 `?`를 사용해 optional props로 설정해 주세요
  color?: string;
  minLoadTime?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  size = 20,
  color = "var(--blue)",
  minLoadTime = 500,
}) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  // 로딩이 너무 빨라서 로딩 스피너가 순간적으로 나타났다 사라지는 것을 방지하기 위해 설정된 최소시간 동안은 스피너가 떠있도록 했어요.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  return isVisible ? (
    <MaskedBackground>
      <SpinnerOverlay>
        <PulseLoader size={size} color={color} />
      </SpinnerOverlay>
    </MaskedBackground>
  ) : null;
};

export default LoadingSpinner;
