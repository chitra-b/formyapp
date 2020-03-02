import React, { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import FormBuilder from "antd-form-builder";

import { Styled } from "../styled";
import { Styled as commonStyled } from "../../common/styled";

import { loadUserProfile, updateProfile } from "../userProfile/action";
import UserProfilePic from "./userprofilepic";
import Section from "../../layout/section";
import { Link } from "react-router-dom";
import { Tabs, Spin, Form, Button, message, Row, Col } from "antd";
const { TabPane } = Tabs;

function UserProfileForm({ form }) {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.myProfile);
  const isLoading = useSelector(state => state.myProfile.isLoading);
  const isUpdated = useSelector(state => state.myProfileUpdate.isUpdated);
  const [viewMode, setViewMode] = useState(true);
  const [pending, setPending] = useState(false);
  const [profileInfo, setProfileInfo] = useState(myProfile.user);
  // fetch User Profile Data
  useEffect(() => {
    dispatch(loadUserProfile());
    if (isUpdated) {
      setPending(false);
      setViewMode(true);
      message.success("Profile updated successfully");
    }
  }, [isUpdated]);
  const meta = {
    columns: 1,
    disabled: pending,
    fields: [
      { key: "username", label: "Username" },
      { key: "first_name", label: "First Name", required: true },
      { key: "last_name", label: "Last Name", required: true },
      { key: "email", label: "Email", required: true }
    ]
  };
  const handleSubmit = useCallback(
    async evt => {
      evt.preventDefault();
      const values = form.getFieldsValue();
      setPending(true);
      await dispatch(updateProfile(profileInfo.id, values));
    },
    [form]
  );

  return (
    <Styled.UserProfileSection>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <commonStyled.styledTitle level={3}>
            Profile Infomation
            </commonStyled.styledTitle>
            {viewMode && (
              <Styled.EditButton
                type="link"
                onClick={() => setViewMode(false)}
              >
                Edit
              </Styled.EditButton>
            )}
          
        </Col>
      </Row>
      <Row>
        <Col xs={10} sm={10} md={10} lg={10}>
          <UserProfilePic userData={profileInfo}></UserProfilePic>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Styled.UserProfileForm layout="horizontal" onSubmit={handleSubmit}>
            <FormBuilder
              form={form}
              meta={meta}
              initialValues={profileInfo}
              viewMode={viewMode}
            />
            {!viewMode && (
              <Form.Item
                className="form-footer"
                // wrapperCol={{ span: 16, offset: 4 }}
              >
                <Button htmlType="submit" type="primary" disabled={pending}>
                  {pending ? "Updating..." : "Update"}
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setViewMode(true);
                  }}
                  style={{ marginLeft: "15px" }}
                >
                  Cancel
                </Button>
              </Form.Item>
            )}
          </Styled.UserProfileForm>
        </Col>
      </Row>
    </Styled.UserProfileSection>
  );
}

const UserProfile = Form.create({ name: "user_profile" })(UserProfileForm);
export default UserProfile;
