import {
  LOAD_POST_START,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
} from '../constants';
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case LOAD_POST_ERROR:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default postReducer;
