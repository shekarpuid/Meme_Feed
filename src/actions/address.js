import {
  LOAD_ADDRESS_ERROR,
  LOAD_ADDRESS_START,
  LOAD_ADDRESS_SUCCESS,
} from '../constants';
import { encode } from 'base-64';
import { env } from '../env'


export const GET_CITIES = 'GET_CITIES'
export const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS'
export const GET_CITIES_FAILURE = 'GET_CITIES_FAILURE'

function loadCountries(info) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_ADDRESS_START,
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
      const res = await fetch(`${env.baseUrl}dropdowns/countrieslist`, {
        method: 'GET',
        headers: myHeaders,
      });
      let responseJson = await res.json();
      const data = {
        countries: responseJson,
        states: [],
      };
      return dispatch({
        type: LOAD_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: LOAD_ADDRESS_ERROR,
        payload: err,
      });
    }
  };
}

function loadStates(id, info) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_ADDRESS_START,
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
      formData.append('country_id', id);

      const res = await fetch(`${env.baseUrl}dropdowns/statelist`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      // responseJson.name = info.name;
      const data = {
        countries: info.countries,
        states: responseJson,
      };
      return dispatch({
        type: LOAD_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: LOAD_ADDRESS_ERROR,
        payload: err,
      });
    }
  };
}

function loadCities(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_CITIES,
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
      formData.append('state_id', id);

      const res = await fetch(`${env.baseUrl}dropdowns/citylist`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });
      let responseJson = await res.json();
      // console.log("Cities response: " + JSON.stringify(responseJson))
      // responseJson.name = info.name;
      // const data = {
      //   countries: info.countries,
      //   states: responseJson,
      // };
      return dispatch({
        type: GET_CITIES_SUCCESS,
        payload: responseJson,
      });
    } catch (err) {
      return dispatch({
        type: GET_CITIES_FAILURE,
        payload: err,
      });
    }
  };
}

export { loadCountries, loadStates, loadCities };
