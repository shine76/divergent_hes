import { CREATE_FEEDBACK, FETCH_FEEDBACK } from "./types";
import { feedbacks } from "../apis/apiAdresses";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../history";

export const fetchFeedback = (code) => {
  return async (dispatch) => {
    const response = await axios.get(`${feedbacks}/${code}`);
    dispatch({
      type: FETCH_FEEDBACK,
      payload: response.data,
    });
  };
};

export const createFeedback = (formData) => {
  return async (dispatch) => {
    const response = await axios.post(`${feedbacks}`, formData);
    dispatch({
      type: CREATE_FEEDBACK,
      payload: response.data,
    });
    toast.info("Feedback bien crée");
    history.push(`/admin/feedbacks`);
  };
};
