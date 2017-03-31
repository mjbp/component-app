export const InfoContent = (className, hidden, clickHandler) => `<div class="info__content${className}" aria-hidden="${hidden}">
    This is a set of <a href="//stormid.com">StormId's</a> accessible UI components published on npm. The full component specification can be viewed in this <a href="https://gist.github.com/mjbp/6343de6f7b0e19e7a11e">gist</a>
    <svg onclick="${clickHandler}(this)" class="info__close" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
</div>`;