import {
  LOAD_POST_START,
  LOAD_POST_SUCCESS,
  LOAD_POST_ERROR,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
} from '../constants';
const initialState = {
  data: null,
  loading: false,
  error: null,
};

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_START:
      return {
        ...state,
        loading: true,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CREATE_POST_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default createPostReducer;
