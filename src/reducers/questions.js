import { FETCH_QUESTIONS, ADD_NEW_QUESTION, VOTE_QUESTION } from "../actions/questions";

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
  case VOTE_QUESTION:
    return {
      ...state,
      [action.vote.qid]: {
        ...state[action.vote.qid],
        [action.vote.answer]: {
          ...state[action.vote.qid][action.vote.answer],
          votes : [...state[action.vote.qid][action.vote.answer].votes, action.vote.authedUser]
        }
      }
    };
  default:
    return state;
  }
}
