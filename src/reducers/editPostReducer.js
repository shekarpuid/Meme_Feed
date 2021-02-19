import * as actions from '../actions/editPostActions'

export const initialState = {
    post: {},
}

export default function editPostReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SEND_POST_SUCCESS:
            return { ...state, post: action.payload }
        case actions.SEND_POST_EMPTY:
            return { ...state, post: {} }
        default:
            return state
    }
}
