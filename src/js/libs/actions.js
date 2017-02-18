import { SEARCH_INPUT_CHANGED } from './constants'; 

//action creators
export function searchTermChanged(searchTerm) {
  return {
    type: SEARCH_INPUT_CHANGED,
    searchTerm
  };
}