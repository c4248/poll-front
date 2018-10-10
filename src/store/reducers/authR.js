const initialState = {
    access_token: null,
    refresh_token: null,
    user_id: null,
    username: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    expiresIn: null,
    user: {},
    userFound: null
}

const authSuccess = (state, action) => {
    return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token,
        user_id: action.user_id,
        username: action.username,
        expiresIn: action.expiresIn
    }
}

const userFound = (state, action) => {
    return {...state, userFound: action.isFound}
}

const logoutSuccess = () => {
    return initialState
}

const persistAuth = (state, action) =>{
    const access_token = localStorage.getItem('access_token')
    if(access_token){
        const refresh_token = localStorage.getItem('refresh_token')
        const user_id = localStorage.getItem('user_id')
        const username = localStorage.getItem('username')

        return {
            ...state,
            access_token, 
            refresh_token,
            user_id,
            username
        }
    }
    return state
}

const setUserInfo = (state, action) => {
    return {...state, user: action.user}
}

const loginFail = (state, action) => {
    return {...state, error: action.error}
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'AUTH_SUCCESS': return authSuccess(state, action)
        case 'PERSIST_AUTH': return persistAuth(state, action)
        case 'LOGOUT_SUCCESS': return logoutSuccess()
        case 'AUTH_FAIL': return loginFail(state, action)
        case 'RESET_ERROR': return initialState
        case 'SET_USER_INFO': return setUserInfo(state, action)
        case 'USER_FOUND': return userFound(state, action)
        default: return state
    }
}

export default reducer