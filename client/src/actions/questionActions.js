import axios from "axios";
import { surveys, questions } from "../apis/apiAdresses";
import {
  FETCH_QUESTION,
  CREATE_QUESTION,
  FETCH_QUESTIONS,
  CREATE_RESPONSE,
  CREATE_STEP,
  ADD_TEACHER_TEXT,
} from "./types";
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

export const fetchQuestions = (surveyid) => {
  return async (dispatch) => {
    const response = await axios.get(`${surveys}/${surveyid}/questions`);
    dispatch({
      type: FETCH_QUESTIONS,
      payload: response.data,
    });
  };
};

export const createResponse = (questionid, formdata) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${questions}/${questionid}/reponses`,
      formdata
    );
    dispatch({
      type: CREATE_RESPONSE,
      payload: response.data,
    });
  };
};

export const createStep = (questionid, formData) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${questions}/${questionid}/steps`,
      formData
    );
    dispatch({
      type: CREATE_STEP,
      payload: response.data,
    });
  };
};

export const addTeacherText = (questionid, stepid, formData) => {
  console.log(formData, questionid, stepid);
  return async (dispatch) => {
    const response = await axios.post(
      `${questions}/${questionid}/steps/${stepid}/teacher`,
      formData
    );
    dispatch({
      type: ADD_TEACHER_TEXT,
      payload: response.data,
    });
  };
};

export const addStudentText = (questionid, stepid, formData) => {
  console.log(questionid, stepid);
  return async (dispatch) => {
    const response = await axios.post(
      `${questions}/${questionid}/steps/${stepid}/student`,
      formData
    );
  };
};
