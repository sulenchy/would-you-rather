import { FETCH_USERS, SET_USER, ADD_ANSWER } from "../actions/users";

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
  case ADD_ANSWER:
    return {
      ...state,
      [action.payload.authedUser]: {
        ...state[action.payload.authedUser],
        answers: { ...state[action.payload.authedUser].answers, ...{ [action.payload.qid]: action.payload.answer } }
      }
    };
  default:
    return state;
  }
}
