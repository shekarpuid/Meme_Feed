import { env } from "../env"
import { encode } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create Redux action types
export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'

// Create Redux action creators that return an action
export const getPosts = () => ({
    type: GET_POSTS
})

export const getPostsSuccess = (posts) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts
})

export const getPostsFailure = () => ({
    type: GET_POSTS_FAILURE
})

// Combine them all in an asynchronous thunk
export function fetchPosts() {
    return async (dispatch) => {
        dispatch(getPosts())

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
            formData.append('from', 0)
            formData.append('to', 9)

            const response = await fetch(`${env.baseUrl}posts/postlist`, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const data = await response.json()

            // alert("Posts data: " + JSON.stringify(data))

            // try {
            //     const jsonValue = JSON.stringify(data)
            //     await AsyncStorage.setItem('posts', jsonValue)
            //     console.log("All posts locally.")
            // } catch (error) {
            //     console.error(error);
            //     alert("All posts not stored locally.")
            // }

            dispatch(getPostsSuccess(data))
        } catch (error) {
            dispatch(getPostsFailure())
            alert(error)
            console.error("All posts " + error)
        }
    }
}