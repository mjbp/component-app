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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DATA_ENDPOINT = exports.DATA_ENDPOINT = 'https://api.npms.io/v2/search?q=stormid+component+not:deprecated';

//actions
var SEARCH_INPUT_CHANGED = exports.SEARCH_INPUT_CHANGED = 'SEARCH_INPUT_CHANGED';
var DATA_LOADED = exports.DATA_LOADED = 'DATA_LOADED';
var DATA_ERROR = exports.DATA_ERROR = 'DATA_ERROR';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataLoaded = dataLoaded;
exports.dataError = dataError;
exports.searchTermChanged = searchTermChanged;

var _constants = __webpack_require__(2);

function dataLoaded(data) {
  return {
    type: _constants.DATA_LOADED,
    data: data
  };
}

function dataError() {
  return {
    type: _constants.DATA_ERROR
  };
}

function searchTermChanged(searchTerm) {
  return {
    type: _constants.SEARCH_INPUT_CHANGED,
    searchTerm: searchTerm
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(2);

exports.default = function (store, actions) {

    // if ('caches' in window) {
    //     caches.match(DATA_ENDPOINT)
    //     .then(response => {
    //         if (response) {
    //             response.json()
    //             .then(data => {
    //                 // Only update if the XHR is still pending, otherwise the XHR
    //                 // has already returned and provided the latest data.
    //                 console.log('updated from cache');
    //                 store.dispatch(actions.dataLoaded(data.results));
    //             });
    //         }
    //     });
    // }
    fetch(_constants.DATA_ENDPOINT).then(function (res) {
        return res.json();
    }).then(function (data) {
        return store.dispatch(actions.dataLoaded(data.results));
    }).catch(function (err) {
        store.dispatch(actions.dataError());
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlankContainer = undefined;

var _blank = __webpack_require__(11);

var BlankContainer = exports.BlankContainer = function BlankContainer() {
  return [0, 0, 0, 0].map(function () {
    return '<div class="card">' + (0, _blank.Blank)() + '</div>';
  }).join('');
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderContainer = undefined;

var _logo = __webpack_require__(15);

var _inputContainer = __webpack_require__(16);

var _header = __webpack_require__(22);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderContainer = exports.HeaderContainer = function HeaderContainer(store, actions) {
    return '<header class="header">\n    ' + (0, _logo.Logo)() + (0, _inputContainer.InputContainer)(store, actions) + '\n    <svg class="header__icon" fill="#FFFFFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">\n        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>\n        <path d="M0 0h24v24H0z" fill="none"/>\n    </svg>\n</header>\n<div class="list"></div>';
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListContainer = undefined;

var _list = __webpack_require__(14);

var _card = __webpack_require__(21);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListContainer = exports.ListContainer = function ListContainer(store) {
  return '' + (0, _list.List)(store.getState().data).join('');
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = componentReducer;

var _constants = __webpack_require__(2);

var initialState = {
  immutableData: [],
  data: [],
  loaded: false,
  searchTerm: ''
};

function componentReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];


  var doFilter = function doFilter() {
    var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.searchTerm;

    var filtered = state.immutableData;

    if (searchTerm && searchTerm.trim().length) {
      filtered = state.immutableData.length ? state.immutableData.filter(function (item) {
        return item.package.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.package.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.package.keywords.filter(function (keyword) {
          return keyword.toLowerCase() === searchTerm.toLowerCase();
        }).length;
      }) : [];
    }

    return filtered;
  };

  switch (action.type) {

    case _constants.DATA_LOADED:
      return _extends({}, state, {
        loaded: true,
        immutableData: action.data,
        data: action.data
      });

    case _constants.DATA_ERROR:
      return _extends({}, state, {
        loaded: false
      });

    case _constants.SEARCH_INPUT_CHANGED:
      return _extends({}, state, {
        searchTerm: action.searchTerm,
        data: doFilter(action.searchTerm)
      });

    default:
      return state;
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//Butchered redux createStore

var ActionTypes = exports.ActionTypes = {
    INIT: '@@redux/INIT'
};

var createStore = exports.createStore = function createStore(reducer) {
    var currentReducer = reducer,
        currentState = undefined,
        currentListeners = [],
        nextListeners = currentListeners,
        isDispatching = false;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) nextListeners = currentListeners.slice();
    }

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        if (typeof listener !== 'function') throw new Error('Expected listener to be a function.');

        var isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
        };
    }

    function dispatch(action) {

        if (typeof action.type === 'undefined') throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');

        if (isDispatching) throw new Error('Reducers may not dispatch actions.');

        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        var listeners = currentListeners = nextListeners;
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            listener();
        }

        return action;
    }

    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.');
        }

        currentReducer = nextReducer;
        dispatch({ type: ActionTypes.INIT });
    }

    dispatch({ type: ActionTypes.INIT });

    return {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./base.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./base.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Blank = exports.Blank = function Blank() {
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 565.8 126.7\">\n    <g>\n        <rect fill=\"#EDEDEE\" width=\"241.8\" height=\"20.2\"/>\n        <rect y=\"30.7\" fill=\"#EDEDEE\" width=\"483.6\" height=\"14.3\"/>\n        <rect y=\"50.7\" fill=\"#EDEDEE\" width=\"206.5\" height=\"14.3\"/>\n        <rect y=\"73.9\" fill=\"#EDEDEE\"\" width=\"29.2\" height=\"11\"/>\n        <rect y=\"91.9\"  fill=\"#EDEDEE\" width=\"152.1\" height=\"11\"/>\n        <rect x=\"545.7\" y=\"106.6\" fill=\"#EDEDEE\" width=\"20.1\" height=\"20.1\"/>\n        <rect x=\"493.2\" y=\"110.8\" fill=\"#EDEDEE\" width=\"41.8\" height=\"13.9\"/>\n    </g>\n</svg>";
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Card = exports.Card = function Card(item) {
    return '<div class="card">\n    <h1 class="card__title"><a class="card__title-link" href="https://mjbp.github.io/' + item.package.name + '">' + item.package.name + '</a></h1>\n    <div class="card__description">' + item.package.description + '</div>\n    <div class="card__version">' + item.package.version + '</div>\n    ' + (item.package.keywords.length ? '<div class="card__tags">\n        <svg height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">\n            <path d="M0 0h24v24H0z" fill="none"/>\n            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/>\n        </svg>\n        ' + item.package.keywords.filter(function (tag) {
        return tag !== 'component' && tag !== 'stormid';
    }).map(function (tag) {
        return '<div class="card__tag">' + tag + '</div>';
    }).join(' ') + '\n     </div>' : '') + '\n    <div class="card__links">\n        <a class="card__link" href="' + item.package.links.npm + '">\n            <svg width="36" height="14" viewBox="0 0 18 7">\n                <path d="M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"/>\n                <polygon fill="#FFFFFF" points="1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 "/>\n                <path fill="#FFFFFF" d="M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z"/>\n                <polygon fill="#FFFFFF" points="11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "/>\n            </svg>\n        </a>\n        <a class="card__link" href="' + item.package.links.repository + '">\n            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.58 31.77" width="20" height="20">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.29,0C7.29,0,0,7.29,0,16.29c0,7.2,4.67,13.3,11.14,15.46\n                    c0.81,0.15,1.11-0.35,1.11-0.79c0-0.39-0.01-1.41-0.02-2.77c-4.53,0.98-5.49-2.18-5.49-2.18C6,24.13,4.93,23.62,4.93,23.62\n                    c-1.48-1.01,0.11-0.99,0.11-0.99c1.63,0.12,2.5,1.68,2.5,1.68c1.45,2.49,3.81,1.77,4.74,1.35c0.15-1.05,0.57-1.77,1.03-2.18\n                    C9.7,23.08,5.9,21.68,5.9,15.44c0-1.78,0.63-3.23,1.68-4.37C7.41,10.65,6.85,9,7.73,6.76c0,0,1.37-0.44,4.48,1.67\n                    c1.3-0.36,2.69-0.54,4.08-0.55c1.38,0.01,2.78,0.19,4.08,0.55c3.11-2.11,4.48-1.67,4.48-1.67c0.89,2.24,0.33,3.9,0.16,4.31\n                    c1.04,1.14,1.67,2.59,1.67,4.37c0,6.26-3.81,7.63-7.44,8.04c0.58,0.5,1.11,1.5,1.11,3.02c0,2.18-0.02,3.93-0.02,4.47\n                    c0,0.44,0.29,0.94,1.12,0.78c6.47-2.16,11.13-8.26,11.13-15.45C32.58,7.29,25.29,0,16.29,0z"/>\n            </svg>\n        </a>\n    </div>\n</div>';
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Input = exports.Input = function Input(keyDownHandler) {
  return "<input type=\"text\" onkeyup=\"" + keyDownHandler + "(this)\">";
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = undefined;

var _card = __webpack_require__(12);

var List = exports.List = function List(items) {
  return items.map(_card.Card);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Logo = exports.Logo = function Logo() {
  return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"31\" viewBox=\"20 -2.2 240.8 51.2\"><path fill=\"#fff\" d=\"M22.2 36.2c1.4 3.9 3 6.5 4.8 8s4 2.2 6.7 2.2c2.4 0 4.3-.5 5.7-1.6 1.3-1.1 1.9-2.4 1.9-4 0-.9-.2-1.8-.7-2.4-.5-.7-1.1-1.2-2-1.6-.9-.4-3.1-.9-6.7-1.5-3.4-.6-5.8-1.4-7.2-2.1s-2.4-1.8-3.2-3.1c-.7-1.3-1.1-2.7-1.1-4.2 0-2.3.8-4.4 2.3-6.3 2-2.4 4.8-3.6 8.4-3.6 2.7 0 5.3.9 7.6 2.6l2.2-2.4h1.4l.9 11.2H41c-1-3.2-2.3-5.4-4-6.9-1.6-1.4-3.7-2.1-6.2-2.1-2.1 0-3.8.5-5 1.6-1.2 1.1-1.8 2.3-1.8 3.8 0 1.3.6 2.4 1.6 3.3 1.1.9 3.2 1.6 6.4 2.1 3.7.6 6.2 1.1 7.2 1.6 1.9.6 3.3 1.7 4.3 3.1 1 1.4 1.5 3.1 1.5 5.1 0 2.8-1.1 5.2-3.3 7-2.2 1.9-4.9 2.9-8.3 2.9-3.1 0-6-1-8.7-3.1l-2.4 2.8h-1.7L20 36.2h2.2zM58.6 3.8h2.2v12.8H71v3.1H60.8v20.2c0 1.7.4 3.1 1.2 4 .9.9 1.9 1.4 3.2 1.4 1.5 0 2.8-.7 3.9-2.1 1.1-1.4 1.7-3.7 1.9-6.9h2.2c-.1 4.2-1.1 7.3-2.9 9.3s-4.1 3-6.9 3c-2.6 0-4.7-.7-6.1-2.1s-2.2-3.3-2.2-5.6V19.8h-5.4v-2.4c2.5-.4 4.4-1.4 5.7-3.2 2-2.5 3-6 3.2-10.4zM91.9 15.7c4.2 0 7.8 1.5 10.7 4.6s4.3 7.1 4.3 12.1c0 3.4-.6 6.4-1.9 8.8s-3.2 4.4-5.5 5.7c-2.4 1.4-4.9 2.1-7.7 2.1-4.1 0-7.5-1.6-10.4-4.7-2.9-3.1-4.2-7.1-4.2-12s1.4-9 4.3-12c2.8-3.1 6.2-4.6 10.4-4.6zm0 2.3c-2.5 0-4.6 1.1-6.2 3.4-1.6 2.3-2.4 5.9-2.4 10.7 0 5 .8 8.7 2.4 11s3.7 3.4 6.2 3.4c2.7 0 4.7-1.1 6.4-3.4 1.6-2.3 2.4-6.1 2.4-11.3 0-4.9-.8-8.4-2.4-10.5-1.6-2.2-3.7-3.3-6.4-3.3zM110.9 16.6l11.3-.6v12.8c1.2-4.2 2.7-7.4 4.4-9.5 1.7-2.1 3.8-3.2 6.3-3.2 1.7 0 3.1.5 4.1 1.6s1.5 2.4 1.5 4.2c0 1.4-.4 2.5-1 3.3-.7.8-1.5 1.1-2.6 1.1-1 0-1.8-.4-2.4-1-.6-.6-.9-1.6-.9-2.7 0-.7.1-1.4.6-2.1.4-.6.5-.9.5-1.1 0-.4-.2-.5-.6-.5-.9 0-1.9.5-3.2 1.6-1.6 1.5-2.9 3.6-3.7 6.2-1.4 4.1-2 7.3-2 9.7v6.7c0 .8.3 1.4.8 1.7s1.4.6 2.7.6h4v2.5h-19.6v-2.5h3.2c1.1 0 1.9-.2 2.4-.6.6-.4.8-.9.8-1.5V23.2c0-1.5-.4-2.7-1-3.4s-1.6-1.1-2.8-1.1H111l-.1-2.1zM143.9 16.6l9-.6c.5 2.4.8 4.6 1 6.7 1.7-2.4 3.4-4.2 5.1-5.2 1.7-1 3.6-1.5 5.6-1.5 2.1 0 3.9.6 5.4 1.7 1.4 1.1 2.5 3 3.3 5.5 1.5-2.4 3.2-4.2 5-5.4 1.9-1.2 3.9-1.8 6-1.8 2.9 0 5 .9 6.4 2.6 1.9 2.2 2.7 5.2 2.7 8.7v15.6c0 .9.2 1.6.7 1.9.6.5 1.6.8 2.8.8h1.6v2.5h-15.8v-2.5h1.6c1.4 0 2.3-.2 2.8-.6.6-.4.8-1.1.8-2V27.2c0-2.4-.6-4.2-1.7-5.4-1.1-1.3-2.7-1.9-4.5-1.9-1.4 0-2.7.4-3.8 1.1s-2 1.8-2.7 3.2c-.9 2-1.4 3.7-1.4 5.1v13.5c0 .9.2 1.6.7 2s1.3.6 2.3.6h2.1v2.5h-16v-2.5h1.8c1.1 0 2-.2 2.6-.6.6-.4.9-1 .9-1.7V28.6c0-3.1-.6-5.3-1.6-6.7-1.1-1.4-2.6-2.1-4.4-2.1-2.4 0-4.2.8-5.4 2.4-1.8 2.3-2.7 4.9-2.7 8v12.7c0 .9.2 1.6.6 2 .6.5 1.6.7 2.8.7h1.6v2.5h-15.8v-2.5h2.4c.9 0 1.6-.2 2.1-.6.5-.4.7-1 .7-1.7V22.6c0-1.1-.3-2-.9-2.6-.6-.6-1.7-.9-3.5-1.1l-.2-2.3z\"/><path fill=\"gray\" d=\"M202.5 16.6l12.5-.4v27.1c0 .7.1 1.3.6 1.6.5.4 1.1.6 1.9.6h3.6V48h-17.9v-2.5h3.3c1 0 1.7-.2 2.1-.7.4-.5.7-1.1.7-2.1V22.9c0-1.3-.4-2.2-1.1-2.9-.7-.7-1.8-.9-3.2-.9h-2.6l.1-2.5zm8.8-18.8c1 0 1.9.4 2.7 1.1.8.7 1.1 1.6 1.1 2.7 0 1-.4 1.9-1.1 2.7-.7.7-1.6 1.1-2.7 1.1-1 0-1.9-.4-2.7-1.1-.7-.7-1.1-1.6-1.1-2.7s.4-1.9 1.1-2.7c.8-.7 1.7-1.1 2.7-1.1zM239.6-1.6l12.3-.6v43.1c0 1.6.3 2.9.9 3.6.6.7 1.6 1.1 2.9 1.1h2.1v2.5h-10.7l-.8-6.4c-1.3 2.3-2.8 4-4.5 5.2-1.7 1.1-3.7 1.7-5.7 1.7-3.6 0-6.7-1.5-9.2-4.5s-3.8-6.9-3.8-11.9c0-5.3 1.6-9.6 4.9-12.8 2.5-2.5 5.4-3.7 8.7-3.7 2 0 3.8.5 5.4 1.5 1.6 1 3 2.5 4.2 4.6V4.1c0-.9-.4-1.7-1.1-2.2-.7-.6-1.9-.8-3.4-.8h-2.2v-2.7zm-1.9 20.1c-2.4 0-4.4 1-5.7 3-1.4 2-2.1 5.4-2.1 10.1 0 5.2.7 8.7 2.1 10.8 1.4 2.1 3.3 3.2 5.6 3.2 2.4 0 4.5-1.1 6.2-3.5s2.6-5.7 2.6-10.2c0-4.2-.9-7.6-2.8-10-1.6-2.4-3.6-3.4-5.9-3.4z\"/></svg>";
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputContainer = undefined;

var _input = __webpack_require__(13);

var _input2 = __webpack_require__(23);

var _input3 = _interopRequireDefault(_input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputContainer = exports.InputContainer = function InputContainer(store, actions) {
    window.inputHandler = function (e) {
        store.dispatch(actions.searchTermChanged(e.value));
    };

    return '' + (0, _input.Input)('inputHandler');
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "* {\n    margin:0;\n    padding:0;\n    box-sizing: border-box;\n}\nbody {\n    background:#f5f5f5;\n    color:#191919;\n    font: 200 100%/1.4 Roboto, \"Helvetica-Neue\", Helvetica, sans-serif; \n}\n.root {\n    padding-top:100px;\n}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".card {\n    box-shadow:0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2);\n    background-color:#fff;\n    padding:12px 16px 8px;\n    margin:0 24px 24px 24px;\n}\n.card__blank {\n    width:100%;\n    height:auto;\n}\n.card__title {\n    font-size:1.1rem;\n    margin-bottom: .5rem;\n}\n.card__title-link {\n    text-decoration: none;\n    color:#191919;\n    transition:color 120ms ease;\n}\n.card__title-link:hover {\n    color:blue;\n}\n.card__description {\n    font-size:.9rem;\n    margin-bottom: .25rem;\n}\n.card__version {\n    font-size:.75rem;\n    margin-bottom: .25rem;\n}\n.card__tags-icons {\n    display: inline-block;\n    vertical-align: top;\n}\n.card__tag {\n    display: inline-block;\n    vertical-align: top;\n    font-size:.75rem;\n}\n.card__tag:not(:last-child):after{\n    content:', '\n}\n.card__links {\n    text-align: right;\n}\n.card__link {\n    display: inline-block;\n    margin-left:8px;\n}\n.card__link svg {\n    fill:#191919;\n}\n.card__link:hover svg {\n    fill:blue;\n}", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".header {\n    background:rgba(22,22,22, .95);\n    display: flex;\n    padding:24px;\n    position: fixed;\n    top:0;\n    left:0;\n    right:0;\n    will-change: transform;\n    justify-content: space-between; \n}\n.header__icon {\n    position: fixed;\n    right:30px;\n    top:32px;\n    opacity:.4;\n}\ninput:focus ~ .header__icon {\n    opacity:.8;\n}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "input {\n    border:0 none;\n    background:rgba(255, 255, 255, .1);\n    border-bottom: 1px solid rgba(255, 255, 255, .1);\n    margin-left:48px;\n    flex-grow: 1;\n    padding:4px 35px 4px 8px;\n    font-size:1rem;\n    color:#fff;\n    max-width:400px;\n    transition: border-color 120ms ease;\n}\ninput:focus {\n    outline: none;\n    border-bottom-color:rgba(255,255,255,.5);\n}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./card.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./card.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./header.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./header.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./input.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./input.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _actions = __webpack_require__(3);

var actions = _interopRequireWildcard(_actions);

var _api = __webpack_require__(4);

var _api2 = _interopRequireDefault(_api);

var _headerContainer = __webpack_require__(6);

var _listContainer = __webpack_require__(7);

var _blankContainer = __webpack_require__(5);

var _createStore = __webpack_require__(9);

var _reducers = __webpack_require__(8);

var _reducers2 = _interopRequireDefault(_reducers);

var _base = __webpack_require__(10);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var store = (0, _createStore.createStore)(_reducers2.default);

var init = function init() {
    document.querySelector('.root').innerHTML = (0, _headerContainer.HeaderContainer)(store, actions);
    document.querySelector('.list').innerHTML = (0, _blankContainer.BlankContainer)();
    store.subscribe(renderList);
    (0, _api2.default)(store, actions);

    if ('serviceWorker' in navigator) window.addEventListener('load', function () {
        return navigator.serviceWorker.register('sw.js');
    });
};

var renderList = function renderList() {
    document.querySelector('.list').innerHTML = (0, _listContainer.ListContainer)(store);
};

window.addEventListener('DOMContentLoaded', init);

/***/ })
/******/ ]);