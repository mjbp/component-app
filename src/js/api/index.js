import { DATA_ENDPOINT } from '../constants'

export default (store, actions) => {
    fetch(DATA_ENDPOINT)
    .then(res => {
        return res.json();
    })
    .then(data => {
        store.dispatch(actions.dataLoaded(data.results));
    })
    .catch(function(err) {
        store.dispatch(actions.dataError());
    });
};