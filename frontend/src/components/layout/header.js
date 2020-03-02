import React from "react";
import {Layout} from "antd";
import styled from "styled-components/macro";
import {colorVariables} from "../../utils/variables";
import LogoIcon from "../logo/logoIcon";
import LogoLetters from "../logo/logoLetters"
import UserMenu from "./dropdownMenu"

const Styled = {
Header: styled(Layout.Header)`
display: flex;
flex-wrap: nowrap;
justify-content: space-between;
background: ${colorVariables.black};
`,
    LeftContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `
};

export default function Header() {
    return <Styled.Header>
        <Styled.LeftContainer>
        <LogoIcon/>
        <LogoLetters/>
        </Styled.LeftContainer>
        <UserMenu/>
    </Styled.Header>
}