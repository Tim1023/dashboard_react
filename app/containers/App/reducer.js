/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
} from './constants';

import auth from '../auth';

const authInitialState = fromJS({
  username: '',
  password: '',
  loginError: '',
  currentlySending: false,
  loggedIn: auth.loggedIn(),
});

function usersReducer(state = authInitialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state
        .set('username', action.username);

    case CHANGE_PASSWORD:
      return state
        .set('password', action.password);

    case SET_AUTH:
      return state
        .set('loggedIn', action.newAuthState);

    case SENDING_REQUEST:
      return state
        .set('currentlySending', action.sending);

    case REQUEST_ERROR:
      return state
        .set('loginError', action.error);

    case CLEAR_ERROR:
      return state
        .set('loginError', '');

    default:
      return state;
  }
}

export default usersReducer;
