import { SEARCH_INPUT_CHANGED } from './constants';
import * as Components from './store';

const initialState = {
  components : Components,
  searchTerm : ''
};

export default function components(state = initialState, action) {

  var doFilter = (searchTerm=state.searchTerm) => {
    var filtered = Components;//immutabilty required...
    if (searchTerm) {
        //proper filtering required
      filtered = Components.filter(item => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }

    return filtered;
  };

  switch (action.type) {
  case SEARCH_INPUT_CHANGED:
    return {
      ...state,
      searchTerm : action.searchTerm,
      components : doFilter(action.searchTerm)
    };

  default:
    return state;
  }
}