const initialState = {}

const setPoll = (state, action) => {
    return action.data
}

const setCount = (state, action) => {
    const choices = state.choices.map(choice=>{
        if(choice.id === action.payload.id){
            return action.payload
        }
        return choice
    })
    return {...state, choices}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_POLL':
            return setPoll(state, action)
        case 'SET_COUNT':
            return setCount(state, action)
        default:
            return state
    }
}

export default reducer