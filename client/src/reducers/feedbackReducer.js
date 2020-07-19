import {
  FETCH_FEEDBACKS,
  FETCH_FEEDBACK,
  CREATE_FEEDBACK,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FEEDBACKS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_FEEDBACK:
      return { ...state, feedback: action.payload };
    case CREATE_FEEDBACK:
      return { ...state };
    default:
      return state;
  }
};
