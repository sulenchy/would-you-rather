import { FETCH_QUESTIONS, ADD_NEW_QUESTION } from "../actions/questions";

export default function questions(state = {}, action){
  switch(action.type){
  case FETCH_QUESTIONS:
    return {
      ...state,
      ...action.questions
    };
  case ADD_NEW_QUESTION:
    return {
      ...state,
      ...{ [action.question.id]: action.question }
    };
  default:
    return state;
  }
}
