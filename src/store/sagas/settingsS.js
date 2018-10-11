import { put } from 'redux-saga/effects'
import axios from '../../axios'
import * as actions from '../actions/settingsA'


export function* userDeleteSaga(action){

}

export function* pollDeleteSaga(action){
    try {
        const deletion = yield axios.delete(`/poll/${action.postId}`)
        yield(getUserDataSaga())
    }catch(error){
        console.log(error)
    }
}

export function* passChangeSaga(action){
    console.log(action)
    const data = {
        username: action.username,
        password: action.password
    }
    try{
        const update = yield axios.put(`/user/1`, data)
        console.log(update)
    }catch(error){
        console.log(error)
    }
    
}

export function* getUserDataSaga(action){
    let user_id = localStorage.getItem('user_id')
    try{
        const responseUser = yield axios.get(`/user/${user_id}`)
        yield put(actions.setUserData(responseUser.data))
    }catch(error){
        console.log(error)
    }
    
}