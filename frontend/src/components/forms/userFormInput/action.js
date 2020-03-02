import { tokenConfig } from "../../users/authentication/login/action";
import { message } from "antd";
import {store} from "../../../index";
import api from "../../../apiurl";
import {
    DELETE_FORM_INPUT_LOADING,
    DELETE_FORM_INPUT_ERROR,
    DELETE_FORM_INPUT_SUCCESS,
    FORMS_INPUTS_DELETED
} from "../types";

export const ac_mapuserform = (data) => {
    const body = JSON.stringify(data);
    // api
    //     .post("/user_forms/",body, tokenConfig(store.getState))
    //     .then(res => {
    //         store.dispatch(getUsers({ 
    //             unmapped_users: true, 
    //             form_id: data.form, 
    //             page:1 
    //         }));
    //         message.success("User mapped successfully");
    //     })
    //     .catch(err => {
    //         let err_msg = "";
    //         if ("detail" in err.response.data) {
    //             err_msg = err.response.data.detail;
    //         } else {
    //             for (var key in err.response.data) {
    //                 err_msg += err.response.data[key];
    //             }
    //         }
    //         message.error("Unable to map user "+err_msg);
    //     });
};

export const ac_unmapuserform = (userid, formid) =>  {
    // api
    //     .delete("/user_forms/delete/?user_id="+userid.toString()+"&form_id="+formid.toString(), 
    //     tokenConfig(store.getState))
    //     .then(res => {
    //         store.dispatch(getUsers({ 
    //             mapped_users: true, 
    //             form_id: formid, 
    //             page:1 
    //         }));
    //         message.warning("User unmapped successfully");
    //     })
    //     .catch(err => {
    //         let err_msg = "";
    //         if ("detail" in err.response.data) {
    //             err_msg = err.response.data.detail;
    //         } else {
    //             for (var key in err.response.data) {
    //                 err_msg += err.response.data[key];
    //             }
    //         }
    //         message.error("Unable to unmap user "+err_msg);
    //     });
};

export const ac_deleteFormInput = input_id => (dispatch, getState) => {
    dispatch({ type: DELETE_FORM_INPUT_LOADING });
    api
        .delete("/form_data/"+input_id.toString()+"/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_FORM_INPUT_SUCCESS
            });
            dispatch({
                type: FORMS_INPUTS_DELETED,
                payload:input_id
            });
            message.success("Deleted successfully");
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
                type: DELETE_FORM_INPUT_ERROR,
                payload: err_msg
            });
        });
};

