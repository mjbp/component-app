/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    data: [{
        title: 'storm-load',
        description: 'Lightweight promise-based script loader',
        tags: ['stormid', 'load', 'script', 'loader', 'utility', 'component'],
        version: '0.5.1'

    }, {
        title: 'storm-toggler',
        description: 'Accessible class-toggling for CSS-based UI state manipulation',
        tags: ['stormid', 'toggler', 'off-canvas', 'toggle', 'UI'],
        version: '0.11.0'

    }, {
        title: 'storm-modal',
        description: 'Accessible modal dialogue',
        tags: ['stormid', 'modal', 'component', 'UI'],
        version: '0.6.0'

    }] };

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//action types
const SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';
/* harmony export (immutable) */ __webpack_exports__["a"] = SEARCH_INPUT_CHANGED;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["searchTermChanged"] = searchTermChanged;


//action creators
function searchTermChanged(searchTerm) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SEARCH_INPUT_CHANGED */],
    searchTerm
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(6);


const List = store => {
    return `${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__components__["a" /* componentList */])(store.getState().components).join('')}`;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = List;


const UI = (store, actions) => {
    window.inputHandler = e => {
        store.dispatch(actions.searchTermChanged(e.value));
    };

    return `${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__components__["b" /* input */])('inputHandler')}<div class="list"></div>`;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = UI;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = componentReducer;



const initialState = {
  components: __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].data,
  searchTerm: ''
};

function componentReducer(state = initialState, action) {

  var doFilter = (searchTerm = state.searchTerm) => {
    var filtered = __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].data;
    if (searchTerm) {

      filtered = __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].data.filter(item => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }

    return filtered;
  };

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* SEARCH_INPUT_CHANGED */]:
      return {
        state,
        searchTerm: action.searchTerm,
        components: doFilter(action.searchTerm)
      };

    default:
      return state;
  }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//Butchered redux createStore

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
const ActionTypes = {
    INIT: '@@redux/INIT'
};
/* unused harmony export ActionTypes */


const createStore = reducer => {
    let currentReducer = reducer,
        currentState = undefined,
        currentListeners = [],
        nextListeners = currentListeners,
        isDispatching = false;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
    }

    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */
    function getState() {
        return currentState;
    }

    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all state changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */
    function subscribe(listener) {
        if (typeof listener !== 'function') throw new Error('Expected listener to be a function.');

        let isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
        };
    }

    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */
    function dispatch(action) {

        if (typeof action.type === 'undefined') throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');

        if (isDispatching) throw new Error('Reducers may not dispatch actions.');

        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        const listeners = currentListeners = nextListeners;
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }

        return action;
    }

    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */
    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.');
        }

        currentReducer = nextReducer;
        dispatch({ type: ActionTypes.INIT });
    }

    // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    dispatch({ type: ActionTypes.INIT });

    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer
    };
};
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const componentList = items => items.map(componentItem);
/* harmony export (immutable) */ __webpack_exports__["a"] = componentList;


const componentItem = item => `<div class="card">
    <h1 class="card__title">${item.title}</h1>
    <div class="card__description">${item.description}</div>
    <div class="card__version">${item.version}</div>
    <div class="card__tags">${item.tags.map(tag => `<div class="card__tag">${tag}</div>`).join('')}</div>
</div>`;
/* unused harmony export componentItem */


const input = keyDownHandler => {
    // return '<input type="text" onkeydown="(function(e){console.log(e.target.value); })(event)">'
    return `<input type="text" onkeyup="${keyDownHandler}(this)">`;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = input;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_actions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_api__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_containers__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_reducers__ = __webpack_require__(4);






const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__libs_redux__["a" /* createStore */])(__WEBPACK_IMPORTED_MODULE_4__libs_reducers__["a" /* default */]);

const init = () => {

    fetch('https://api.npms.io/v2/search?q=stormid+component').then(function (res) {
        return res.json();
    }).then(function (data) {
        return console.log(data.results);
    }).catch(function (err) {
        // Error :(
    });

    renderUI();
    store.subscribe(renderList);
};

const renderUI = () => {
    document.querySelector('.root').innerHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_containers__["a" /* UI */])(store, __WEBPACK_IMPORTED_MODULE_0__libs_actions__);
    renderList();
};
const renderList = () => {
    document.querySelector('.list').innerHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_containers__["b" /* List */])(store);
};

window.addEventListener('DOMContentLoaded', init);

/***/ })
/******/ ]);