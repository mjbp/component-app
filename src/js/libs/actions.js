import { SEARCH_INPUT_CHANGED } from './constants'; 

//action creators
export function searchTermChanged(term) {
  return {
    type: SEARCH_INPUT_CHANGED,
    searchTerm
  };
}