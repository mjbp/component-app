import * as actions from './actions';
import API from './api';
import { HeaderContainer } from './containers/header-container';
import { ListContainer } from './containers/list-container';
import { createStore } from './redux/createStore';
import reducers from './reducers';

import styles from '../css/base.css'

const store = createStore(reducers);

const init = () => {
    renderHeader();
    store.subscribe(renderList);
    API(store, actions);
};

const renderHeader = () => {
    document.querySelector('.root').innerHTML = HeaderContainer(store, actions);
};

const renderList = () => {
    document.querySelector('.list').innerHTML = ListContainer(store);
};

window.addEventListener('DOMContentLoaded', init);