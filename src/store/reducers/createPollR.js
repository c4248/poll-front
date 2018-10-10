const initialState = { id: null}

const setRedirect = (state, action) => {
    return {id: action.id}
}

const clear = (state, action) => {
    return {id:null}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_REDIRECT': return setRedirect(state, action)
        case 'CLEAR': return clear()
        default: 
            return state;
    }
}

export default reducer