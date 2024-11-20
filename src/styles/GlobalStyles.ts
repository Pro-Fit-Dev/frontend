import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #ffffff;
    overflow-x: hidden;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;
