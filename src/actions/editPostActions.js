
// Create Redux action types
export const SEND_POST_SUCCESS = 'GET_POSTS_SUCCESS'
export const SEND_POST_EMPTY = 'GET_POSTS_SUCCESS'

// Create Redux action creators that return an action
export const sendPostSuccess = (post) => ({
    type: SEND_POST_SUCCESS,
    payload: post
})

export const sendPostEmptySuccess = (post) => ({
    type: SEND_POST_EMPTY,
    payload: post
})

// Combine them all in an asynchronous thunk
export function sendPostData(post) {
    return async (dispatch) => {
        await dispatch(sendPostSuccess(post))
    }
}

export function sendPostEmpty() {
    return async (dispatch) => {
        await dispatch(sendPostEmptySuccess())
    }
}
