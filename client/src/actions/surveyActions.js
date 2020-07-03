import axios from "axios";
import { surveys } from "../apis/apiAdresses";
import { FETCH_SURVEY, FETCH_SURVEYS } from "./types";
import { toast } from "react-toastify";

export const fetchSurvey = (surveyid) => {
  return async (dispatch) => {
    const response = await axios.get(`${surveys}/${surveyid}`);
    dispatch({
      type: FETCH_SURVEY,
      payload: response.data,
    });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const response = await axios.get(`${surveys}`);
    dispatch({
      type: FETCH_SURVEYS,
      payload: response.data,
    });
  };
};

export const clearSurvey = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_SURVEY,
      payload: {},
    });
  };
};
