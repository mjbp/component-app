import { SEARCH_INPUT_CHANGED } from './constants';
import API from './api';

const initialState = {
  components : API,
  searchTerm : ''
};

export default function componentReducer(state = initialState, action) {

  var doFilter = (searchTerm=state.searchTerm) => {
    var filtered = API;//immutabilty required...
    if (searchTerm) {
        //proper filtering required
      filtered = API.filter(item => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }

    return filtered;
  };

  switch (action.type) {
  case SEARCH_INPUT_CHANGED:
    return {
      //...state,
      searchTerm : action.searchTerm,
      components : doFilter(action.searchTerm)
    };

  default:
    return state;
  }
}