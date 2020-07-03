import axios from "axios";
import { questions } from "../apis/apiAdresses";
import { FETCH_QUESTION } from "./types";

export const fetchQuestion = (questionid) => {
  return async (dispatch) => {
    const response = await axios.get(`${questions}/${questionid}`);
    dispatch({
      type: FETCH_QUESTION,
      payload: response.data,
    });
  };
};
