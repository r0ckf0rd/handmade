import * as SessionApiUtil from '../util/session_api_util';
import * as CartApiUtil from '../util/cart_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";


// normal action creators

export const receiveCurrentUser = (user) => {
    return({
        type: RECEIVE_CURRENT_USER,
        user
    });
};

const logoutCurrentUser = () => {
    return({
        type: LOGOUT_CURRENT_USER
    });
};

const receiveErrors = (errors) => {
    return({
        type: RECEIVE_SESSION_ERRORS,
        errors: errors
    });
};


// thunk action creators

export const signIn = (user) => (dispatch) => {
    return SessionApiUtil.signIn(user).then(user => dispatch(receiveCurrentUser(user)), 
        errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const signUp = (user) => (dispatch) => {
    return SessionApiUtil.signUp(user).then(user => dispatch(receiveCurrentUser(user)), 
        errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const signOut = () => (dispatch) => {
    return SessionApiUtil.signOut().then(() => dispatch(logoutCurrentUser()), 
        errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const fetchCurrentCartID = (user) => dispatch => {
    return CartApiUtil.fetchCurrentCartID(user)
        .then( user => {
            return dispatch(receiveCurrentUser(user))
        })
}

