declare module "*.svg" {
  import * as React from "react";

  // ReactComponent는 SVG를 React 컴포넌트로 사용할 수 있게 합니다.
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  // 타입스크립트는 SVG 모듈의 ReactComponent를 default export로 처리하지 않기 때문에, ReactComponent와 SVG 파일의 경로(src)를 함께 export 해주어야 합니다.
  const src: string;
  export default src;
}

declare module "*.png" {
  const value: string;
  export default value;
}
