import { FETCH_USERS, SET_USER } from "../actions/users";

export default function users(state = {}, action) {
  switch(action.type) {
  case FETCH_USERS:
    return {
      ...state,
      ...action.users
    };
  case SET_USER:
    return {
      ...state,
      ...action.user
    };
  default:
    return state;
  }
}
