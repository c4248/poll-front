export const getPoll = (id) => {
    return {
        type: 'GET_POLL',
        id
    }
}

export const setPoll = (data) =>{
    return {
        type: 'SET_POLL',
        data
    }
}

export const addCountToPoll = (payload) => {
    return {
        type: 'ADD_COUNT_TO_POLL',
        payload
    }
}

export const setCount = (payload) => {
    return {
        type: 'SET_COUNT',
        payload
    }
}

export const delCountFromPoll = (payload) => {
    return {
        type: 'DEL_COUNT_FROM_POLL',
        payload
    }
}