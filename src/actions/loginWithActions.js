import { env } from '../env'
import { encode } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create Redux action types
export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE'

import { LOGIN_USER_ERROR, LOGIN_USER_START, LOGIN_USER_SUCCESS, CLEAR_USER } from '../constants'

// Create Redux action creators that return an action
export const getUserInfo = () => ({
    type: LOGIN_USER_START,
})

export const getUserInfoSuccess = (info) => ({
    type: LOGIN_USER_SUCCESS,
    payload: info,
})

export const getUserInfoFailure = () => ({
    type: LOGIN_USER_ERROR,
})

// Combine them all in an asynchronous thunk
export function fetchUserInfo(info) {
    return async (dispatch) => {
        dispatch(getUserInfo())
        // let strInfo = null
        // if (info.login_with === 'gmail') {
        //     strInfo = info.login_info.user.toString()
        // } else if (info.login_with === 'facebook') {
        //     strInfo = info.login_info.toString()
        // }
        // console.log(strInfo)

        try {
            let username = 'memefeed'
            let password = 'Connect12345!'
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`,
            )
            let formData = new FormData()
            formData.append('name', info.name)
            formData.append('profile_image', info.profile_image)
            formData.append('handle_name', info.handle_name)
            formData.append('user_type', info.user_type)
            formData.append('login_with', info.login_with)
            formData.append('email', info.email)

            console.log("User formData: " + JSON.stringify(formData))

            const res = await fetch(`${env.baseUrl}users/handlelist`, {
                method: 'POST',
                headers: myHeaders,
                body: formData,
            })
            let data = await res.json()
            // console.log("Login with user data: " + JSON.stringify(data))
            try {
                const jsonValue = JSON.stringify(data)
                await AsyncStorage.setItem('userData', jsonValue)
                console.log("User data stored locally.")

            } catch (e) {
                alert("User details are not stored locally.")
            }

            dispatch(getUserInfoSuccess(data))
        } catch (error) {
            dispatch(getUserInfoFailure())
            console.error("Login with user error: " + error)
            // alert("Login with user error: " + error)
        }
    }
}