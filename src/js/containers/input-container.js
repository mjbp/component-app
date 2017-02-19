import { Input } from '../components/input';

import styles from '../../css/input.css'

export const InputContainer = (store, actions) => { 
    window.inputHandler = e => {
        store.dispatch(actions.searchTermChanged(e.value));
    };

    return `${Input('inputHandler')}`;
}; 