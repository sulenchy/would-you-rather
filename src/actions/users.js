import { _getUsers } from '../_DATA';

export const FETCH_USERS = 'FETCH_USERS';
export const SET_USER = 'SET_USER';

function fetchUsers (users) {
    return {
        type: FETCH_USERS,
        users,
    }
}

export function handleFetchUsers(){
    return (dispatch) => {
        return _getUsers().then(users => dispatch(fetchUsers(users)))
    }
}
