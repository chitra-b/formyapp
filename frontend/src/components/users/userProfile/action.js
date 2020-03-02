import api from '../../../apiurl'
import { tokenConfig } from "../authentication/login/action";
import {
    MYPROFILE_LOADED,
    MYPROFILE_LOADING,
    AUTH_ERROR,
    MYPROFILE_UPDATED,
  MYPROFILE_UPDATE_ERROR,
  MYPROFILE_UPDATING
  } from "../types";
import { message } from "antd";

// CHECK TOKEN & LOAD USER
export const loadUserProfile = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: MYPROFILE_LOADING });
    api.get("/user_profile/", tokenConfig(getState))
    .then(res => {
        dispatch({
            type: MYPROFILE_LOADED,
            payload: res.data[0]
        });
    })
    .catch(err => {
        //message.error(err.response.data.details,10);
        //dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};


// Return current user details - helper function
export const getUserDetails = getState => {
    // Returns dict containing username and role
    let userDetails = {};
    if (getState().myProfile.user){
        userDetails = {username: getState().myProfile.user.username,
            role: getState().myProfile.user.team_role.name};
    }
    return userDetails;
  };
  
  export const updateProfile = (userid, userdata) => (dispatch, getState) => {
    dispatch({ type: MYPROFILE_UPDATING });
    const body = JSON.stringify(userdata);
    api
      .patch(
        "/user_profile/" + userid.toString() + "/",
        body,
        tokenConfig(getState)
      )
      .then(res => {
        dispatch({
          type: MYPROFILE_UPDATED,
          payload: res.data
        });
      })
      .catch(err => {
        let err_msg = "";
        if ("detail" in err.response.data) {
          err_msg = err.response.data.detail;
        } else {
          for (var key in err.response.data) {
            err_msg += err.response.data[key];
          }
        }
        dispatch({
          type: MYPROFILE_UPDATE_ERROR,
          payload: err_msg
        });
      });
  };