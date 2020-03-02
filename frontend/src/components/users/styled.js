import styled from "styled-components/macro";
import Section from "../layout/section";
import { Icon, Form, Button} from "antd";
import {colorVariables} from "../../utils/variables"

const LoginSection = styled(Section)`
text-align: center;
border-radius: 1.5rem;
margin:auto;
padding: 1.5rem;
background: #fff;
`;

const UserProfileSection = styled(Section)`
text-align: center;
border-radius: 0.5rem;
border-left: 25px solid ${colorVariables.primary};
margin:auto;
padding: 1.5rem;
background: #fff;
width: 80%;
`;

const LoginForm = styled(Form)`
  border-radius: 0.5rem;
  padding: 1rem;
`;

const UserProfileForm = styled(Form)`
  border-radius: 0.5rem;
  padding: 1rem;
  width: 40rem;
`;

const EditButton = styled(Button)`
float: right;
`;


export const Styled = {LoginSection, LoginForm, UserProfileForm, UserProfileSection, EditButton };
