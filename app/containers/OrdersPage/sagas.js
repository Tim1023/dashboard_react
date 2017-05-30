/**
 * Created by zhaodeyang on 6/04/17.
 */

import { take, call, put, select, cancel, takeLatest,fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { receive } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

function* watchMessages(msgSource) {
  console.log('begin receive messages')
  let msg = yield call(msgSource.nextMessage)
  while(msg) {
    yield put(receive(msg))
    msg = yield call(msgSource.nextMessage)
  }
  console.log('done receive messages')
}

function createSource(url) {

  const source = new EventSource(url)
  let deferred
  source.addEventListener("event", function (e) {
    if(deferred) {
      deferred.resolve(JSON.parse (e.data))

      deferred = null
    }
  }
  )


  return {
    nextMessage() {
      if(!deferred) {
        deferred = {}
        deferred.promise =
          new Promise(resolve => deferred.resolve = resolve)
      }
      return deferred.promise
    }
  }
}
function* getMessagesOnLoad() {
  yield take(LOCATION_CHANGE);

  const msgSource = yield call(createSource, "/request/room/c2f1d67f-4257-43fb-9d52-dd8256d8554c")
  yield fork(watchMessages, msgSource)
}

export default [
  getMessagesOnLoad,
];
