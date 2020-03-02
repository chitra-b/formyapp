import React from "react";
import styled from "styled-components/macro";
import {colorVariables} from "../../utils/variables";

const Styled = {
    LogoContainer: styled.div `
    display: inline-block;
    margin-left: 20px;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.4rem;
    color: ${colorVariables.text};
    font-family: Trebuchet MS,sans-serif;
    `
};

export default function LogoLetters() {
    // const image_dims = { height: 35 };
    return (
        <Styled.LogoContainer>
        <div>formy</div>
        </Styled.LogoContainer>
    )
}