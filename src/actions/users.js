import { _getUsers, _saveQuestionAnswer } from "../_DATA";

export const FETCH_USERS = "FETCH_USERS";
export const SET_USER = "SET_USER";
export const ADD_ANSWER =  "ADD_ANSWER";
export const UPDATE_USER_QUESTION = "UPDATE_USER_QUESTION";

function fetchUsers (users) {
  return {
    type: FETCH_USERS,
    users,
  };
}

function addAnswer (answer) {
  return {
    type: ADD_ANSWER,
    payload: answer
  };
}

export function updateUserQuestion(question) {
  return {
    type: UPDATE_USER_QUESTION,
    payload: question
  };
}

export function handleFetchUsers(){
  return (dispatch) => {
    return _getUsers().then(users => dispatch(fetchUsers(users)));
  };
}

export function handleAddAnswer(answer) {
  return dispatch => {
    return _saveQuestionAnswer(answer).then(dispatch(addAnswer(answer)));
  };
}
