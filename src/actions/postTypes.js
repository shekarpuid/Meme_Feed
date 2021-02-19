import {
  LOAD_POST_TYPE_ERROR,
  LOAD_POST_TYPE_START,
  LOAD_POST_TYPE_SUCCESS,
} from '../constants';
import {encode} from 'base-64';
import {env} from '../env'

function loadPostTypes() {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_POST_TYPE_START,
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
      const res = await fetch(`${env.baseUrl}posts/ptypelist`, {
        method: 'GET',
        headers: myHeaders,
      });
      let responseJson = await res.json();
      // console.log('load post type response:', responseJson);
      return dispatch({
        type: LOAD_POST_TYPE_SUCCESS,
        payload: responseJson,
      });
    } catch (err) {
      console.log('err', err.toString());
      return dispatch({
        type: LOAD_POST_TYPE_ERROR,
        payload: err,
      });
    }
  };
}

export {loadPostTypes};
