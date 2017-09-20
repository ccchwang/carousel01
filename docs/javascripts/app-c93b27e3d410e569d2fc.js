/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Automatically instantiates modules based on data-attributes
  specifying module file-names.
*/

var moduleElements = document.querySelectorAll('[data-module]');

for (var i = 0; i < moduleElements.length; i++) {
  var el = moduleElements[i];
  var name = el.getAttribute('data-module');
  var Module = __webpack_require__(4)("./" + name).default;
  new Module(el);
}

/*
  Usage:
  ======

  html
  ----
  <button data-module="disappear">disappear!</button>

  js
  --
  // modules/disappear.js
  export default class Disappear {
    constructor(el) {
      el.style.display = 'none'
    }
  }
*/

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carousel = function () {
  function Carousel(el) {
    _classCallCheck(this, Carousel);

    this.el = el;
    this.init();
    this.bindEvents();
  }

  _createClass(Carousel, [{
    key: 'init',
    value: function init() {
      var viewports = this.el.getElementsByClassName('carousel__viewport');
      this.setViewport(viewports[1], 'lgViewport');
      this.setViewport(viewports[0], 'smViewport');

      var buttons = this.el.getElementsByClassName('controls');
      this.prevButton = buttons[0];
      this.nextButton = buttons[1];

      this.counter = this.el.getElementsByClassName('counter')[0];
    }
  }, {
    key: 'setViewport',
    value: function setViewport(viewport, viewportName) {
      var _this = this;

      //initialize map of viewport items
      this[viewportName + 'Map'] = [];

      //get all items inside viewport
      var items = [].slice.call(viewport.getElementsByClassName('item-wrapper'));

      //for each item, cache details in map
      items.forEach(function (item, i) {
        var lastIndex = items.length - 1;
        var next = i === lastIndex ? 0 : i + 1;
        var prev = i === 0 ? lastIndex : i - 1;

        _this[viewportName + 'Map'][i] = { item: item, next: next, prev: prev, index: i + 1 };

        //set active item
        if (item.classList.value.includes('-active')) {
          _this[viewportName + 'Active'] = _this[viewportName + 'Map'][i];
        }
      });
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      this.nextButton.addEventListener('click', this.onClick.bind(this, 'next'));
      this.prevButton.addEventListener('click', this.onClick.bind(this, 'prev'));
    }
  }, {
    key: 'onClick',
    value: function onClick(direction) {
      var movePos = direction === 'next' ? 'Left' : 'Right';
      var placePos = direction === 'next' ? 'Right' : 'Left';

      //set next sibling node from map
      var sibNode_L = this.lgViewportMap[this.lgViewportActive[direction]];
      var sibNode_S = this.smViewportMap[this.smViewportActive[direction]];

      //set next sibling element
      var sib_L = sibNode_L.item;
      var sib_S = sibNode_S.item;

      //set currently active element
      var active_L = this.lgViewportActive.item;
      var active_S = this.smViewportActive.item;

      //disable click on button
      this.nextButton.classList.add('disableClick');
      this.prevButton.classList.add('disableClick');

      /////**********************////change counter
      var goingBack = direction === 'prev' ? true : false;
      var classes = goingBack ? ' pre-animation -backward' : ' pre-animation';
      this.counter.classList += classes;

      setTimeout(function () {
        this.counter.classList.remove('pre-animation');
        this.counter.classList.add('during-animation');
        this.counter.innerHTML = sibNode_L.index;
      }.bind(this), 200);

      setTimeout(function () {
        this.counter.classList.remove('during-animation');

        if (goingBack) {
          this.counter.classList.remove('-backward');
        }
      }.bind(this), 300);
      /////******************////


      //place siblings
      this.placeSibling(sib_L, sib_S, placePos);

      //move elements
      setTimeout(this.moveElements.bind(this, active_L, active_S, sib_L, sib_S, movePos), 50);

      //remove classes and set new active element
      setTimeout(function () {
        this.removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos);
        this.setNewActive(sib_L, sib_S, sibNode_L, sibNode_S);
      }.bind(this), 1400);
    }
  }, {
    key: 'placeSibling',
    value: function placeSibling(sib_L, sib_S, pos) {
      sib_L.classList.add('-place' + pos);
      sib_S.classList.add('-place' + pos);
    }
  }, {
    key: 'moveElements',
    value: function moveElements(active_L, active_S, sib_L, sib_S, pos) {
      active_L.classList.add('-move' + pos);
      active_S.classList.add('-move' + pos);

      sib_L.classList.add('-move' + pos);
      sib_S.classList.add('-move' + pos);
    }
  }, {
    key: 'removeClasses',
    value: function removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos) {
      active_L.classList.remove('-active');
      active_L.classList.remove('-move' + movePos);
      active_S.classList.remove('-active');
      active_S.classList.remove('-move' + movePos);

      sib_L.classList.remove('-move' + movePos);
      sib_L.classList.remove('-place' + placePos);
      sib_S.classList.remove('-move' + movePos);
      sib_S.classList.remove('-place' + placePos);

      this.nextButton.classList.remove('disableClick');
      this.prevButton.classList.remove('disableClick');
    }
  }, {
    key: 'setNewActive',
    value: function setNewActive(sib_L, sib_S, sibNode_L, sibNode_S) {
      sib_L.classList.add('-active');
      sib_S.classList.add('-active');

      this.lgViewportActive = sibNode_L;
      this.smViewportActive = sibNode_S;
    }
  }]);

  return Carousel;
}();

/* harmony default export */ __webpack_exports__["default"] = (Carousel);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules__);


console.log('app.js has loaded!');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 0,
	"./Carousel": 1,
	"./Carousel.js": 1,
	"./index": 0,
	"./index.js": 0
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 4;

/***/ })
/******/ ]);