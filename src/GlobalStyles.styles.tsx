import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
*::before,
*::after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  font: inherit;
  font-family: "Rubik", sans-serif; 
}
html {
  color-scheme: dark light;
}
body {
  min-height: 100vh;
}
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}
li {
  list-style: none;
}

`;
