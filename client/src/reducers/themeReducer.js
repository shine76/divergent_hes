import { CREATE_THEME, FETCH_THEMES } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_THEMES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case CREATE_THEME:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
