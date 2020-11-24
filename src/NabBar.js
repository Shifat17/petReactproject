import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes} from "@emotion/core";
import colors from "./colors";
const Spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;



const NavBar = () => (
  <header
    css={css`
      background-color: ${colors.dark};
      position: sticky;
      top: 0;
      z-index: 10;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <span
  css={css`
    display: inline-block;
    font-size: 60px;
  `}
  aria-label="logo"
  role="img"
>
  🐩
</span>;
  
  </header>
);

export default NavBar;