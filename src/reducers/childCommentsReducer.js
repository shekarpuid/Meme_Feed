import * as actions from '../actions/childCommentsActions'

const initialState = {
    childComments: [],
    loading: false,
    hasErrors: false,
    childCommentId: 0
}

export default function childCommentsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_COMMENT_ID:
            return { ...state, childCommentId: action.payload }
        case actions.GET_CHILD_COMMENTS:
            return { ...state, loading: true }
        case actions.GET_CHILD_COMMENTS_SUCCESS:
            return { ...state, childComments: action.payload, loading: false, hasErrors: false }
        case actions.GET_CHILD_COMMENTS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        default:
            return state
    }
}