import { put } from 'redux-saga/effects'
import axios from '../../axios'
import * as actions from '../actions/settingsA'


export function* userDeleteSaga(action){

}

export function* pollDeleteSaga(action){
    
}

export function* passChangeSaga(action){
    
}

export function* getUserDataSaga(action){
    console.log('wtf')
    let user_id = localStorage.getItem('user_id')
    try{
        const responseUser = yield axios.get(`/user/${user_id}`)
        yield put(actions.setUserData(responseUser.data))
    }catch(error){
        console.log(error)
    }
    
}