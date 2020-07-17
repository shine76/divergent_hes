import axios from "axios";
import { surveys } from "../apis/apiAdresses";
import { FETCH_SURVEY, FETCH_SURVEYS, CREATE_SURVEY } from "./types";
import { toast } from "react-toastify";
import history from "../history";

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

export const createSurvey = (formData) => {
  console.log(formData);
  return async (dispatch) => {
    const response = await axios.post(`${surveys}`, formData);
    dispatch({
      type: CREATE_SURVEY,
      payload: response.data,
    });
    toast.info("Evaluation bien crée");
    history.push(`/admin/surveys/${response.data._id}`);
  };
};
