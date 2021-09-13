export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const RESET_AUTHED_USER = "RESET_AUTHED_USER";


export function handleSetUser (user) {
  return {
    type: SET_AUTHED_USER,
    authedUser: user,
  };
}

export function handleResetUser () {
  return {
    type: RESET_AUTHED_USER,
    authedUser: null,
  };
}