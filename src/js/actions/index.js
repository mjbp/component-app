import { SEARCH_INPUT_CHANGED, DATA_ERROR, DATA_LOADED, INFO_CLICKED } from '../constants'; 

export function dataLoaded(data) {
  
  return {
    type: DATA_LOADED,
    data
  };
}

export function dataError() {
  return {
    type: DATA_ERROR
  };
}

export function searchTermChanged(searchTerm) {
  return {
    type: SEARCH_INPUT_CHANGED,
    searchTerm
  };
}

export function infoClicked(){
  return {
    type: INFO_CLICKED
  };
}