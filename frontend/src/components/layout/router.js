import React from "react";
import { Route, Switch } from "react-router-dom";
// import Navbar from "./common/sidebar";
import Main from "../container/main";
import Login from "../users/authentication/login/login";
import Forms from "../forms/formsDashboard/formsdashboard";
import EditForm from "../forms/editForm/editform";
import ViewForm from "../forms/viewForm/viewform";
import UserProfile from "../users/userProfile/user";
import { PasswordResetForm,PasswordResetConfirmForm} from "../users/authentication/resetPassword/PasswordReset";
import { logout } from "../users/authentication/login/action";
import { loadUserProfile } from "../users/userProfile/action";
import { Link } from "react-router-dom";
import * as URL from "../common/url";
// import SignIn from "../../pages/authentication/SignIn";
// import Authentication from "../container/Authentication";


const MainRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <Main path={rest.path}>
            <Component {...props} />
          </Main>
        );
      }}
    />
  );
};

// const AuthRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (
//       <Authentication>
//         <Component {...props} />
//       </Authentication>
//     )}
//   />
// );

const routes = {
  main: [
    {
      path: URL.URL_FORMS,
      component: Forms
    },
    {
      path: `/login`,
      component: Login
    },
    { path: `/profile`, component: UserProfile },
    {
      path: `URL.URL_FORMS + /:id(\\d+)`,
      component: ViewForm
    },
    {
      path: 
        `URL.URL_FORMS_EDIT + /:id(\\d+)`,
      component: EditForm
    },
    {
      path: URL.URL_PASSWORD_RESET + "/:uid/:token",
      component: PasswordResetConfirmForm
    },
    {
      path: URL.URL_FORGOT_PASSWORD + "/",
      component: PasswordResetForm
    }]
//   ],
//   auth: [
//     {
//       path: URL.URL_SIGN_IN,
//       component: SignIn
//     }
//   ]
};

export default function Router() {
  return (
    // <FullpageErrorBoundary>
      <Switch>
        {routes.main.map(({ path, component }) => (
          <MainRoute key={path} path={path} component={component} exact />
        ))}

        {/* {routes.auth.map(({ path, component }) => (
          <AuthRoute key={path} path={path} component={component} exact />
        ))} */}

        {/* <Route component={NotFound} /> */}
      </Switch>
    // {/* </FullpageErrorBoundary> */}
  );
}
