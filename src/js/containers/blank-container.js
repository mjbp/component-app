import { Blank } from '../components/blank';

export const BlankContainer = () => [0,0,0,0].map(() => `<div class="card">${Blank()}</div>`).join('');

