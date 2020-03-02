import styled from "styled-components/macro";
import { Alert, Button, Icon, Input } from "antd";
import { colorVariables} from "../../utils/variables"
import { Typography } from 'antd';

const { Title } = Typography;

const errorMessage = styled(Alert)`
`;

const submitButton = styled(Button)`
width: 100%;
background-color: ${colorVariables.button};
border: 1px solid ${colorVariables.button};
`;

const FormIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

const FormTextInput = styled(Input)`
color: rgba(0, 0, 0, 0.25);
`;

const styledTitle = styled(Title)`
color: ${colorVariables.secondary} !important;
float: left;
`;

export const Styled = { errorMessage, submitButton, FormIcon, FormTextInput, styledTitle};