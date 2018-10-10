import { takeEvery } from 'redux-saga/effects'

import { createPollSaga,  } from './createPollS'
import { getPollSaga, addCountSaga, delCountSaga } from './pollS'
import { findUserSaga, authUserSaga, logoutSaga, registerSaga, refreshSaga, getUserSaga } from './authS'
import { getQuestionSaga } from './homeS'
import { userDeleteSaga, pollDeleteSaga, passChangeSaga, getUserDataSaga} from './settingsS'

export function* watchCreatePoll(){
    yield takeEvery('CREATE_QUESTION', createPollSaga)   
}

export function* watchPoll(){
    yield takeEvery('GET_POLL', getPollSaga)
    yield takeEvery('ADD_COUNT_TO_POLL', addCountSaga)
    yield takeEvery('DEL_COUNT_FROM_POLL', delCountSaga)
}

export function* watchAuth(){
    yield takeEvery('AUTH_USER', authUserSaga)
    yield takeEvery('AUTH_LOGOUT', logoutSaga)
    yield takeEvery('REGISTER', registerSaga)
    yield takeEvery('REFRESH_ACCESS', refreshSaga)
    yield takeEvery('GET_USER', getUserSaga)
    yield takeEvery('FIND_USERNAME', findUserSaga)
}

export function* watchHome(){
    yield takeEvery('GET_QUESTIONS', getQuestionSaga)
}

export function* watchSettings(){
    yield takeEvery('USER_DELETE', userDeleteSaga)
    yield takeEvery('POLL_DELETE', pollDeleteSaga)
    yield takeEvery('P_UPDATE', passChangeSaga)
    yield takeEvery('GET_USER_DATA', getUserDataSaga)
}