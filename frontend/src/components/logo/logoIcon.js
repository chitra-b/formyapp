import React from "react";
import {Icon} from "antd";
import styled from "styled-components/macro";
import { colorVariables} from "../../utils/variables"

const StyledIcon = styled(Icon)`
color: ${colorVariables.primary};
font-size: 32px;
`;

export default function LogoIcon() {
    return (<StyledIcon type="form" />);
}