import * as actions from './actions';
import API from './api';
import { HeaderContainer } from './containers/header-container';
import { ListContainer } from './containers/list-container';
import { InfoContainer } from './containers/info-container';
import { BlankContainer } from './containers/blank-container';
import { createStore } from './redux/createStore';
import reducers from './reducers';

import styles from '../css/base.css'

const store = createStore(reducers);

const init = () => {
    document.querySelector('.root').innerHTML = HeaderContainer(store, actions);
    document.querySelector('.list').innerHTML = BlankContainer();
    store.subscribe(renderList);
    store.subscribe(renderInfo);
    API(store, actions);

    if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
};

const renderList = () => {
    document.querySelector('.list').innerHTML = ListContainer(store);
};

const renderInfo = () => {
    document.querySelector('.info').innerHTML = InfoContainer(store, actions);
};

window.addEventListener('DOMContentLoaded', init);