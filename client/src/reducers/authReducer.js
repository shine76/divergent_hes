import { SET_CURRENT_USER, LOGOUT_USER } from "./../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGOUT_USER:
      return { ...state, user: action.payload, isAuthenticated: false };
    default:
      return state;
  }
};
