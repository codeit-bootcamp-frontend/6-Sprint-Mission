import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
// 프로젝트 통일을 위해 기존 global.css를 삭제하고, GlobalStyle.ts 파일에 전역 스타일을 넣어줄게요.

// < Typescript 전환 >
// index.js를 index.tsx로 전환할 때 컴파일러 오류 및 타입스크립트 오류가 떴을 거예요.
// document.getElementById의 반환 값이 HtmlElement | null 타입이기 때문인데, 이는 document.getElementById는 기본적으로 해당 ID를 가진 요소가 존재하지 않을 경우 null을 반환하기 때문입니다.
// 하지만 리액트 프로젝트 같은 경우에는 public/index.html에 "root" ID를 가진 div 요소가 반드시 존재하도록 되어 있기 때문에, `document.getElementById("root")`이 null이 아니라는 것을 타입스크립트에게 명시하면 됩니다.
// 방법 1: 아래 예시처럼 `as ~`로 표현되는 inline typecasting을 사용해 항상 특정 타입으로써 해당 요소를 사용하도록 하는 방법.
// 방법 2: `document.getElementById("root")!` 이렇게 타입스크립트에서 non-null assertion operator로 사용되는 느낌표를 붙여 해당 요소가 null 또는 undefined가 아님을 강제하는 방법.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* Styled-components에서는 createGlobalStyle 함수로 생성된 GlobalStyle 컴포넌트를 통해 전역적으로 CSS를 적용할 수 있어요 */}
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
