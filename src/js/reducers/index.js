import { SEARCH_INPUT_CHANGED, DATA_ERROR, DATA_LOADED, INFO_CLICKED } from '../constants';

const initialState = {
  immutableData: [],
  data : [],
  loaded: false,
  info: false,
  searchTerm : ''
};

export default function componentReducer(state = initialState, action) {

  var doFilter = (searchTerm=state.searchTerm) => {
    var filtered = state.immutableData;
    
    if (searchTerm && searchTerm.trim().length) {
      filtered = state.immutableData.length ? state.immutableData.filter(item => (item.package.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
            item.package.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
            item.package.keywords.filter(keyword => keyword.toLowerCase() === searchTerm.toLowerCase()).length)
      ) : []
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

  case INFO_CLICKED:
    return {
      ...state,
      info: !state.info
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