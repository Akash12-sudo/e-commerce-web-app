
export const initialState = false 

const authenticateLogin = (state = initialState, action) => {

    switch(action.type){
        case "LOGIN": return true
        case "LOGOUT": return false
        default: return state
    }
}


export default authenticateLogin