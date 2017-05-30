/*
 *
 * RegisterPage actions
 *
 */

import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
} from './constants';

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    username,
  };
}

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    password,
  };
}
