import { createSelector } from "reselect";

const selectUsers = state => state.users;
export const selectAllQuestions = state =>state.questions;

export const selectAuthedUser = state => state.authedUser;

export const selectUsersWithMinInfo = createSelector(selectUsers, (users) => {
  const formattedUsers = Object.keys(users).reduce((acc, cur) => {
    const { name, id, avatarURL, answers } = users[cur];
    acc[cur] = { name, id, avatarURL, answers };
    return acc;
  }, {});
  return formattedUsers;
});

export const selectUserById = id => createSelector(selectUsers, users => (users[id]));

export const selectQuestionById = id => createSelector(selectAllQuestions, (questions) => {
  const question = questions[id];
  return question;
});

export const groupQuestionById = id => createSelector(selectAllQuestions, (questions) => {
  const unansweredQuestions = [];
  const answeredQuestions = [];
  Object.keys(questions).forEach(questionId => {
    const { optionOne, optionTwo } = questions[questionId];
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

export const selectOptionsForQuestion = id => createSelector(selectQuestionById(id), question => {
  return {options : [question.optionOne, question.optionTwo], totalVoteCount: question.optionOne.votes.length + question.optionTwo.votes.length };
});
