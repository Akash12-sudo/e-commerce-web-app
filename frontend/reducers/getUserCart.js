
export const initialState = []

const getUserCart = (state = initialState, action) => {
    switch(action.type){
        case 'cart': return action.payload
        default: return initialState
    }
}

export default getUserCart
