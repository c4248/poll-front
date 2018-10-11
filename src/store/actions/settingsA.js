export const userDelete = (userId) => {
    return {
        type: 'USER_DELETE',
        userId
    }
}

export const pollDelete = (postId) => {
    return {
        type: 'POLL_DELETE',
        postId
    }
}

export const passChange = (username, password) => {
    return {
        type: 'P_UPDATE',
        username,
        password
    }
}

export const getUserData = () => {
    return {
        type: 'GET_USER_DATA'
    }
}

export const setUserData = (data) =>{
    return {
        type: 'SET_USER_DATA',
        userPosts: data
    }
}