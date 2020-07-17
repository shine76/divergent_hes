import {
  FETCH_QUESTION,
  FETCH_QUESTIONS,
  CREATE_QUESTION,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    case FETCH_QUESTION:
      return { ...state, question: action.payload };
    case CREATE_QUESTION:
      return { ...state };
    default:
      return state;
  }
};
