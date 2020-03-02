import { combineReducers } from "redux";
import auth from "./users/authentication/login/reducers/auth";
import myProfile from "./users/userProfile/reducers/getprofile";
import myProfileUpdate from "./users/userProfile/reducers/updateprofile";
import createForm from "./forms/createForm/reducer";
import updateForm from "./forms/common/reducers/updateform";
import deleteForm from "./forms/formsDashboard/reducers/deleteform";
import fetchUserForms from "./forms/userFormInput/reducers/fetchuserforms";
import getFormsInputs from "./forms/viewForm/reducers/getformsinputs";
import deleteFromInput from "./forms/userFormInput/reducers/deleteforminput";
import getFormInputDetails from "./forms/viewForm/reducers/getforminputdetails";
import saveFormInput from "./forms/common/reducers/saveforminput";
import fetchFormDetails from "./forms/userFormInput/reducers/fetchformdetails";

export default combineReducers({
  auth,
  myProfile,
  myProfileUpdate,
  createForm,
  fetchFormDetails,
  updateForm,
  deleteForm,
  fetchUserForms,
  getFormInputDetails,
  getFormsInputs,
  deleteFromInput,
  saveFormInput
});
