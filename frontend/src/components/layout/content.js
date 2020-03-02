import React from "react";
import { Layout } from "antd";
import styled from "styled-components/macro";

export const maxContentWidth = "140rem";

const StyledContent = styled(Layout.Content)`
  padding: ${({ givepadding }) => (givepadding ? "1.5rem" : "0.15rem")};
  margin-right: auto;
  margin-left: auto;
  width: 1000px;
  display:flex;
  max-width: ${maxContentWidth};

  // @media (min-width: 768px) {
  // }
  
  // @media (min-width: 992px) {
  //   width: calc(100% - 8rem);
  // }
  
  // @media (min-width: 1200px) {
  // }
`;

export default function Content({ children, givepadding }) {
  return <StyledContent givepadding={givepadding}>{children}</StyledContent>;
}
