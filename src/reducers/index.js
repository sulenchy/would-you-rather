import { combineReducers } from "redux";
import questions from "./questions";
import users from "./users";
import authedUser from "./authedUsers";



export default combineReducers({
  questions,
  users,
  authedUser
});
