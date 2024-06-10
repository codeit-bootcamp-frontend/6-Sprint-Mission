import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --gray-900: #111827;
    --gray-800: #1F2937;
    --gray-700: #374151;
    --gray-600: #4b5563;
    --gray-500: #6b7280;
    --gray-400: #9ca3af;
    --gray-200: #e5e7eb;
    --gray-100: #f3f4f6;
    --gray-50: #f9fafb;
    --blue: #3692ff;
    --red: #f74747;
    --header-height: 70px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  button {
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    cursor: pointer;
  }

  img, svg {
    vertical-align: bottom;
  }

  body {
    color: var(--gray-700);
    word-break: keep-all;
    font-family: "Pretendard", sans-serif;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background-color: #ffffff;
    border-bottom: 1px solid #dfdfdf;
    z-index: 999;
  }

  .withHeader {
    margin-top: var(--header-height);
  }

  .button {
    background-color: var(--blue);
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .button:hover {
    background-color: #1967d6;
  }

  .button:focus {
    background-color: #1251aa;
  }

  .button:disabled {
    background-color: var(--gray-400);
    cursor: default;
    pointer-events: none;
  }

  .pill-button {
    font-size: 16px;
    font-weight: 600;
    border-radius: 999px;
    padding: 14.5px 33.5px;
  }

  .full-width {
    width: 100%;
  }

  .break-on-desktop {
    display: none;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    header {
      padding: 0 24px;
    }

    .pill-button {
      font-size: 20px;
      font-weight: 700;
      padding: 16px 126px;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    header {
      padding: 0 200px;
    }

    .break-on-desktop {
      display: inline;
    }
  }
`;

export default GlobalStyle;
