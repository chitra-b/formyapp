import api from "../../../../apiurl";
import { tokenConfig } from "../login/action";
import {
  RESET_PASSWORD_MAIL_SENT_SUCCESS,
  RESET_PASSWORD_INITIATION_FAILED,
  RESET_PASSWORD_INITIATION_LOADING,
  RESET_PASSWORD_CONFIRM_FAILED,
  RESET_PASSWORD_CONFIRM_LOADING,
  RESET_PASSWORD_CONFIRM_SUCCESS
} from "../../types";
import { message } from "antd";

//Create new user

export const acResetPassword = passwordResetData => (dispatch, getState) => {
  dispatch({ type: RESET_PASSWORD_INITIATION_LOADING });
  const body = JSON.stringify(passwordResetData);
  api
    .post("/rest-auth/password/reset/", body, tokenConfig(getState))
    .then(res => {
      message.success("Reset password mail triggered successfully");
      dispatch({
        type: RESET_PASSWORD_MAIL_SENT_SUCCESS,
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
        type: RESET_PASSWORD_INITIATION_FAILED,
        payload: err_msg
      });
    });
};

export const acResetPasswordConfirm = passwordResetData => (dispatch, getState) => {
    dispatch({ type: RESET_PASSWORD_CONFIRM_LOADING });
    const body = JSON.stringify(passwordResetData);
    console.log(body);
    api
      .post("/" + passwordResetData["uid"] + "/" + passwordResetData["token"] + "/", body, tokenConfig(getState))
      .then(res => {
        message.success("Reset password successfully");
        dispatch({
          type: RESET_PASSWORD_CONFIRM_SUCCESS,
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
          type: RESET_PASSWORD_CONFIRM_FAILED,
          payload: err_msg
        });
      });
  };
  