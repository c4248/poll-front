const initialState = {
    polls: [],
    hasNext: null, 
}

const setQuestions = (state, action) => {
    return {polls: [...state.polls, ...action.questions.polls], hasNext: action.questions.hasNext}
}




const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_QUESTIONS':
            return setQuestions(state, action)
        case 'CLEAR_QUESTIONS':
            return initialState
        default: 
            return state;
    }
}

export default reducer