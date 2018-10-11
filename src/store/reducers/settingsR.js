const initialState ={
    userData: null
}


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SET_USER_DATA': return ({userData: action})
        case 'POLL_DELETE': return state
        case 'P_UPDATE' : return state
        default: return state
    }
}

export default reducer