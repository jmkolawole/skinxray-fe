import { createGlobalStyle } from 'styled-components';
import { fonts, colors, styleObjToStr } from './index';
import { FONT_FAMILY } from './utils/theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

  :root {
    --toastify-icon-color-error: ${colors.destructive[600]};
    --toastify-color-progress-error: ${colors.destructive[600]};
    font-family: ${FONT_FAMILY};
    color: ${colors.neutral[900]};
    background-color: ${colors.shades[0]};
  }

  [data-theme='dark'] {
    color-scheme: dark;
  }

  body {
    margin: 0;
    font-family: ${FONT_FAMILY};
    background: ${({ theme }) => theme?.colors?.background?.main || colors.shades[200]};
    color: ${({ theme }) => theme?.colors?.text?.primary || colors.neutral[900]};
    transition: background 0.25s ease, color 0.25s ease;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  h1 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h1)}
  }
  h2 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h2)}
  }
  h3 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h3)}
  }
  h4 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h4)}
  }
  h5 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h5)}
  }
  h6 {
    margin: 0;
    ${styleObjToStr(fonts.heading.h6)}
  }
  p, a {
    text-decoration: none;
    margin: 0;
    ${styleObjToStr(fonts.p.md)}
  }
`;

export default GlobalStyle;
