import {
  GENERATE_USER_CODE_START,
  GENERATE_USER_CODE_SUCCESS,
  GENERATE_USER_CODE_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  CLEAR_USER, SIGN_UP_TYPE
} from '../constants';
const initialState = {
  data: null,
  loading: false,
  error: null,
  signupType: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_USER_CODE_START:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_TYPE:
      return { ...state, signupType: action.payload }
    case LOGIN_USER_START:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_USER_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GENERATE_USER_CODE_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case CLEAR_USER:
      return {
        data: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
export default userReducer;
