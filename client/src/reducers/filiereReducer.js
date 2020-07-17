import { FETCH_FILIERES, CREATE_FILIERE } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FILIERES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case CREATE_FILIERE:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
