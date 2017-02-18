import { componentList, input } from './components';

export const List = (store) => {
    return `${componentList(store.getState().components).join('')}`;
}

export const UI = (store, actions) => { 
    window.inputHandler = e => {
        store.dispatch(actions.searchTermChanged(e.value));
    };

    return `${input('inputHandler')}<div class="list"></div>`;
}; 