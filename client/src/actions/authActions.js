import history from "../history";
import { users } from "../apis/apiAdresses";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, LOGOUT_USER, GET_ERRORS } from "./types";
import { toast } from "react-toastify";
import axios from "axios";

export const loginUser = (formValues) => {
  return async (dispatch) => {
    localStorage.setItem("pseudo", formValues.pseudo);
    localStorage.setItem("filiere", formValues.filiere);
    console.log("Login here", formValues);
    history.push("/surveys");
  };
};

export const LoginU = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${users}/login`, formValues);

      // Récupérer le token
      const { token } = response.data;

      // Enregistrer le token dans le localstorage
      localStorage.setItem("jwtToken", token);

      // Attacher le token au header des requetes
      setAuthToken(token);

      // Décoder le token pour récupérer les données
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
      history.push("/admin/surveys");
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
      toast.error("Veuillez verifier vos informations");
    }
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    // Supprimer le token du localstorage
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch({
      type: LOGOUT_USER,
      payload: {},
    });

    history.push("/");
    toast.info("Vous êtes bien déconnecté");
  };
};
