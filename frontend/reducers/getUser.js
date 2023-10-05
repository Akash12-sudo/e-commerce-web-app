
export const initialState = {}


const getUser = (state = initialState, action) => {

    switch(action.type) {
        case "data": return action.payload
        default: return state
    }
}

export default getUser