import { createSelector } from "reselect";

const selectUsers = state => state.users;
export const selectAllQuestions = state =>state.questions;

export const selectAuthedUser = state => state.authedUser;

export const selectUsersWithMinInfo = createSelector(selectUsers, (users) => {
  const formattedUsers = Object.keys(users).reduce((acc, cur) => {
    const { name, id, avatarURL } = users[cur];
    acc[cur] = { name, id, avatarURL };
    return acc;
  }, {});
  return formattedUsers;
});

export const selectQuestionById = id => createSelector(selectAllQuestions, (questions) => {
  const question = questions[id];
  return question;
});

export const groupQuestionById = id => createSelector(selectAllQuestions, (questions) => {
  const unansweredQuestions = [];
  const answeredQuestions = [];
  Object.keys(questions).forEach(questionId => {
    const { optionOne,optionTwo } = questions[questionId];
    if (optionOne.votes.includes(id) || optionTwo.votes.includes(id)){
      answeredQuestions.push(questions[questionId]);
    }
    else {
      unansweredQuestions.push(questions[questionId]);
    }
  });
  return { 
    answeredQuestions: answeredQuestions.sort((a,b) => b.timestamp - a.timestamp),
    unansweredQuestions: unansweredQuestions.sort((a,b) => b.timestamp - a.timestamp)
  };
});

/**
 * get the id
 * create a function that returns two arrays(answered, unanswered)
 * 
 */

