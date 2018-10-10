export const getQuestions = (page) =>{
    return {
        type: 'GET_QUESTIONS',
        page
    }
}

export const setQuestions = (questions) =>{
    return {
        type: 'SET_QUESTIONS',
        questions
    }
}

export const clearQuestions = () => {
    return {
        type: 'CLEAR_QUESTIONS'
    }
}
