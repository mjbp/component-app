import { SEARCH_INPUT_CHANGED, DATA_ERROR, DATA_LOADED } from '../constants';

const initialState = {
  immutableData: [],
  data : [],
  loaded: false,
  searchTerm : ''
};

export default function componentReducer(state = initialState, action) {

  var doFilter = (searchTerm=state.searchTerm) => {
    var filtered = state.immutableData;
    
    if (searchTerm && searchTerm.trim().length) {
      filtered = state.immutableData.length ? state.immutableData.filter(item => item.package.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) : []
    }

    return filtered;
  };

  switch (action.type) {

  case DATA_LOADED:
    return {
      ...state,
      loaded: true,
      immutableData: action.data,
      data : action.data,
    };

  case DATA_ERROR:
    return {
      ...state,
      loaded: false
    };

  case SEARCH_INPUT_CHANGED:
    return {
      ...state,
      searchTerm : action.searchTerm,
      data : doFilter(action.searchTerm)
    };

  default:
    return state;
  }
}