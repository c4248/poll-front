import { put } from 'redux-saga/effects'
import * as actions from '../actions/homeA'
import axios from '../../axios'

export function* getQuestionSaga(action) {
    try {
        const response = yield axios.get(`/polls${action.page}`)
        yield put(actions.setQuestions(response.data))
    }catch(error){
        console.log(error)
    }

}