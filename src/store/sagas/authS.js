import { put } from 'redux-saga/effects'
import axios from '../../axios'
import * as actions from '../actions/authA'

export function* authUserSaga(action) {
    const authData = {
        username: action.username,
        password: action.password
    }

    try{
        const response = yield axios.post('/login', authData)
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)
        localStorage.setItem('user_id', response.data.user_id)
        localStorage.setItem('username', action.username)
        const expiresIn = new Date(Date.now()+ 29*60000)
        localStorage.setItem('expiresIn', expiresIn)
        yield put(actions.authSuccess(
            response.data.access_token, 
            response.data.refresh_token, 
            response.data.user_id,
            action.username,
            expiresIn
        ))
        const responseUser = yield axios.get(`/user/${response.data.user_id}`)
        yield put(actions.setUserInfo(responseUser.data))

    } catch(error){
        yield put(actions.authFail(error))
    }
}

export function* logoutSaga(aciton) {
    const headers = { headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    }}
    try{
        localStorage.clear()
        console.log(headers)
        const response = yield axios.get('/logout', headers)
        console.log(response)
        
        yield put(actions.logoutSuccess())
    } catch(error){
        console.log(error)
    }
}

export function* registerSaga(action) {
    const data = {
        username: action.username,
        password: action.password
    }
    try {
        yield axios.post('/register', data)
        yield authUserSaga(data)
    }catch(error){
        yield put (actions.authFail(error.response.data.message))
    }
}

export function* refreshSaga(){
    if(Date.now() > new Date(localStorage.getItem('expiresIn'))){
        const headers = { headers: {
            "Authorization": `Bearer ${localStorage.getItem('refresh_token')}`
        }}
        try{
            const response = yield axios.post('/refresh', null, headers)
            localStorage.setItem('access_token', response.data.access_token)
        }catch(error){
            console.log(error)
        }
    }
}

export function* getUserSaga(){
    try{
        const response = yield axios.get(`/user/${localStorage.getItem('user_id')}`)
        yield put(actions.setUserInfo(response.data))
    }catch(error){
        console.log(error)
    }
}

export function* findUserSaga(action){
    try{
        const response = yield axios.post(`user/1`, {username: action.username})
        yield put(actions.setUserFound(response.data.isRegistered))
    }catch(error){
        console.log(error)
    }
}