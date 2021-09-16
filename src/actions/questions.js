import { _getQuestions, _saveQuestion } from "../_DATA";

export const FETCH_QUESTIONS = "FETCH_QUESTIONS";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}

export function handleFetchQuestions() {
  return (dispatch) => {
    return _getQuestions().then(questions => dispatch(fetchQuestions(questions)));
  };
}

function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question
  };
}


export function handleAddNew(question){
  return dispatch => {
    return _saveQuestion(question).then(formattedQuestion => dispatch(addNewQuestion(formattedQuestion)));
  };
}


