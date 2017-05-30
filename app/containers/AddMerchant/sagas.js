/**
 * Created by zhaodeyang on 6/04/17.
 */

import { take, call, put, select, cancel, takeLatest,fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { receive } from './actions';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';


function* getMessagesOnLoad() {
  yield take(LOCATION_CHANGE);
console.log("!!@#@!#@!#!@")
  const msgSource = yield call(request, "/Lang")
  console.log(msgSource)
  yield put(receive(msgSource))

}

export default [
  getMessagesOnLoad,
];
