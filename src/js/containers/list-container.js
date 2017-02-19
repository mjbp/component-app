import { List } from '../components/list';

import styles from '../../css/card.css';

export const ListContainer = store => {
    return `${List(store.getState().data).join('')}`;
}

