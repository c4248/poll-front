import axios from '../../axios'
import { put } from 'redux-saga/effects'
import * as actions from '../actions/pollA'

export function* getPollSaga(action){
    try {
        const response = yield axios.get(`/poll/${action.id}`)
        yield put(actions.setPoll(response.data))
    } catch(error) {
        console.log(error)
    }
}

export function* addCountSaga(action) {
    try {
        const headers = {headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }}
        const response = yield axios.post(`/choice/${action.payload}`, null, headers)
        yield put(actions.setCount(response.data))

    } catch(error) {
        console.log(error)
    }
}

export function* delCountSaga(action) {
    try {
        yield axios.put(`/questions/${action.payload.id}/choices/${action.payload.choice}.json`,action.payload.count-1)
        yield put(actions.setCount({choice: action.payload.choice, count: action.payload.count-1}))

    } catch(error) {
        console.log(error)
    }
}