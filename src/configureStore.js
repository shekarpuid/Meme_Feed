import {createStore, combineReducers, applyMiddleware} from 'redux' 
import countReducer from './reducers/counterReducer' 
import userReducer from './reducers/userReducer' 
import addressReducer from './reducers/addressReducer' 
import postReducer from './reducers/postReducer' 
import createPostReducer from './reducers/createPostReducer' 
import postTypesReducer from './reducers/postTypes' 

import reduxThunk from 'redux-thunk' 
import {composeWithDevTools} from 'redux-devtools-extension' 
import postsReducer from './reducers/postsReducer' 
import commentsReducer from './reducers/commentsReducer' 
import postComments from './reducers/postCommentsReducer'
import childCommentsReducer from './reducers/childCommentsReducer'
import ForgotPasswordReducer from './reducers/ForgotPasswordReducer'
import editPostReducer from './reducers/editPostReducer'

const composeEnhancers = composeWithDevTools({}) 
const rootReducer = combineReducers({
  count: countReducer,
  user: userReducer,
  address: addressReducer,
  posts: postReducer,
  createPost: createPostReducer,
  postTypes: postTypesReducer,
  // mine
  posts: postsReducer,
  comments: commentsReducer,
  postComments,
  childComments: childCommentsReducer,
  fuser: ForgotPasswordReducer,
  editPost: editPostReducer
}) 
const middleware = composeEnhancers(applyMiddleware(reduxThunk)) 
const configureStore = () => {
  return createStore(rootReducer, middleware) 
} 
export default configureStore 
