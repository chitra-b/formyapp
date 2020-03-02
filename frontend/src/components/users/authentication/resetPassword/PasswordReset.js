import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Form, Icon, Input, Button, Row, Col } from "antd";
import DjangoCSRFToken from "django-react-csrftoken";
import {
  acResetPassword,
  acResetPasswordConfirm
} from "../resetPassword/action";

const { Content } = Layout;

export class ResetPasswordForm extends Component {
  handleReset = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.acResetPassword(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleReset} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              onChange={this.onChange}
              name="email"
              prefix={
                <Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.isLoading}
            className="login-form-button"
          >
            {this.props.isLoading ? "Loading" : "Reset my password"}
          </Button>
        </Form.Item>
        <DjangoCSRFToken />
      </Form>
    );
  }
}

export class ResetPasswordConfirmForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("new_password1")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["new_password2"], { force: true });
    }
    callback();
  };
  handleResetConfirm = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          values["uid"] =  this.props.match.params.uid;
          values["token"] =  this.props.match.params.token
        this.props.acResetPasswordConfirm(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Layout>
        <Content>
          <Row
            className="content-container"
            type="flex"
            justify="center"
            align="middle"
          >
            <Col xs={24} sm={16} md={12} lg={8}>
      <Form onSubmit={this.handleResetConfirm} className="login-form">
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("new_password1", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("new_password2", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.isLoading}
            className="login-form-button"
          >
            {this.props.isLoading ? "Loading" : "Reset Password Confirm"}
          </Button>
        </Form.Item>
        <DjangoCSRFToken />
      </Form>
      </Col>
      </Row>
      </Content>
      </Layout>
    );
  }
}

const PasswordReset = Form.create({ name: "password_reset" })(
  ResetPasswordForm
);
const PasswordResetConfirm = Form.create({ name: "password_reset_confirm" })(
    ResetPasswordConfirmForm
);

const mapStateToProps = state => ({
  password_reset: state.resetPassword
});
export const PasswordResetForm = connect(mapStateToProps, {
  acResetPassword,
  acResetPasswordConfirm
})(PasswordReset);

export const PasswordResetConfirmForm = connect(mapStateToProps, {
    acResetPassword,
    acResetPasswordConfirm
  })(PasswordResetConfirm);
