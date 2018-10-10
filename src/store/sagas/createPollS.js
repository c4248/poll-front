import { put } from 'redux-saga/effects'
import * as actions from '../actions/createPollA'
import axios from '../../axios'

export function* createPollSaga(action) {
    try{
        const headers = {headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }}
        const response = yield axios.post('/poll', action.question, headers)
        yield put(actions.setRedirect(response.data.id))

    }catch(error){
        console.log(error)
    }
}
