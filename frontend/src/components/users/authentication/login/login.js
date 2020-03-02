import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Form, message } from "antd";

import { URL_FORGOT_PASSWORD } from "../../../common/url";

import { Styled } from "../../styled";
import { Styled as commonStyled } from "../../../common/styled";

import { loadUser, login } from "../login/action";
import { loadUserProfile } from "../../userProfile/action";

function LoginForm({ form, history }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);
  const token = useSelector(state => state.auth.token);
  const isError = useSelector(state => state.auth.isError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(err => {
      if (!err) {
        dispatch(login(form.getFieldValue("username"), form.getFieldValue("password")))
          .then(() => history.push("/"))
          .catch(() => onError());
      }
    });
  };

  const onChange = (key, value) => {
    form.setFieldsValue({ [key]: value });
  };

  const onError = () => {
    message.error("An error happened while signing in. Please try again.");
    form.setFieldsValue({ username: null, password: null });
  };
  const loginFormRules = {
    username: [
      {
        required: true,
        message: "Please input your username!"
      }
    ],
    password: [
      {
        required: true,
        message: "Please input your Password!"
      }
    ]
  };
  if (isAuthenticated) {
    dispatch(loadUserProfile())
    return <Redirect to="/" />;
  }
  return (
    <Styled.LoginSection>
      {isError && (
        <commonStyled.errorMessage
          message="Login Failed"
          description="Invalid username or password"
          type="error"
          closable
        />
      )}
      ;
      <Styled.LoginForm onSubmit={handleSubmit}>
        <Form.Item>
          {form.getFieldDecorator("username", {
            rules: loginFormRules.username
          })(
            <commonStyled.FormTextInput
              onChange={e => onChange("username", e.target.value)}
              size="large"
              name="username"
              prefix={<commonStyled.FormIcon type="user" />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {form.getFieldDecorator("password", {
            rules: loginFormRules.password
          })(
            <commonStyled.FormTextInput
              onChange={e => onChange("password", e.target.value)}
              size="large"
              name="password"
              prefix={<commonStyled.FormIcon type="lock" />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Link to={URL_FORGOT_PASSWORD}>Forgot password</Link>
          <commonStyled.submitButton
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
          >
            {isLoading ? "Loading" : "Login"}
          </commonStyled.submitButton>
        </Form.Item>
      </Styled.LoginForm>
    </Styled.LoginSection>
  );
}

const Login = Form.create({ name: "login" })(LoginForm);
export default Login;
