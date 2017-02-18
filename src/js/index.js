import * as actions from './libs/actions';
import API from './libs/api';
import { UI, List } from './libs/containers';
import { createStore } from './libs/redux';
import reducers from './libs/reducers';

const store = createStore(reducers);

const init = () => {
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