import {
  LOAD_ADDRESS_ERROR,
  LOAD_ADDRESS_START,
  LOAD_ADDRESS_SUCCESS,
} from '../constants'
import { GET_CITIES, GET_CITIES_SUCCESS, GET_CITIES_FAILURE } from '../actions/address'

const initialState = {
  data: {
    countries: [],
    states: [],
  },
  loading: false,
  error: null,
  cities: []
};
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADDRESS_START:
      return { ...state, loading: true };
    case LOAD_ADDRESS_SUCCESS:
      return { ...state, data: action.payload, error: null, loading: false }
    case LOAD_ADDRESS_ERROR:
      return { ...state, data: { coutries: [], states: [], }, error: action.payload, loading: false }
    case GET_CITIES:
      return { ...state, loading: true }
    case GET_CITIES_SUCCESS:
      return { ...state, cities: action.payload, loading: false }
    case GET_CITIES_FAILURE:
      return { ...state, error: action.payload, loading: false }
    default:
      return state;
  }
};
export default addressReducer;
