import { Layout, message } from "antd";
import _get from "lodash/get";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { PageLayout } from "../customAntd";
import { URL_SIGN_IN } from "../common/url";
import Content from "../layout/content";
import Footer from "../layout/footer";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
// import usePrevious from "../utils/usePrevious";


export default withRouter(Main);

function Main({ children, ...props }) {
  // const { isAuthenticated, user } = useSelector(state => state.user);

  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebarCollapse = () => setCollapsed(!collapsed);
  const dispatch = useDispatch();

  // const logOut = () => {
  //   dispatch(userActions.signOut()).then(() => navigateToSignIn());
  // };

  // const navigateToSignIn = useCallback(() => props.history.push(URL_SIGN_IN), [
  //   props.history
  // ]);

  // const prevUser = usePrevious(user);
  // useEffect(() => {
  //   // check for authentication
  //   if (!isAuthenticated) navigateToSignIn();
  //   else if (_get(user, "id") && !_get(prevUser, "id")) {
  //     dispatch(userActions.fetchUser(user.id)).catch(e => {
  //       message.error(e.message);
  //       navigateToSignIn();
  //     }); // fetch user details on every refresh
  //   }
  // }, [navigateToSignIn, isAuthenticated, dispatch, user, prevUser]);

  return (
    <PageLayout>
      <Header/>
      <Layout>
        {/* <Sidebar
          collapsed={collapsed}
          onCollapse={toggleSidebarCollapse}
          history={props.history}
        /> */}
        <Content>
          {React.cloneElement(children, props)}
        </Content>
      </Layout>
      <Footer />
    </PageLayout>
  );
}
