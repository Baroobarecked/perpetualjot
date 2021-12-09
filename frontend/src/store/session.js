import { csrfFetch } from "./csrf";

const ADD_SESSION = 'session/ADD_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

const addSession = user => ({
    type: ADD_SESSION,
    user
});

const removeSession = () => ({
    type: REMOVE_SESSION,
});

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeSession());
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(addSession(data.user));
    return response;
  };

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(addSession(data.user));
    return response;
};

export const addUserSession = (credentials) => async dispatch => {
    const {credential, password} = credentials;
    const res = await csrfFetch('/api/session/', { method: 'POST', body: JSON.stringify({credential, password}) });
    const user = await res.json();
    const result = await dispatch(addSession(user.user));
    return result;
}

const sessionReducer = (state =  { user: null } , action) => {
    switch (action.type) {
        case ADD_SESSION:
            return {
                ...state,
                user: action.user,
            }
        case REMOVE_SESSION:
            const newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;