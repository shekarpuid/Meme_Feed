import * as actions from '../actions/ForgotPasswordActions'

export const initialState = {
    fuser: {}
}

export default function ForgotPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_FUSER_INFO:
            return { ...state, fuser: action.payload }
        default:
            return state
    }
}






