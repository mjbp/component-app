import { Logo } from '../components/logo';
import { InputContainer } from './input-container';

import styles from '../../css/header.css'

export const HeaderContainer = (store, actions) => `<header>${Logo()}${InputContainer(store, actions)}</header><div class="list"></div>`;