import { List } from '../components/list';

import styles from '../../css/card.css';

export const ListContainer = store => `${List(store.getState().data).join('')}`;

