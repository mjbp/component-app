export const componentList = items => itms.map(componentitem);;  

export const componentItem = item => `<div class="card">
    <h1 class="card__title">${item.title}</h1>
    <div class="card__description">${item.description}</h1>
</div>`;