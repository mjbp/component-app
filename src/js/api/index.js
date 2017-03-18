import { DATA_ENDPOINT } from '../constants'

export default (store, actions) => {

    // if ('caches' in window) {
    //     caches.match(DATA_ENDPOINT)
    //     .then(response => {
    //         if (response) {
    //             response.json()
    //             .then(data => {
    //                 // Only update if the XHR is still pending, otherwise the XHR
    //                 // has already returned and provided the latest data.
    //                 console.log('updated from cache');
    //                 store.dispatch(actions.dataLoaded(data.results));
    //             });
    //         }
    //     });
    // }
    fetch(DATA_ENDPOINT)
    .then(res => res.json())
    .then(data => store.dispatch(actions.dataLoaded(data.results)))
    .catch(err => {
        store.dispatch(actions.dataError());
    });
};