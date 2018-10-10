export const createQuestion = (question) => {
    return {
        type: 'CREATE_QUESTION',
        question
    }
}

export const setRedirect = (id) => {
    return {
        type: 'SET_REDIRECT',
        id
    }
}

export const clearCreate = () => {
    console.log('CLEAR')
    return {
        type: 'CLEAR'
    }
}
