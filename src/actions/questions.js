import { _getQuestions, _saveQuestion } from "../_DATA";
import { updateUserQuestion } from "./users";

export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const VOTE_QUESTION = "VOTE_QUESTION";

function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}


function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question
  };
}

export function voteQuestion(vote) {
  return {
    type: VOTE_QUESTION,
    vote
  };
}


export function handleAddNew({question, authedUser}){
  return dispatch => {
    return _saveQuestion(question).then(formattedQuestion => {
      dispatch(addNewQuestion(formattedQuestion));
      dispatch(updateUserQuestion({ authedUser: authedUser.id, question: formattedQuestion.id }))
    });
  };
}

export function handleFetchQuestions() {
  return (dispatch) => {
    return _getQuestions().then(questions => dispatch(fetchQuestions(questions)));
  };
}
