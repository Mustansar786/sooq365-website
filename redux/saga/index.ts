import { all, fork } from 'redux-saga/effects';

import User from './User.saga';

export default function* rootSaga() {
  yield all([
     fork(User),
  ])
}