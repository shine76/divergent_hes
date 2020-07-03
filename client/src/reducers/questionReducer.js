import { FETCH_QUESTION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return { ...state, question: action.payload };
    default:
      return state;
  }
};
