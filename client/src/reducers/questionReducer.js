import { FETCH_QUESTION, FETCH_QUESTIONS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    case FETCH_QUESTION:
      return { ...state, question: action.payload };
    default:
      return state;
  }
};
