import React from "react";
import {Layout} from "antd";
import styled from "styled-components/macro";

const StyledFooter = styled(Layout.Footer)`
text-align: center;
`;

export default function Footer() {
    return <StyledFooter>Formy</StyledFooter>
}