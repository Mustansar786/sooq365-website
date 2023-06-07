import { put, all, takeLatest, takeEvery } from 'redux-saga/effects'

import * as type from 'redux/action/type/user';
import { UserSagaPayload } from 'redux/reducer/user.reducer';



function* requestUser(data: UserSagaPayload) {
    yield put({ type: type.SET_USER_DETAIL__, payload:data.payload });
}

function* updateSelfieImage(data: UserSagaPayload) {
    yield put({ type: type.UPDATE_SELFIE_IMAGE__, payload:data.payload });
}

function* setFacebookUser(data: UserSagaPayload) {
    yield put({ type: type.FACEBOOK_USER__, payload:data.payload });
}

export default function* rootSaga() {
    yield all([
        takeLatest(type.SET_USER_DETAIL, requestUser),
        takeLatest(type.UPDATE_SELFIE_IMAGE, updateSelfieImage),
        takeLatest(type.FACEBOOK_USER, setFacebookUser),

    ])
}