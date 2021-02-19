import {
  LOAD_POST_TYPE_ERROR,
  LOAD_POST_TYPE_SUCCESS,
  LOAD_POST_TYPE_START,
} from '../constants';
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const postTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST_TYPE_START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_POST_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case LOAD_POST_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default postTypeReducer;
