import { FETCH_QUESTIONS, GET_QUESTION, ADD_NEW } from '../actions/questions';

export default function questions(state = {}, action){
  switch(action.type){
    case FETCH_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case GET_QUESTION:
      return state[action.id] ? state[action.id] : null;
    case ADD_NEW:
      return {
        ...state,
        ...{ [action.question.id]: action.questions }
      }
    default:
      return state;
  }
}
