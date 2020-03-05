import React, { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import {
  PageHeader,
  Button,
  Drawer,
  Row,
  Col,
  List,
  Tabs,
  Icon,
  Pagination,
  Spin,
  Alert,
  Menu
} from "antd";
import ResponsiveActions from "../../common/responsiveactions";
import CreateFormApp from "../createForm/createform";
import { responsiveDrawerWidth } from "../../../actions/types";
import { ac_fetchUserForms, ac_deleteForm } from "../formsDashboard/action";
import { ac_mapuserform, ac_unmapuserform } from "../userFormInput/action";
import { DATA_PER_PAGE, DATE_TIME_WORDINGS } from "../../../actions/types";
import UserFormInputs from "../userFormInput/fetchuserforminput";
import { reset } from "../../common/action";
import { USER_FORMS_RESET, DELETE_FORM_RESET } from "../types";
import { Link, withRouter } from "react-router-dom";
import { URL_FORMS, URL_FORMS_EDIT } from "../../common/url";
import moment from "moment";
import "../../../css/index.scss";
import "../../../css/bootstrap.scss";
const { TabPane } = Tabs;

/* Form dashboard class will show all forms of an user
it invokes 
    - UserFormInputs component to show user's draft and submitted input
    - CreateFormApp component to create new forms
*/

function Forms() {
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.myProfile);
  const userForms = useSelector(state => state.fetchUserForms);
  const deleteForm = useSelector(state => state.deleteForm);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedForm, setSelectedForm] = useState(null);

  let menu = [
    <Button
      type="link"
      onClick={() => {
        showDrawer("formDrawerVisible");
      }}
      icon="plus"
    >
      Add Form
    </Button>
  ];
  // To fetch the user forms
  useEffect(() => {
    dispatch(ac_fetchUserForms());
    return () => {
      /* 
      To clean up when component unmounts
      */
      // dispatch(reset(USER_FORMS_RESET));
      // dispatch(reset(DELETE_FORM_RESET));
    };
  }, []);

  const showDrawer = (drawer, formid = null) => {
    if (formid) {
      setSelectedForm(formid);
    }
    setFormDrawerVisible(true);
  };

  const onClose = drawer => {
    setFormDrawerVisible(false);
  };

  const pageChange = e => {
    dispatch(ac_fetchUserForms(e));
    setCurrentPage(e);
  };

  const onTabChange = e => {
    setCurrentTab(e);
  };

  const mapUserForm = e => {
    if (e.checked) {
      dispatch(ac_mapuserform({ form: selectedForm, user: e.value }));
    }
  };

  const unMapUserForm = e => {
    if (e.checked) {
      dispatch(ac_unmapuserform(e.value, selectedForm));
    }
  };

  const deleteFormAction = formid => {
    dispatch(ac_deleteForm(formid));
  };
  return (
    <Fragment>
      <PageHeader className="align-right page-header" />

      <Row className="content-section">
      <Col xs={24} sm={24} md={24} lg={24}>
          <Button
            type="primary"
            onClick={() => {
              showDrawer("formDrawerVisible");
            }}
            icon="plus"
            style={{'float': 'right'}}
          >
            Add Form
    </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Tabs onChange={onTabChange} defaultActiveKey="1">
            <TabPane tab="Forms" key="1">
              {deleteForm.isError ? (
                <Alert
                  type="error"
                  description={deleteForm.isError}
                  closable
                />
              ) : null}
              {userForms.isError ? (
                <Alert
                  type="error"
                  description={userForms.isError}
                  closable
                />
              ) : null}
              {userForms.isLoading ? (
                <Spin />
              ) : (
                  <Fragment>
                    <List
                      itemLayout="horizontal"
                      dataSource={userForms.forms ? userForms.forms : []}
                      renderItem={item => (
                        <List.Item
                          className="user-list"
                          actions={[
                            <Link
                              to={URL_FORMS + "/" + item.form.id.toString()}
                            >
                              <Icon type="eye" /> View
                            </Link>,
                            <Link
                              to={
                                URL_FORMS_EDIT + "/" + item.form.id.toString()
                              }
                            >
                              <Icon type="edit" /> Edit
                            </Link>,
                            <Button
                              type="link"
                              onClick={e => deleteFormAction(item.form.id)}
                              icon="delete"
                            >
                              Delete
                            </Button>,
                            <Button
                              type="link"
                              onClick={e =>
                                showDrawer(
                                  "userDrawerVisible",
                                  item.form.id
                                )
                              }
                              icon="share-alt"
                            >
                              Share
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            title={item.form.form_name}
                            description={
                              item.user.first_name +
                              " @" +
                              moment(item.form.last_updated_on).format(
                                DATE_TIME_WORDINGS
                              )
                            }
                          />
                        </List.Item>
                      )}
                    />
                    <Pagination
                      hideOnSinglePage={true}
                      current={currentPage}
                      onChange={pageChange}
                      defaultPageSize={DATA_PER_PAGE}
                      total={userForms.count}
                    />
                  </Fragment>
                )}
            </TabPane>
            <TabPane tab="Draft" key="2">
              {/* Need to unmount and re-mount the component, 
                                so UserFormInputs is re-rendered every time tab is changed and user selection list is 
                                changed.If we arenot re-rendering on tab change , both draft and sunmit will show same data */}
              {
                currentTab == "2" ? (
                  <UserFormInputs
                    // selectedUsers={}
                    status="draft"
                  />
                ) : null}
            </TabPane>
            <TabPane tab="Submit" key="3">
              {
                currentTab == "3" ? (
                  <UserFormInputs
                    // selectedUsers={}
                    status="submit"
                  />
                ) : null}
            </TabPane>
          </Tabs>
        </Col>
       
      </Row>
      <Drawer
        width={responsiveDrawerWidth}
        title="Create a new Form"
        onClose={() => onClose("formDrawerVisible")}
        visible={formDrawerVisible}
        destroyOnClose={true}
      >
        <CreateFormApp />
      </Drawer>
    </Fragment>
  );
}

export default Forms;
