import history from "../history";
//import { SET_CURRENT_USER, LOGOUT_USER, GET_ERRORS } from "./types";

export const loginUser = (formValues) => {
  return async (dispatch) => {
    localStorage.setItem("pseudo", formValues.pseudo);
    localStorage.setItem("filiere", formValues.filiere);
    console.log("Login here", formValues);
    history.push("/surveys");
  };
};
