export const componentList = items => items.map(componentItem);

export const componentItem = item => `<div class="card">
    <h1 class="card__title">${item.title}</h1>
    <div class="card__description">${item.description}</div>
    <div class="card__version">${item.version}</div>
    <div class="card__tags">${item.tags.map(tag => `<div class="card__tag">${tag}</div>`).join('')}</div>
</div>`;