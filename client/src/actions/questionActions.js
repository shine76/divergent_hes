import axios from "axios";
import { surveys, questions } from "../apis/apiAdresses";
import { FETCH_QUESTION, CREATE_QUESTION } from "./types";
import history from "../history";

export const fetchQuestion = (questionid) => {
  return async (dispatch) => {
    const response = await axios.get(`${questions}/${questionid}`);
    dispatch({
      type: FETCH_QUESTION,
      payload: response.data,
    });
  };
};

export const createQuestion = (surveyid, formData) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${surveys}/${surveyid}/questions`,
      formData
    );
    dispatch({
      type: CREATE_QUESTION,
      payload: response.data,
    });
    history.push(`/surveys/${surveyid}/edit`);
  };
};
