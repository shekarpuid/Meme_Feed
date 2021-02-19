import { env } from "../env"
import { encode } from 'base-64'

// Create Redux action types
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE'

// Create Redux action creators that return an action
export const getComments = () => ({
    type: GET_COMMENTS
})

export const getCommentsSuccess = (posts) => ({
    type: GET_COMMENTS_SUCCESS,
    payload: posts
})

export const getCommentsFailure = () => ({
    type: GET_COMMENTS_FAILURE
})

// Fetch comments method
export function fetchComments(id) {
    return async (dispatch) => {
        dispatch(getComments())

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
            formData.append('postid', id)

            const url = `${env.baseUrl}comments/commentList` // get post comments api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const data = await response.json()
            // console.log("Comments List: " + JSON.stringify(data))

            dispatch(getCommentsSuccess(data))
        } catch (error) {
            dispatch(getCommentsFailure())
            alert(error)
            console.error(error)
        }
    }
}