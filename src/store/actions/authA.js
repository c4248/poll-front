export const authSuccess = (access_token, refresh_token, user_id, username, expiresIn) => {
    return {
        type: 'AUTH_SUCCESS',
        access_token,
        refresh_token,
        user_id, 
        username,
        expiresIn
    }
}

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error
    }
}

export const resetError = () =>{
    return{
        type: 'RESET_ERROR'
    }
}

export const logout = () => {
    return {
        type: 'AUTH_LOGOUT'
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: 'AUTH_CHECK_TIMEOUT',
        expirationTime
    }
}

export const auth = (username, password) => {
    return {
        type: 'AUTH_USER',
        username,
        password
    }
}

export const persistAuth = () => {
    return {
        type: 'PERSIST_AUTH'
    }
}

export const register = (username, password) => {
    return {
        type: 'REGISTER',
        username,
        password
    }
}

export const refreshAccess = () => {
    return {
        type: 'REFRESH_ACCESS'
    }
}

export const getUser = () => {
    return {
        type: 'GET_USER'
    }
}

export const setUserInfo = (user) =>{
    return{
        type: 'SET_USER_INFO',
        user
    }
}

export const findUsername = (username) =>{
    return {
        type: 'FIND_USERNAME',
        username
    }
}

export const setUserFound = (isFound) => {
    return {
        type: 'USER_FOUND',
        isFound
    }
}