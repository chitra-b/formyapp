import api from "../../../apiurl";
import { tokenConfig } from "../../users/authentication/login/action";
import { message } from "antd";
import {
    DELETE_FORM_ERROR,
    DELETE_FORM_LOADING,
    DELETE_FORM_SUCCESS,
    USER_FORMS_DELETED,
    USER_FORMS_ERROR,
    USER_FORMS_LOADING,
    USER_FORMS_SUCCESS
} from "../types";

export const ac_deleteForm = formid => (dispatch, getState) => {
    dispatch({ type: DELETE_FORM_LOADING });
    api
        .delete("/forms/"+formid.toString()+"/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_FORM_SUCCESS
            });
            dispatch({
                type: USER_FORMS_DELETED,
                payload:formid
            });
            message.success("Form deleted successfully");
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
                type: DELETE_FORM_ERROR,
                payload: err_msg
            });
        });
};


export const ac_fetchUserForms = (pagenumber = 1, filter_users=[]) => (dispatch, getState) => {
    dispatch({ type: USER_FORMS_LOADING });
    let api_url = "/user_forms/?page="+pagenumber.toString();
    if(filter_users.length > 0){
        api_url += "&filter_users="+filter_users;
    }
    api
        .get(api_url, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_FORMS_SUCCESS,
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
                type: USER_FORMS_ERROR,
                payload: err_msg
            });
        });
};

