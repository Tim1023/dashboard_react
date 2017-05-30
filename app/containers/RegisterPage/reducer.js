/*
 *
 * RegisterPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return state
        .set('username', action.username);
    case UPDATE_PASSWORD:
      return state
        .set('password', action.password);
    default:
      return state;
  }
}

export default registerPageReducer;
