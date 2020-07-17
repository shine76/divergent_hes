import { FETCH_FILIERES, SET_FILIERE_SCORE, CREATE_FILIERE } from "./types";
import { filieres } from "../apis/apiAdresses";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../history";

export const fetchFilieres = () => {
  return async (dispatch) => {
    const response = await axios.get(`${filieres}/`);
    dispatch({
      type: FETCH_FILIERES,
      payload: response.data,
    });
  };
};

export const setFiliereScore = (id, score) => {
  console.log(id, score);
  return async (dispatch) => {
    const response = await axios.patch(`${filieres}/addscore/${id}`, score);
    dispatch({
      type: SET_FILIERE_SCORE,
      payload: response.data,
    });
  };
};

export const createFiliere = (formData) => {
  return async (dispatch) => {
    const response = await axios.post(`${filieres}`, formData);
    dispatch({
      type: CREATE_FILIERE,
      payload: response.data,
    });
    toast.info("Filière bien crée");
    history.push(`/admin/filieres`);
  };
};
