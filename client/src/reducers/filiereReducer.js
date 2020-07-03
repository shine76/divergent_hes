import { FETCH_FILIERES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FILIERES:
      return { ...state, filieres: action.payload };
    default:
      return state;
  }
};
