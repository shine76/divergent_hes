import { FETCH_FILIERES, SET_FILIERE_SCORE } from "./types";
import { filieres } from "../apis/apiAdresses";
import axios from "axios";

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
