import { InfoButton } from '../components/info-button';
import { InfoContent } from '../components/info-content';

import styles from '../../css/info.css'

export const InfoContainer = (store, actions) => { 
    window.clickHandler = e => {
        store.dispatch(actions.infoClicked());
    };
    return  `${InfoButton('clickHandler')}${InfoContent(store.getState().info ? ' active' : '', 'clickHandler')}`;
}