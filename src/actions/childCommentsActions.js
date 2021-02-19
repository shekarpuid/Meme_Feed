import { env } from '../env'
import { encode } from 'base-64'

// Create Redux action types
export const SET_COMMENT_ID = 'SET_COMMENT_ID'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

// Create Redux action creators that return an action
export function setCommentId(id) {
  return ({ type: SET_COMMENT_ID, payload: id})
}

export function increaseCount() {
  return ({ type: INCREMENT});
}

export function decreaseCount() {
  return ({ type: DECREMENT});
}

export function resetCount() {
  return ({ type: RESET});
}


// Create Redux action types
export const GET_CHILD_COMMENTS = 'GET_CHILD_COMMENTS'
export const GET_CHILD_COMMENTS_SUCCESS = 'GET_CHILD_COMMENTS_SUCCESS'
export const GET_CHILD_COMMENTS_FAILURE = 'GET_CHILD_COMMENTS_FAILURE'

// Create Redux action creators that return an action
export const getChildComments = () => ({
    type: GET_CHILD_COMMENTS
})

export const getChildCommentsSuccess = (posts) => ({
    type: GET_CHILD_COMMENTS_SUCCESS,
    payload: posts
})

export const getChildCommentsFailure = () => ({
    type: GET_CHILD_COMMENTS_FAILURE
})

// Fetch comments method
export function fetchChildComments(id) {
    return async (dispatch) => {
        dispatch(getChildComments())

        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`
            )

            let formData = new FormData() 
            formData.append('parent_id', id)

            const url = `${env.baseUrl}comments/get_child_comment_list` // get child comments api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const data = await response.json()

            dispatch(getChildCommentsSuccess(data))
        } catch (error) {
            dispatch(getChildCommentsFailure())
            alert(error)
            console.error(error)
        }
    }
}