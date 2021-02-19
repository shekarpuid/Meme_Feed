import { INCREMENT, DECREMENT, RESET, SET_COMMENT_ID } from '../actions/childCommentsActions'

const initialState = {
    commentId: 0,
    count: 0,
    childComments: []
}

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENT_ID:
            return {...state, commentId: action.payload}
        case INCREMENT:
            return {...state, count: state.count + 1}
        case DECREMENT:
            return {...state, count: state.count - 1}
        case RESET:
            return (initialState)
        default:
            return state
    }
}