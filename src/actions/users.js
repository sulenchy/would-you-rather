import { _getUsers, _saveQuestionAnswer } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

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
    dispatch(showLoading());
    return _getUsers().then(users => {
      dispatch(fetchUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function handleAddAnswer(answer) {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestionAnswer(answer).then(() => {
      dispatch(addAnswer(answer));
      dispatch(hideLoading());
    });
  };
}
