import {
  GENERATE_USER_CODE_ERROR,
  GENERATE_USER_CODE_START,
  GENERATE_USER_CODE_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  CLEAR_USER, SIGN_UP_TYPE
} from '../constants';
import { encode } from 'base-64'
import { env } from '../env'
import AsyncStorage from '@react-native-async-storage/async-storage'

function signupType(str) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SIGN_UP_TYPE,
        payload: str,
      })
    } catch (err) {
      console.log("Sign up type was not set.")
    }
  }
}

function generateUserCode(info) {
  return async (dispatch) => {
    // alert("generateUserCode")
    try {
      dispatch({
        type: GENERATE_USER_CODE_START,
        payload: null,
      });
      let username = 'memefeed';
      let password = 'Connect12345!';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data')
      myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`,
      );
      let formData = new FormData();
      formData.append('handle_name', info.handleName);
      formData.append('session_id', info.session_id);
      // if (info.user_type && info.user_type === 'User') {
      //   formData.append('user_type', info.user_type);
      //   formData.append('login_with', info.login_with);
      // } else {
      //   formData.append('name', info.name);
      // }
      
      // console.log("Handle name: " + JSON.stringify(formData))
      const res = await fetch(`${env.baseUrl}users/handlelist`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json()
      console.log("Handle name error: " + JSON.stringify(responseJson))

      return dispatch({
        type: GENERATE_USER_CODE_SUCCESS,
        payload: responseJson,
      });
    } catch (err) {
      console.log(err)
      return dispatch({
        type: GENERATE_USER_CODE_ERROR,
        payload: err,
      });
    }
  };
}

function validateUserCode(info, userInfo) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GENERATE_USER_CODE_START,
        payload: null,
      });
      let username = 'memefeed';
      let password = 'Connect12345!';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`,
      );
      let formData = new FormData();
      formData.append('handle_name', info.handleName);
      formData.append('passcode', info.passcode);
      const res = await fetch(`${env.baseUrl}users/logincheck`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      let sessesion_current = 40;
      if (
        responseJson.session_id !== undefined &&
        responseJson.session_id !== null
      ) {
        sessesion_current = responseJson.session_id;
      }
      userInfo.session_id = sessesion_current;
      return dispatch({
        type: GENERATE_USER_CODE_SUCCESS,
        payload: userInfo,
      });
    } catch (err) {
      return dispatch({
        type: GENERATE_USER_CODE_ERROR,
        payload: err,
      });
    }
  };
}

function genrateOrValidateOtp(info, userInfo) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GENERATE_USER_CODE_START,
        payload: null,
      });
      let username = 'memefeed';
      let password = 'Connect12345!';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`,
      );
      let formData = new FormData();
      if (info.phone !== undefined) {
        formData.append('phone_number', info.phone)
        formData.append('user_type', info.user_type)
        formData.append('login_with', info.login_with)
        formData.append('type', info.type)
      }
      if (info.otp !== undefined) {
        formData.append('otp', Number(info.otp));
      }

      // console.log('phone_number' + JSON.stringify(formData))

      formData.append('session_id', info.session_id);
      const res = await fetch(`${env.baseUrl}users/mobileOtp`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      if(responseJson.status === 0){
        alert(JSON.stringify(responseJson.msg))
      }
      userInfo.otp = responseJson.otp;
      return dispatch({
        type: GENERATE_USER_CODE_SUCCESS,
        payload: responseJson,
      })
    } catch (err) {
      alert(err)
      return dispatch({
        type: GENERATE_USER_CODE_ERROR,
        payload: err,
      });
    }
  };
}

function loginUser(info) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_USER_START,
        payload: null,
      });
      let username = 'memefeed';
      let password = 'Connect12345!';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data')
      myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`,
      );
      let formData = new FormData();
      formData.append('handle_name', info.handleName);
      formData.append('passcode', info.passcode);
      const res = await fetch(`${env.baseUrl}users/logincheck`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      if (responseJson.session_id === 0) {
        responseJson = null;
      }

      try {
        const jsonValue = JSON.stringify(responseJson)
        await AsyncStorage.setItem('userData', jsonValue)
        console.log("stored")

      } catch (e) {
        alert("User details are not stored")
      }

      return dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: responseJson,
      });
    } catch (err) {
      return dispatch({
        type: LOGIN_USER_ERROR,
        payload: err.toString()
      })
    }
  };
}

function addBasicInfo(info, userInfo) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GENERATE_USER_CODE_START,
        payload: null,
      });
      let username = 'memefeed';
      let password = 'Connect12345!';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append(
        'Authorization',
        `Basic ${encode(`${username}:${password}`)}`,
      );
      let formData = new FormData();
      formData.append('user_id', info.user_id);
      formData.append('password', info.password);
      formData.append('date_of_birth', info.date_of_birth);
      formData.append('gender', info.gender);
      formData.append('state', info.state);
      formData.append('city', info.city);
      formData.append('zipcode', info.zipcode);
      formData.append('country', info.country);
      const res = await fetch(`${env.baseUrl}users/basicinfo`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      if (responseJson.msg) userInfo.msg = responseJson.msg;
      return dispatch({
        type: GENERATE_USER_CODE_SUCCESS,
        payload: userInfo,
      });
    } catch (err) {
      return dispatch({
        type: GENERATE_USER_CODE_ERROR,
        payload: err,
      });
    }
  };
}

function clearUser() {
  return async (dispatch) => {
    return dispatch({
      type: CLEAR_USER,
      payload: null,
    });
  };
}

export {
  generateUserCode,
  validateUserCode,
  genrateOrValidateOtp,
  loginUser,
  addBasicInfo,
  clearUser,
  signupType
};
