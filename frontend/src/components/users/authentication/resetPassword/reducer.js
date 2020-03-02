import {
    RESET_PASSWORD_MAIL_SENT_SUCCESS,
    RESET_PASSWORD_INITIATION_FAILED,
    RESET_PASSWORD_INITIATION_LOADING,
    RESET_PASSWORD_CONFIRM_FAILED,
    RESET_PASSWORD_CONFIRM_LOADING,
    RESET_PASSWORD_CONFIRM_SUCCESS
  } from "../../../../actions/types";
  
  const initialState = {
    isResetInitiateSuccess: false,
    isResetInitiateLoading: false,
    isResetInitiateError: false,
    isResetConfirmSuccess: false,
    isResetConfirmLoading: false,
    isResetConfirmError: false,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case RESET_PASSWORD_MAIL_SENT_SUCCESS:
        return {
          ...state,
          isResetInitiateSuccess: false,
          isResetInitiateLoading: false,
          isResetInitiateError: false
        };
      case RESET_PASSWORD_INITIATION_FAILED:
        return {
          ...state,
          isResetInitiateSuccess: false,
          isResetInitiateError: action.payload,
          isResetInitiateLoading: false
        };
      case RESET_PASSWORD_INITIATION_LOADING:
        return {
          ...state,
          isResetInitiateSuccess: false,
          isResetInitiateLoading: true,
          isResetInitiateError: false
        };
        case RESET_PASSWORD_CONFIRM_SUCCESS:
            return {
              ...state,
              isResetConfirmSuccess: true,
              isResetConfirmLoading: false,
              isResetConfirmError: false
            };
          case RESET_PASSWORD_CONFIRM_FAILED:
            return {
              ...state,
              isResetConfirmSuccess: false,
              isResetConfirmError: action.payload,
              isResetConfirmLoading: false
            };
          case RESET_PASSWORD_CONFIRM_LOADING:
            return {
              ...state,
              isResetConfirmSuccess: false,
              isResetConfirmLoading: true,
              isResetConfirmError: false
            };
      default:
        return state;
    }
  }
  