import * as actions from './libs/actions';
import API from './libs/api';
import { UI, List } from './libs/containers';
import { createStore } from './libs/redux';
import reducers from './libs/reducers';

const store = createStore(reducers);

const init = () => {

    // fetch('https://api.npms.io/v2/search?q=stormid+component')
    // .then(function(res) {
    //     return res.json();
    // })
    // .then(function(data) {
    //     return console.log(data.results);
    // })
    // .catch(function(err) {
    //     // Error :(
    // });

    renderUI()
    store.subscribe(renderList);
};

const renderUI = () => {
    document.querySelector('.root').innerHTML = UI(store, actions);
    renderList();
};
const renderList = () => {
    document.querySelector('.list').innerHTML = List(store);
};

window.addEventListener('DOMContentLoaded', init);