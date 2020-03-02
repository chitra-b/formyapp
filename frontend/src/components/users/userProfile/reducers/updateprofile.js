import {
  MYPROFILE_UPDATING,
  MYPROFILE_UPDATED,
  MYPROFILE_UPDATE_ERROR
} from "../../types";

const initialState = {
  isLoading: false,
  isError: false,
  isUpdated: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MYPROFILE_UPDATING:
      return {
        ...state,
        isLoading: true,
        isError:false,
        isUpdated: false
      };
    case MYPROFILE_UPDATED:
      return {
        ...state,
        isLoading: false,
        isUpdated: true,
        isError:false,
        user: action.payload
      };
    case MYPROFILE_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
        isError:action.payload
      };
    default:
      return state;
  }
}
