import * as actions from './libs/actions';
import API from './libs/api';
import { App } from './libs/containers';
import { createStore } from './libs/redux';
import components from './libs/reducers';

const store = createStore(components);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').innerHTML = App(API.data).join('');
});