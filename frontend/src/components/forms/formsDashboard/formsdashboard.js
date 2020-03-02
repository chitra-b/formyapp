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
  console.log(menu);
//  let menu_1 = menu
//     ? menu.map((item, idx) => <Menu.Item key={idx}>{item}</Menu.Item>)
//     : "";

//     console.log(menu_1);
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
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <ResponsiveActions controls={menu} controlsname="Forms" />
          </Col>
        </Row>
        <Row className="content-section">
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

// class Forms extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formDrawerVisible: false,
//       userDrawerVisible: false,
//       currentPage: 1,
//       currentTab: 1,
//       selectedForm: null,
//       selectedUsers: [],
//       selectedUserChanging: false
//     };
//     this.props.ac_fetchUserForms();
//   }
//   componentWillUnmount() {
//     this.props.reset(USER_FORMS_RESET);
//     this.props.reset(DELETE_FORM_RESET);
//   }
//   showDrawer = (drawer, formid = null) => {
//     if (formid) {
//       //to share access to the users we need to know the selected form
//       this.setState(
//         {
//           selectedForm: formid
//         },
//         this.setState({
//           [drawer]: true
//         })
//       );
//     }
//     this.setState({
//       [drawer]: true
//     });
//   };
//   onClose = drawer => {
//     this.setState({
//       [drawer]: false
//     });
//   };
//   editForm = (id, e) => {};
//   getSelectedUsers = users => {
//     this.setState({ selectedUserChanging: true, selectedUsers: users }, () => {
//       this.props.ac_fetchUserForms(1, users);
//       this.setState({ selectedUserChanging: false });
//     });
//   };
//   pageChange = e => {
//     this.props.ac_fetchUserForms(e);
//     this.setState({ currentPage: e });
//   };
//   onTabChange = e => {
//     this.setState({ currentTab: e });
//   };
//   mapUserForm = e => {
//     if (e.checked) {
//       ac_mapuserform({ form: this.state.selectedForm, user: e.value });
//     }
//   };
//   unMapUserForm = e => {
//     if (e.checked) {
//       ac_unmapuserform(e.value, this.state.selectedForm);
//     }
//   };
//   deleteForm = formid => {
//     this.props.ac_deleteForm(formid);
//   };
//   render() {
//     let menu = [
//       <Button
//         type="link"
//         onClick={() => {
//           this.showDrawer("formDrawerVisible");
//         }}
//         icon="plus"
//       >
//         Add Form
//       </Button>
//     ];
//     let user_forms = this.props.re_fetchUserForms;
//     let myProfile = this.props.re_myProfile;
//     let delete_form = this.props.re_deleteForm;
//     return (
//       <Fragment>
//         <PageHeader className="align-right page-header" />
//         <Row>
//           <Col xs={24} sm={24} md={24} lg={24}>
//             <ResponsiveActions controls={menu} controlsname="Forms" />
//           </Col>
//         </Row>
//         <Row className="content-section">
//           <Col xs={24} sm={24} md={24} lg={24}>
//             <Tabs onChange={this.onTabChange} defaultActiveKey="1">
//               <TabPane tab="Forms" key="1">
//                 {delete_form.isError ? (
//                   <Alert
//                     type="error"
//                     description={delete_form.isError}
//                     closable
//                   />
//                 ) : null}
//                 {user_forms.isError ? (
//                   <Alert
//                     type="error"
//                     description={user_forms.isError}
//                     closable
//                   />
//                 ) : null}
//                 {user_forms.isLoading ? (
//                   <Spin />
//                 ) : (
//                   <Fragment>
//                     <List
//                       itemLayout="horizontal"
//                       dataSource={user_forms.forms ? user_forms.forms : []}
//                       renderItem={item => (
//                         <List.Item
//                           className="user-list"
//                           actions={[
//                             <Link
//                               to={URL_FORMS + "/" + item.form.id.toString()}
//                             >
//                               <Icon type="eye" /> View
//                             </Link>,
//                             <Link
//                               to={
//                                 URL_FORMS_EDIT + "/" + item.form.id.toString()
//                               }
//                             >
//                               <Icon type="edit" /> Edit
//                             </Link>,
//                             <Button
//                               type="link"
//                               onClick={e => this.deleteForm(item.form.id)}
//                               icon="delete"
//                             >
//                               Delete
//                             </Button>,
//                             <Button
//                               type="link"
//                               onClick={e =>
//                                 this.showDrawer(
//                                   "userDrawerVisible",
//                                   item.form.id
//                                 )
//                               }
//                               icon="share-alt"
//                             >
//                               Share
//                             </Button>
//                           ]}
//                         >
//                           <List.Item.Meta
//                             title={item.form.form_name}
//                             description={
//                               item.user.first_name +
//                               " @" +
//                               moment(item.form.last_updated_on).format(
//                                 DATE_TIME_WORDINGS
//                               )
//                             }
//                           />
//                         </List.Item>
//                       )}
//                     />
//                     <Pagination
//                       hideOnSinglePage={true}
//                       current={this.state.currentPage}
//                       onChange={this.pageChange}
//                       defaultPageSize={DATA_PER_PAGE}
//                       total={user_forms.count}
//                     />
//                   </Fragment>
//                 )}
//               </TabPane>
//               <TabPane tab="Draft" key="2">
//                 {/* Need to unmount and re-mount the component, 
//                                 so UserFormInputs is re-rendered every time tab is changed and user selection list is 
//                                 changed.If we arenot re-rendering on tab change , both draft and sunmit will show same data */}
//                 {!this.state.selectedUserChanging &&
//                 this.state.currentTab == "2" ? (
//                   <UserFormInputs
//                     selectedUsers={this.state.selectedUsers}
//                     status="draft"
//                   />
//                 ) : null}
//               </TabPane>
//               <TabPane tab="Submit" key="3">
//                 {!this.state.selectedUserChanging &&
//                 this.state.currentTab == "3" ? (
//                   <UserFormInputs
//                     selectedUsers={this.state.selectedUsers}
//                     status="submit"
//                   />
//                 ) : null}
//               </TabPane>
//             </Tabs>
//           </Col>
//         </Row>
//         <Drawer
//           width={responsiveDrawerWidth}
//           title="Create a new Form"
//           onClose={() => this.onClose("formDrawerVisible")}
//           visible={this.state.formDrawerVisible}
//           destroyOnClose={true}
//         >
//           <CreateFormApp />
//         </Drawer>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   re_fetchUserForms: state.fetchUserForms,
//   re_deleteForm: state.deleteForm,
//   re_myProfile: state.myProfile
// });
// export default connect(mapStateToProps, {
//   ac_fetchUserForms,
//   reset,
//   ac_deleteForm
// })(withRouter(Forms));

export default Forms;
