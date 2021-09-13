import { createSelector } from "reselect";

const selectUsers = state => state.users;
export const selectAuthedUser = state => state.authedUser;

export const selectUsersWithMinInfo = createSelector(selectUsers, (users) => {
  const formattedUsers = Object.keys(users).reduce((acc, cur) => {
    const { name, id, avatarURL } = users[cur];
    acc[cur] = { name, id, avatarURL };
    return acc;
  }, {});
  return formattedUsers;
});

