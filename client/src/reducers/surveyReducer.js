import { FETCH_SURVEY, FETCH_SURVEYS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveys: action.payload };
    case FETCH_SURVEY:
      return { ...state, survey: action.payload };
    default:
      return state;
  }
};
