import {
  GENERATE_USER_CODE_ERROR,
  GENERATE_USER_CODE_START,
  GENERATE_USER_CODE_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  CLEAR_USER,
} from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create Redux action creators that return an action
export const getUserData = () => ({
  type: LOGIN_USER_START,
})

export const getUserDataSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data,
})

export const getUserDataFailure = () => ({
  type: LOGIN_USER_ERROR,
})

// Combine them all in an asynchronous thunk
export function setUserData(data) {
  return async (dispatch) => {
    dispatch(getUserData())

    try {
      try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('userData', jsonValue)
        console.log("User data stored locally.")
      } catch (e) {
        alert("User details are not stored locally.")
      }
      dispatch(getUserDataSuccess(data))
    } catch (error) {
      dispatch(getUserDataFailure())
    }
  }
}