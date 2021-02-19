import {
  CREATE_POST_ERROR,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
} from '../constants' 
import {encode} from 'base-64' 
import {env} from '../env'

function createNewPost(info) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_POST_START,
        payload: null,
      }) 
      let username = 'memefeed' 
      let password = 'Connect12345!' 
      let myHeaders = new Headers() 
      myHeaders.append('Content-Type', 'multipart/form-data') 
      myHeaders.append('Authorization', `Basic ${encode(`${username}:${password}`)}`) 
      let formData = new FormData() 
      formData.append('userId', info.userId) 
      formData.append('ptypeId', info.ptypeId) 
      formData.append('post_image', 'data:image/png;base64,' + info.post_image) 
      formData.append('post_description', info.post_description) 
      formData.append('post_id', info.post_id)

      // extra data
      formData.append('hashtag_ids', 1) 
      formData.append('viewed_ids', 1) 
      formData.append('up_vote', 1) 
      formData.append('down_vote', 1) 
      formData.append('commentids', 1) 
      formData.append('status', 1) 
      formData.append('shares', 1) 
      // console.log('form data', JSON.stringify(formData))

      const res = await fetch(`${env.baseUrl}posts/postlist`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      }) 
      // console.log('res', res) 
      let responseJson = await res.json() 
      console.log('Created post response: ' + JSON.stringify(responseJson))
      alert(responseJson.msg)
      await dispatch({
        type: CREATE_POST_SUCCESS,
        payload: responseJson,
      }) 
    } catch (err) {
      alert('error: Post not created.', err)
      console.log('err', err.toString()) 
      return dispatch({
        type: CREATE_POST_ERROR,
        payload: err
      }) 
    }
  } 
}

export {createNewPost} 
