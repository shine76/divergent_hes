import { FETCH_SURVEY, FETCH_SURVEYS, CREATE_SURVEY } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_SURVEY:
      return { ...state };
    case FETCH_SURVEYS:
      return { ...state, surveys: action.payload };
    case FETCH_SURVEY:
      return { ...state, survey: action.payload };
    default:
      return state;
  }
};
