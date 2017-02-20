export const Card = item => `<div class="card">
    <h1 class="card__title"><a class="card__title-link" href="https://mjbp.github.io/${item.package.name}">${item.package.name}</a></h1>
    <div class="card__description">${item.package.description}</div>
    <div class="card__version">${item.package.version}</div>
    ${item.package.keywords.length ? `<div class="card__tags">
        <svg height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/>
        </svg>
        ${item.package.keywords.filter(tag => tag !== 'component' && tag !== 'stormid').map(tag => `<div class="card__tag">${tag}</div>`).join(' ')}
     </div>` : ``}
    <div class="card__links">
        <a class="card__link" href="${item.package.links.npm}">
            <svg width="36" height="14" viewBox="0 0 18 7">
                <path d="M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"/>
                <polygon fill="#FFFFFF" points="1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 "/>
                <path fill="#FFFFFF" d="M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z"/>
                <polygon fill="#FFFFFF" points="11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "/>
            </svg>
        </a>
        <a class="card__link" href="${item.package.links.repository}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.58 31.77" width="20" height="20">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29,0C7.29,0,0,7.29,0,16.29c0,7.2,4.67,13.3,11.14,15.46
                    c0.81,0.15,1.11-0.35,1.11-0.79c0-0.39-0.01-1.41-0.02-2.77c-4.53,0.98-5.49-2.18-5.49-2.18C6,24.13,4.93,23.62,4.93,23.62
                    c-1.48-1.01,0.11-0.99,0.11-0.99c1.63,0.12,2.5,1.68,2.5,1.68c1.45,2.49,3.81,1.77,4.74,1.35c0.15-1.05,0.57-1.77,1.03-2.18
                    C9.7,23.08,5.9,21.68,5.9,15.44c0-1.78,0.63-3.23,1.68-4.37C7.41,10.65,6.85,9,7.73,6.76c0,0,1.37-0.44,4.48,1.67
                    c1.3-0.36,2.69-0.54,4.08-0.55c1.38,0.01,2.78,0.19,4.08,0.55c3.11-2.11,4.48-1.67,4.48-1.67c0.89,2.24,0.33,3.9,0.16,4.31
                    c1.04,1.14,1.67,2.59,1.67,4.37c0,6.26-3.81,7.63-7.44,8.04c0.58,0.5,1.11,1.5,1.11,3.02c0,2.18-0.02,3.93-0.02,4.47
                    c0,0.44,0.29,0.94,1.12,0.78c6.47-2.16,11.13-8.26,11.13-15.45C32.58,7.29,25.29,0,16.29,0z"/>
            </svg>
        </a>
    </div>
</div>`;