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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/mvc/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/mvc/index.js":
/*!**************************!*\
  !*** ./dev/mvc/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../frontend/core/index.js */ "./frontend/core/index.js");
/* harmony import */ var _frontend_modules_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../frontend/modules/index.js */ "./frontend/modules/index.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PageContainer =
/*#__PURE__*/
function (_Core$Container) {
  _inherits(PageContainer, _Core$Container);

  function PageContainer() {
    _classCallCheck(this, PageContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageContainer).apply(this, arguments));
  }

  return PageContainer;
}(_frontend_core_index_js__WEBPACK_IMPORTED_MODULE_0__["Container"]);

var Page =
/*#__PURE__*/
function (_Core$Container2) {
  _inherits(Page, _Core$Container2);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  return Page;
}(_frontend_core_index_js__WEBPACK_IMPORTED_MODULE_0__["Container"]);

var CatalogPage =
/*#__PURE__*/
function (_Page) {
  _inherits(CatalogPage, _Page);

  function CatalogPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CatalogPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CatalogPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      alert('page home');
    });

    return _this;
  }

  return CatalogPage;
}(Page);

var Item =
/*#__PURE__*/
function (_Modules$Component) {
  _inherits(Item, _Modules$Component);

  function Item() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, Item);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Item)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "onClick", function () {
      alert('Hello from item class view');
    });

    return _this2;
  }

  _createClass(Item, [{
    key: "template",
    value: function template() {
      return '' + '<div class"item">' + '<h1 onClick="this.onItemClick()">Item</h1>' + '<input type="text" onchange="this.onInputChanged( event )">' + '</div';
    }
  }, {
    key: "onInputChanged",
    value: function onInputChanged(event) {
      // controller
      debugger;
    }
  }, {
    key: "onItemClick",
    value: function onItemClick() {
      alert('on item heading click');
    }
  }]);

  return Item;
}(_frontend_modules_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: "initialize",
    value: function initialize() {
      this.elements = {
        root: document.getElementById('root')
      };
      this.app = new _frontend_core_index_js__WEBPACK_IMPORTED_MODULE_0__["Element"](this.elements.root, "<div class=\"app\">App</div>");
      this.pageContainer = new PageContainer(this.app, '<div class="page">Page Container</div>');
      this.pageContainer.on('render', this.onPageContainerRender.bind(this));
      this.homePage = new CatalogPage(this.pageContainer, '<div class="homepage">Home Page</div>');
      this.app.render();
      this.pageContainer.set(this.homePage);
      this.pageContainer.render();
    }
  }, {
    key: "onPageContainerRender",
    value: function onPageContainerRender() {
      console.log('onPageContainerRender');
      var item = new Item(this.homePage);
      item.render();
    }
  }]);

  return App;
}();

var app = new App();
app.initialize();

/***/ }),

/***/ "./frontend/core/base.js":
/*!*******************************!*\
  !*** ./frontend/core/base.js ***!
  \*******************************/
/*! exports provided: Base, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context.js */ "./frontend/core/context.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Base =
/*#__PURE__*/
function () {
  /**
   * @type {HTMLElement}
   */

  /**
   * Function constructor() : Create Custom Element.
   *
   * @param {Node|HTMLElement|Base} parent
   * @param {String|HTMLElement|Context} context
   * @param {{}} options
   */
  function Base(parent, context, options) {
    _classCallCheck(this, Base);

    _defineProperty(this, "element", void 0);

    if (!parent) {
      throw Error('parent is required.');
    }

    this.context = context;
    this.parent = parent;

    if (context instanceof HTMLElement) {
      this.element = context;
    } else if (!(context instanceof _context_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      context = new _context_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.context);
    } else {
      throw Error('context is invalid');
    }

    this.context = context;
    this.beforeInit();
    this.initialize(options);
    this.afterInit();
  }

  _createClass(Base, [{
    key: "initialize",
    value: function initialize() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    }
  }, {
    key: "render",
    value: function render() {
      var preventDefault = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!preventDefault) this.beforeRender();
      var parent = this.parent;

      if (parent instanceof Base) {
        parent = this.parent.element;
      } // If its instance of HTMLElement then we assume it was rendered before.


      if (this.context instanceof HTMLElement && this.context.isConnected) {
        // Re-render.
        parent.removeChild(this.context); // Render

        parent.appendChild(this.context);
      } else if (this.context instanceof _context_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        // Do not remove if its not attached to DOM.
        if (this.element && this.element.isConnected) {
          parent.removeChild(this.element);
        } // Render.


        this.element = parent.appendChild(this.context.create());
      }

      if (!preventDefault) this.afterRender();
      return this.element;
    }
  }, {
    key: "beforeInit",
    value: function beforeInit() {}
  }, {
    key: "afterInit",
    value: function afterInit() {}
  }, {
    key: "beforeRender",
    value: function beforeRender() {}
  }, {
    key: "afterRender",
    value: function afterRender() {}
  }]);

  return Base;
}();
/* harmony default export */ __webpack_exports__["default"] = (Base);

/***/ }),

/***/ "./frontend/core/container.js":
/*!************************************!*\
  !*** ./frontend/core/container.js ***!
  \************************************/
/*! exports provided: Container, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./frontend/core/base.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Container =
/*#__PURE__*/
function (_Base) {
  _inherits(Container, _Base);

  function Container(parent, context, options) {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, _getPrototypeOf(Container).call(this, parent, context, options));
  }

  _createClass(Container, [{
    key: "initialize",
    value: function initialize() {
      this.events = {
        onRender: function onRender() {}
      };

      _get(_getPrototypeOf(Container.prototype), "initialize", this).call(this);
    }
  }, {
    key: "afterRender",
    value: function afterRender() {
      _get(_getPrototypeOf(Container.prototype), "afterRender", this).call(this);

      if (this.events && this.events.onRender) {
        this.events.onRender(this.child);
      }
    }
    /**
     *
     * @param {Container} child
     */

  }, {
    key: "set",
    value: function set(child) {
      if (!(child instanceof Container)) {
        throw new Error();
      }

      this.child = child;
    }
  }, {
    key: "render",
    value: function render() {
      this.beforeRender();

      _get(_getPrototypeOf(Container.prototype), "beforeRender", this).call(this); // Self Re-render.


      _get(_getPrototypeOf(Container.prototype), "render", this).call(this, true); // Re-render of child.


      if (this.child) {
        this.child.render();
      }

      this.afterRender();

      _get(_getPrototypeOf(Container.prototype), "afterRender", this).call(this);
    }
    /**
     * Function on() : Declare event callback
     *
     * @param {'render'} event
     * @param {{function()}} callback
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      switch (event) {
        case 'render':
          {
            this.events.onRender = callback;
          }
          break;

        default:
          {
            alert("".concat(this.constructor.name, "::on() -> invalid event type: '").concat(event, "'"));
          }
      }
    }
  }]);

  return Container;
}(_base_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (Container);

/***/ }),

/***/ "./frontend/core/context.js":
/*!**********************************!*\
  !*** ./frontend/core/context.js ***!
  \**********************************/
/*! exports provided: Context, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
/* harmony import */ var _library_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../library/html.js */ "./frontend/library/html.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Context =
/*#__PURE__*/
function () {
  /**
   * @type {Node}
   */
  function Context(context) {
    _classCallCheck(this, Context);

    _defineProperty(this, "node", void 0);

    this.context = context;
  }
  /**
   *
   * @returns {Node}
   */


  _createClass(Context, [{
    key: "create",
    value: function create() {
      this.beforeCreate();
      this.node = _library_html_js__WEBPACK_IMPORTED_MODULE_0__["default"].toNode(this.context);
      this.afterCreate();
      return this.node;
    }
  }, {
    key: "beforeCreate",
    value: function beforeCreate() {}
  }, {
    key: "afterCreate",
    value: function afterCreate() {}
  }]);

  return Context;
}();
/* harmony default export */ __webpack_exports__["default"] = (Context);

/***/ }),

/***/ "./frontend/core/element.js":
/*!**********************************!*\
  !*** ./frontend/core/element.js ***!
  \**********************************/
/*! exports provided: Element, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container.js */ "./frontend/core/container.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Element =
/*#__PURE__*/
function (_Container) {
  _inherits(Element, _Container);

  function Element() {
    _classCallCheck(this, Element);

    return _possibleConstructorReturn(this, _getPrototypeOf(Element).apply(this, arguments));
  }

  _createClass(Element, [{
    key: "initialize",
    value: function initialize() {
      this.beforeInit();

      _get(_getPrototypeOf(Element.prototype), "initialize", this).call(this);

      if (this.context instanceof HTMLElement) {
        this.attachListeners();
      }

      this.afterInit();
    }
  }, {
    key: "beforeInit",
    value: function beforeInit() {}
  }, {
    key: "afterInit",
    value: function afterInit() {}
  }, {
    key: "afterRender",
    value: function afterRender() {
      _get(_getPrototypeOf(Element.prototype), "afterRender", this).call(this);

      this.attachListeners();
    }
  }, {
    key: "attachListener",
    value: function attachListener(method, callback) {
      switch (method) {
        case 'onClick':
          {
            this.element.addEventListener('click', callback);
          }
          break;
      }
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this = this;

      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      // Handle all parent properties if startsWith 'on' then attach it listener.
      // Allow you extend components with custom callbacks.
      Object.getOwnPropertyNames(from).forEach(function (method) {
        if (method.startsWith('on')) {
          _this.attachListener(method, from['onClick']);
        }
      }); // Attach All `this.context` elements events to `from` component.

      var nodes = [];

      if (this.context.node) {
        nodes = [this.context.node];
      }

      if (nodes.length > 0 && this.context.node.childNodes) {
        nodes = [nodes].concat(_toConsumableArray(this.context.node.childNodes));
      }

      nodes.forEach(function (node) {
        // Now u need loop all over on shit :)
        for (var i in node) {
          if (i.startsWith('on') && node[i]) {
            (function () {
              // here u wanted to eval onclick.
              var funcContent = node[i].toString();
              funcContent = funcContent.replace('this', 'from');
              funcContent = funcContent.split('{')[1].replace('}', '');
              funcContent = funcContent.replace('()', '( ... arguments)');

              node[i] = function () {
                return eval(funcContent);
              };
            })();
          }
        }
      });
    }
  }, {
    key: "click",
    value: function click(callback) {
      this.attachListener('onClick', callback);
    }
  }]);

  return Element;
}(_container_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (Element);

/***/ }),

/***/ "./frontend/core/factory.js":
/*!**********************************!*\
  !*** ./frontend/core/factory.js ***!
  \**********************************/
/*! exports provided: Factory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return Factory; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./frontend/core/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Factory =
/*#__PURE__*/
function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, null, [{
    key: "createElement",
    value: function createElement(selector) {
      selector = document.querySelector(selector);
      return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Base"](selector.parentElement, selector);
    }
  }, {
    key: "createComponent",
    value: function createComponent(selector) {
      selector = document.querySelector(selector);
      return new _index_js__WEBPACK_IMPORTED_MODULE_0__["Element"](selector.parentElement, selector);
    }
  }]);

  return Factory;
}();
/* harmony default export */ __webpack_exports__["default"] = (Factory);

/***/ }),

/***/ "./frontend/core/index.js":
/*!********************************!*\
  !*** ./frontend/core/index.js ***!
  \********************************/
/*! exports provided: Base, Container, Context, Factory, View, Element, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./frontend/core/view.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _view_js__WEBPACK_IMPORTED_MODULE_0__["View"]; });

/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element.js */ "./frontend/core/element.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return _element_js__WEBPACK_IMPORTED_MODULE_1__["Element"]; });

/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.js */ "./frontend/core/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return _base_js__WEBPACK_IMPORTED_MODULE_2__["Base"]; });

/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./container.js */ "./frontend/core/container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _container_js__WEBPACK_IMPORTED_MODULE_3__["Container"]; });

/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context.js */ "./frontend/core/context.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return _context_js__WEBPACK_IMPORTED_MODULE_4__["Context"]; });

/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./factory.js */ "./frontend/core/factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Factory", function() { return _factory_js__WEBPACK_IMPORTED_MODULE_5__["Factory"]; });






 // TODO model


/* harmony default export */ __webpack_exports__["default"] = ({
  View: _view_js__WEBPACK_IMPORTED_MODULE_0__["View"],
  Element: _element_js__WEBPACK_IMPORTED_MODULE_1__["Element"]
});

/***/ }),

/***/ "./frontend/core/view.js":
/*!*******************************!*\
  !*** ./frontend/core/view.js ***!
  \*******************************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element.js */ "./frontend/core/element.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var View =
/*#__PURE__*/
function () {
  function View(parent) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, View);

    this.element = new _element_js__WEBPACK_IMPORTED_MODULE_0__["default"](parent, options.template() || this.template(), options);
    this.initialize(options);
  }

  _createClass(View, [{
    key: "initialize",
    value: function initialize(options) {
      if (options.template) {
        this.template = options.template;
      }
    }
    /**
     * @return {String} HTML Markup.
     */

  }, {
    key: "template",
    value: function template() {
      alert('no template');
    }
  }, {
    key: "render",
    value: function render() {
      return this.element.render();
    }
  }]);

  return View;
}();

/***/ }),

/***/ "./frontend/library/html.js":
/*!**********************************!*\
  !*** ./frontend/library/html.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTML; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTML =
/*#__PURE__*/
function () {
  function HTML() {
    _classCallCheck(this, HTML);
  }

  _createClass(HTML, null, [{
    key: "toNode",

    /**
     * @param {String} HTML representing a single element
     * @return {Node}
     */
    value: function toNode(html) {
      var template = document.createElement('template');
      html = html.trim(); // Never return a text node of whitespace as the result

      template.innerHTML = html;
      return template.content.firstChild;
    }
    /**
     * @param {String} HTML representing any number of sibling elements
     * @return {NodeList} 
     */

  }, {
    key: "toNodes",
    value: function toNodes(html) {
      var template = document.createElement('template');
      template.innerHTML = html;
      return template.content.childNodes;
    }
  }]);

  return HTML;
}();



/***/ }),

/***/ "./frontend/library/jquery.js":
/*!************************************!*\
  !*** ./frontend/library/jquery.js ***!
  \************************************/
/*! exports provided: JQuery_GetSelector, JQuery_AttrChange, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JQuery_GetSelector", function() { return JQuery_GetSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JQuery_AttrChange", function() { return JQuery_AttrChange; });
/**
 * @file: library/jquery.js
 * @author: see each function.
 * @description: JQuery Addons
 */
function JQuery_GetSelector($) {
  // https://stackoverflow.com/posts/15623322/revisions
  if (typeof $.get_selector === 'function') return;

  var get_selector = function get_selector(element) {
    var pieces = [];

    for (; element && element.tagName !== undefined; element = element.parentNode) {
      if (element.className) {
        var classes = element.className.split(' ');

        for (var i in classes) {
          if (classes.hasOwnProperty(i) && classes[i]) {
            pieces.unshift(classes[i]);
            pieces.unshift('.');
          }
        }
      }

      if (element.id && !/\s/.test(element.id)) {
        pieces.unshift(element.id);
        pieces.unshift('#');
      }

      pieces.unshift(element.tagName);
      pieces.unshift(' > ');
    }

    return pieces.slice(1).join('');
  };

  $.fn.getSelector = function (only_one) {
    if (true === only_one) {
      return get_selector(this[0]);
    } else {
      return $.map(this, function (el) {
        return get_selector(el);
      });
    }
  };
} //------------------------------------------------------------------------------------------------------------------------

function JQuery_AttrChange($) {
  // https://stackoverflow.com/questions/1950038/jquery-fire-event-if-css-class-changed
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  $.fn.attrchange = function (callback) {
    if (MutationObserver) {
      var options = {
        subtree: false,
        attributes: true
      };
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (e) {
          callback.call(e.target, e.attributeName);
        });
      });
      return this.each(function () {
        observer.observe(this, options);
      });
    }
  };
} //------------------------------------------------------------------------------------------------------------------------

var LibJQuery = {
  addAttrChange: JQuery_AttrChange,
  addGetSelector: JQuery_GetSelector
};
/* harmony default export */ __webpack_exports__["default"] = (LibJQuery);

/***/ }),

/***/ "./frontend/modules/component.js":
/*!***************************************!*\
  !*** ./frontend/modules/component.js ***!
  \***************************************/
/*! exports provided: Component, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var CORE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CORE */ "./frontend/core/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Component =
/*#__PURE__*/
function () {
  /**
   *
   * @param model
   * @param {View} view
   * @param controller
   * @param options
   */
  function Component(parent, model, view, controller) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    _classCallCheck(this, Component);

    // Mode model, view, controller? assuming you create MVC component.
    if (arguments.length === 1) {
      model, view, controller = this;
      view = new CORE__WEBPACK_IMPORTED_MODULE_0__["default"].View(parent, {
        template: this['template']
      });
    } else if (arguments.length < 4) {
      throw Error('WTF');
    }

    this.model = model;
    this.view = view;
    this.controller = controller;
    this.options = options;
    this.initialize(this.options);
  }

  _createClass(Component, [{
    key: "initialize",
    value: function initialize(options) {
      var _this = this;

      // Attach listeners of view.element to the controller.
      this.view.element.attachListeners = function () {
        return CORE__WEBPACK_IMPORTED_MODULE_0__["default"].Element.prototype.attachListeners.call(_this.view.element, _this.controller);
      };
    }
  }, {
    key: "render",
    value: function render() {
      this.view.render();
    }
  }]);

  return Component;
}();
/* harmony default export */ __webpack_exports__["default"] = (Component);

/***/ }),

/***/ "./frontend/modules/index.js":
/*!***********************************!*\
  !*** ./frontend/modules/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./frontend/modules/logger.js");
/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.js */ "./frontend/modules/page.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component.js */ "./frontend/modules/component.js");
/**
 * @file: js/modules/modules.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  Page: _page_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  Logger: _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  Component: _component_js__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./frontend/modules/logger.js":
/*!************************************!*\
  !*** ./frontend/modules/logger.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logger; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file: js/modules/logger.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 * @todo: on constructor add prefix for owner
 */
var Logger =
/*#__PURE__*/
function () {
  /**
   * Function constructor() : Create logger class
   * 
   * @param {*} owner 
   * @param {boolean} state 
   */
  function Logger(owner) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Logger);

    this.state = state;
    this._name = '';

    if (typeof owner == 'string') {
      this._name = owner;
    } else {
      this._name = owner.constructor.name;
    }

    if (state) {
      this._initialize();
    }
  }
  /**
   * Function _initialize() : Initialize logger class
   */


  _createClass(Logger, [{
    key: "_initialize",
    value: function _initialize() {
      this.color = this.getRandomColor();
      Logger.colorsInUse.push(this.color);
      this.outputHandler = console.log.bind();
      this.defaultStyle = ['color: grey;font-size:7px', 'display: block', "color: ".concat(this.color), 'color: black', 'font-weight: bold', 'color: black', 'font-size: 16px;color: red;font-weight:800'];
    }
    /**
     * Function _functionView() : Return function preview
     * 
     * @param {{function()}} fn 
     */

  }, {
    key: "_functionView",
    value: function _functionView(fn) {
      var fReturn = 'anonymous function()';

      if (fn.name.length !== 0) {
        fReturn = fn.name.split(' ')[1] + '()';
      }

      return fReturn;
    }
    /**
     * Function _printFunctionNotify() : Print simple log for notify source (function)
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {*} output 
     */

  }, {
    key: "_printFunctionNotify",
    value: function _printFunctionNotify(type, source, output) {
      this.out.apply(this, ["%c(".concat(type, ")-> %c%c").concat(this._name, "%c::%c").concat(source, "%c() ").concat(output, "%c")].concat(this.defaultStyle));
    }
    /**
     * Function _printInLineElement() : Print in line element
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {string} key 
     * @param {*} value 
     */

  }, {
    key: "_printInLineElement",
    value: function _printInLineElement(type, source, key, value) {
      this.out.apply(this, ["%c(".concat(type, ")-> %c%c").concat(this._name, "%c::%c").concat(source, "%c() ->> ").concat(key, ": '").concat(value, "'%c")].concat(this.defaultStyle));
    }
    /**
     * Function __printInLineFunction() : Print in line function
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {string} key 
     * @param {{function()}} fn 
     */

  }, {
    key: "_printInLineFunction",
    value: function _printInLineFunction(type, source, key, fn) {
      fn = this._functionView(fn);

      this._printInLineElement(type, source, key, fn);
    }
    /**
     * Function _printInLineString() : Print in line string
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {string} string 
     */

  }, {
    key: "_printInLineString",
    value: function _printInLineString(type, source, string) {
      this._printInLineElement(type, source, '(string)', string);
    }
    /**
     * Function _printNextlineObject() : Print object in next line
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {string} key 
     * @param {{}} obj 
     */

  }, {
    key: "_printNextlineObject",
    value: function _printNextlineObject(type, source, key, obj) {
      this.out.apply(this, ["%c(".concat(type, ")-> %c%c").concat(this._name, "%c::%c").concat(source, "%c() ->> ").concat(key, " %c\u2193")].concat(this.defaultStyle)); // print in next line

      this.out(obj);
    }
    /**
     * Function _printMultiLineObject() : Print object in multiline format
     * 
     * @param {string} type 
     * @param {string} source 
     * @param {{}} obj 
     */

  }, {
    key: "_printMultiLineObject",
    value: function _printMultiLineObject(type, source, obj) {
      // print long (multiline) object
      this.out.apply(this, ["%c(".concat(type, ")-> %c%c").concat(this._name, "%c::%c").concat(source, "%c(").concat(Object.keys(obj).join(', '), ") %c\u2193")].concat(this.defaultStyle));

      for (var key in obj) {
        if (_typeof(obj[key]) === 'object') {
          obj[key] = JSON.stringify(obj[key]);
        } else if (typeof obj[key] == 'function') {
          obj[key] = this._functionView(obj[key]);
        }

        this.out.apply(this, ["%c" + key + ": `" + obj[key] + "`", 'color: #a3a3a3']);
      }
    }
    /**
     * Function _getCallerName() : Return caller name
     */

  }, {
    key: "_getCallerName",
    value: function _getCallerName() {
      var caller = Error().stack.split('\n')[3].trim();

      if (caller.startsWith('at new')) {
        return 'constructor';
      }

      return caller.split('.')[1].split(' ')[0];
    }
    /**
     * Function getRandomColor() : Return random color
     */

  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';

      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      /**
       * Function hexColorDelta() : Return color diffrence in ratio decmial point
       * 
       * @param {string} hex1 
       * @param {string} hex2
       * 
       * @see http://jsfiddle.net/96sME/ 
       */


      var hexColorDelta = function hexColorDelta(hex1, hex2) {
        hex1 = hex1.replace('#', '');
        hex2 = hex2.replace('#', ''); // get red/green/blue int values of hex1

        var r1 = parseInt(hex1.substring(0, 2), 16);
        var g1 = parseInt(hex1.substring(2, 4), 16);
        var b1 = parseInt(hex1.substring(4, 6), 16); // get red/green/blue int values of hex2

        var r2 = parseInt(hex2.substring(0, 2), 16);
        var g2 = parseInt(hex2.substring(2, 4), 16);
        var b2 = parseInt(hex2.substring(4, 6), 16); // calculate differences between reds, greens and blues

        var r = 255 - Math.abs(r1 - r2);
        var g = 255 - Math.abs(g1 - g2);
        var b = 255 - Math.abs(b1 - b2); // limit differences between 0 and 1

        r /= 255;
        g /= 255;
        b /= 255; // 0 means opposit colors, 1 means same colors

        return (r + g + b) / 3;
      };

      var similar = Logger.colorsInUse.some(function (value) {
        // it return the ratio of diffrence... closer to 1.0 is less difference.
        if (hexColorDelta(color, value) < 0.8) {
          return false;
        }

        return true;
      }); // if the color is similar, try again.

      if (similar) {
        return this.getRandomColor();
      }

      return color;
    }
    /**
     * Set output handler
     * 
     * @param {function(...args)} outputHandler 
     */

  }, {
    key: "setOutputHandler",
    value: function setOutputHandler(outputHandler) {
      this.outputHandler = outputHandler;
    }
    /**
     * Function out() : Print console log with style
     * 
     * @param {string} text 
     */

  }, {
    key: "out",
    value: function out() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.outputHandler.apply(this, args);
    }
    /**
     * Function startEmpty() : Notify function start without args.
     * 
     * @param {string} output 
     */

  }, {
    key: "startEmpty",
    value: function startEmpty() {
      var output = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!this.state) return;

      this._printFunctionNotify('se', this._getCallerName(), output);
    }
    /**
     * Function startWith() : Notify function start with args.
     * 
     * @param {*} output 
     */

  }, {
    key: "startWith",
    value: function startWith(params) {
      if (!this.state) return;
      var type = 'se';

      var source = this._getCallerName();

      if (typeof params == "string") {
        this._printInLineString(type, source, params);
      } else if (Object.keys(params).length === 1) {
        var key = Object.keys(params)[0];
        var value = Object.values(params)[0]; // function check is repated logic, handle it.

        if (_typeof(value) === 'object') {
          this._printNextlineObject(type, source, key, value);
        } else if (typeof value == 'function') {
          this._printInLineFunction(type, source, key, value);
        } else {
          this._printInLineElement(type, source, key, value);
        }
      } else {
        this._printMultiLineObject(type, source, params);
      }
    }
    /**
     * Function recv() : Notify recv from server
     * 
     * @param {{}} params 
     * @param {{}|[]} data 
     */

  }, {
    key: "recv",
    value: function recv(params, data) {
      if (!this.state) return;

      var source = this._getCallerName();

      for (var key in params) {
        this.out.apply(this, ["%c(rv)-> %c%c".concat(this._name, "%c::%c").concat(source, "%c() ->> ").concat(key, ": '").concat(params[key], "' %c\u2193")].concat(this.defaultStyle));
      }

      this.out(data);
    }
    /**
     * Function object() : Prints object
     * 
     * @param {{}} params 
     * @param {string} notice 
     */

  }, {
    key: "object",
    value: function object(params) {
      var notice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (!this.state) return;

      var source = this._getCallerName();

      params = Object.create(params);

      for (var key in params) {
        if (_typeof(params[key]) === 'object') {
          params[key] = JSON.stringify(params[key]);
        }

        this.out.apply(this, ["%c(ob)-> %c%c".concat(this._name, "%c::%c").concat(source, "%c() [").concat(notice, "] ->> ").concat(key, ": '").concat(params[key], "'%c")].concat(this.defaultStyle));
      }
    }
    /**
     * Function debug() : Notify debug.
     * `
     * @param {string} output 
     */

  }, {
    key: "debug",
    value: function debug(output) {
      if (!this.state) return;

      this._printFunctionNotify('db', this._getCallerName(), output);
    }
    /**
     * Function throw() : Throws error
     * 
     * @param {string} output 
     * @param {string} name 
     * @param {*} params 
     */

  }, {
    key: "throw",
    value: function _throw(output) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._printFunctionNotify('tw', this._getCallerName(), output);

      if (params) this._printNextlineObject('tw', this._getCallerName(), name, params);
      throw new Error().stack;
    }
  }, {
    key: "name",
    set: function set(val) {
      this._name = val;
    },
    get: function get() {
      return this._name;
    }
  }]);

  return Logger;
}();

_defineProperty(Logger, "colorsInUse", []);



/***/ }),

/***/ "./frontend/modules/page.js":
/*!**********************************!*\
  !*** ./frontend/modules/page.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./frontend/modules/logger.js");
/* harmony import */ var CORE_container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! CORE/container.js */ "./frontend/core/container.js");
/* harmony import */ var SERVICES__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! SERVICES */ "./frontend/services/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @file: js/modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */




var Page =
/*#__PURE__*/
function (_Container) {
  _inherits(Page, _Container);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, [{
    key: "initialize",
    value: function initialize() {
      this.logger = new _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"]("Modules.Page", true);
      this.logger.setOutputHandler(SERVICES__WEBPACK_IMPORTED_MODULE_2__["default"].Terminal.onOutput);
      this.logger.startWith(this.constructor.name);

      _get(_getPrototypeOf(Page.prototype), "initialize", this).call(this);
    }
  }]);

  return Page;
}(CORE_container_js__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./frontend/services/index.js":
/*!************************************!*\
  !*** ./frontend/services/index.js ***!
  \************************************/
/*! exports provided: default, Terminal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _terminal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terminal.js */ "./frontend/services/terminal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Terminal", function() { return _terminal_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/**
 * @file: js/services/services.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Services Namespace O__o
 */

var Services = {};
Services.Terminal = _terminal_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Services);


/***/ }),

/***/ "./frontend/services/terminal.js":
/*!***************************************!*\
  !*** ./frontend/services/terminal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Terminal; });
/* harmony import */ var MODULES__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MODULES */ "./frontend/modules/index.js");
/* harmony import */ var _library_jquery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../library/jquery.js */ "./frontend/library/jquery.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file: js/services/terminal.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: A live console opend by tilda key
 */


var LOCAL_STORAGE_KEY = 'local_storage_key';

var Terminal =
/*#__PURE__*/
function () {
  /**
   * Function constructor() : Create Terminal
   */
  function Terminal() {
    _classCallCheck(this, Terminal);

    _defineProperty(this, "state", false);

    _defineProperty(this, "resize", {
      state: false,
      capturePosY: 0,
      captureHeight: 0
    });

    if (Terminal.instance == null) {
      this.logger = new MODULES__WEBPACK_IMPORTED_MODULE_0__["default"].Logger("Services.".concat(this.constructor.name), true);
      this.logger.startEmpty();
      this.localStorage = window.localStorage;
      this.elements = {
        body: $('body'),
        terminal: {
          self: $('#terminal'),
          buttons: {
            resize: $('#terminal button.resize'),
            close: $('#terminal button.close')
          }
        }
      };

      this._initialize();

      Terminal.instance = this;
    }

    return Terminal.instance;
  }
  /**
   * Function _initialize() : initialize Terminal
   */


  _createClass(Terminal, [{
    key: "_initialize",
    value: function _initialize() {
      var _this$elements = this.elements,
          body = _this$elements.body,
          terminal = _this$elements.terminal;
      var buttons = terminal.buttons; // add .GetSelector to jQuery

      _library_jquery_js__WEBPACK_IMPORTED_MODULE_1__["default"].addGetSelector($);
      body.keydown(this._onKeyDown.bind(this));
      body.mousemove(this._onMouseMove.bind(this));
      body.mouseup(this._onMouseUp.bind(this));
      terminal.self.scroll(this._onTerminalScroll.bind(this)); // terminal buttons

      buttons.resize.mousedown(this._onTerminalReiszeMouseDown.bind(this));
      buttons.resize.mouseup(this._onTerminalReiszeMouseUp.bind(this));
      buttons.close.click(this._onTerminalCloseClick.bind(this));

      var storageHeight = this._stroage('height');

      if (storageHeight) {
        terminal.self.css('height', storageHeight);
      } // null on first time open


      if (this._stroage('active') === null | this._stroage('active') === 'true') {
        this.open();
      }
    }
    /**
     * Function _onKeyDown() : Called when key down on $('body)
     *
     * @param {Event} e
     */

  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(e) {
      //this.logger.startWith({ e });
      // tilda
      if (e.which === 192) {
        this.state ? this.close() : this.open();
      }
    }
    /**
     * Function _onMouseMove() : Called when mouse move on $('body)
     *
     * @param {Event} e
     */

  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(e) {
      var _this2 = this;

      //this.logger.startWith({ e });
      //this.logger.object({ x: e.pageX, y: e.pageY });
      if (this.resize.state) {
        this.logger.object({
          x: e.pageX,
          y: e.pageY
        });
        var self = this.elements.terminal.self;
        var newHeight = this.resize.capturePosY - e.pageY + this.resize.captureHeight;

        if (newHeight < 50) {
          newHeight = 50;
        }

        self.css('height', newHeight); // set timeout here to save only if value stayed the same for (x) time

        setTimeout(function () {
          if (newHeight == parseInt(self.css('height'))) {
            _this2._stroage('height', newHeight);
          }
        }, 500);
      }
    }
    /**
     * Function _onMouseMove() : Called when mouse up on $('body)
     *
     * @param {Event} e
     */

  }, {
    key: "_onMouseUp",
    value: function _onMouseUp(e) {
      //this.logger.startWith({ e });
      this._onTerminalReiszeMouseUp(e);
    }
    /**
     * Function _onTerminalScroll() : called when scroll on $('#terminal')
     */

  }, {
    key: "_onTerminalScroll",
    value: function _onTerminalScroll() {
      //this.logger.startEmpty();
      var self = this.elements.terminal.self;
      var pLastChild = $("#terminal p:last-child");

      if (self.height() > pLastChild.position().top + 15) {
        pLastChild.stop();
        pLastChild.fadeOut().fadeIn();
      }
    }
    /**
     * Function _onTerminalReiszeMouseDown() : Called when mouse down on $('#terminal button.resize')
     *
     * @param {Event} e
     */

  }, {
    key: "_onTerminalReiszeMouseDown",
    value: function _onTerminalReiszeMouseDown(e) {
      this.logger.startWith({
        e: e
      });
      this.logger.object({
        x: e.pageX,
        y: e.pageY
      });
      var self = this.elements.terminal.self;
      this.resize.state = true;
      this.resize.capturePosY = e.pageY;
      this.resize.captureHeight = parseInt(self.css('height'));
    }
    /**
     * Function _onTerminalReiszeMouseUp() : Called when mouse up on $('#terminal button.resize')
     *
     * @param {Event} e
     */

  }, {
    key: "_onTerminalReiszeMouseUp",
    value: function _onTerminalReiszeMouseUp(e) {
      //this.logger.startWith({ e });
      this.resize.state = false;
    }
    /**
     * Function _onTerminalCloseClick() : Called when mouse up on $('#terminal button.close')
     *
     * @param {Event} e
     */

  }, {
    key: "_onTerminalCloseClick",
    value: function _onTerminalCloseClick(e) {
      this.logger.startWith({
        e: e
      });
      this.close();
    }
    /**
     * Function _storage() : Get or set local storage
     *
     * @param {string} type
     * @param {any} val
     */

  }, {
    key: "_stroage",
    value: function _stroage(type) {
      var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.logger.startWith({
        type: type,
        val: val
      });
      var key = LOCAL_STORAGE_KEY + '/' + type;

      if (val !== null) {
        this.localStorage.setItem(key, val);
      }

      return this.localStorage.getItem(key);
    }
    /**
     * Function open() : Open's the terminal
     */

  }, {
    key: "open",
    value: function open() {
      this.logger.startEmpty();
      var terminal = this.elements.terminal;
      terminal.self.addClass('active');

      this._stroage('active', 'true');

      this.state = true;
    }
    /**
     * Function close() : Close's the terminal
     */

  }, {
    key: "close",
    value: function close() {
      this.logger.startEmpty();
      var terminal = this.elements.terminal;

      this._stroage('active', 'false');

      terminal.self.removeClass('active');
      this.state = false;
    }
  }]);

  return Terminal;
}();
/**
 * Function onOutput() : Output handler
 *
 * @param {*} output
 *
 */


_defineProperty(Terminal, "instance", null);



Terminal.onOutput = function (output) {
  var _this = Terminal.instance;
  var plain = false;
  var terminal = _this.elements.terminal;
  var formated = [];
  var objectFlag,
      tildaFlag,
      quoteFlag,
      dbQuotesFlag,
      spanFlag,
      skipFlag = false;
  var spansCount = 0;
  console.log.apply(this, arguments); // if jQuery element

  if (output instanceof jQuery) {
    output = "[jQuery Element]: '".concat(output.getSelector(), "'");
  } else if (_typeof(output) == 'object') {
    // for events.
    if (output instanceof Event) {
      /**
       * @type {Element}
       */
      var el = output.path[0];
      var selector = el.nodeName;

      if (el.id) {
        selector += '#' + el.id;
      }

      if (el.className) {
        selector += '.' + _toConsumableArray(el.classList).join('.');
      }

      output = "[Event]: type: '".concat(output.type, "' element: '").concat(selector, "'");
    } else {
      output = JSON.stringify(output, null, 4);
      output = "<pre>".concat(output, "</pre>");
    }
  }

  for (var i = 0; i < output.length; ++i) {
    if (skipFlag) {
      skipFlag = false;
      continue;
    }

    if (output[i] === '{' || output[i] === '}') {
      if (!objectFlag) {
        formated.push("<span class=\"object\">{");
      } else {
        formated.push("}</span>");
      }

      objectFlag = !objectFlag;
      continue;
    } else if (output[i] === '`') {
      if (!tildaFlag) {
        formated.push("".concat(output[i], "<span class=\"tilda\">"));
      } else {
        formated.push("</span>".concat(output[i]));
      }

      tildaFlag = !tildaFlag;
      continue;
    } else if (output[i] === "'") {
      if (!quoteFlag) {
        formated.push("".concat(output[i], "<span class=\"text quote\">"));
      } else {
        formated.push("</span>".concat(output[i]));
      }

      quoteFlag = !quoteFlag;
      continue;
    } else if (output[i] === '"') {
      if (!dbQuotesFlag) {
        formated.push("".concat(output[i], "<span class=\"text double-quote\">"));
      } else {
        formated.push("</span>".concat(output[i]));
      }

      dbQuotesFlag = !dbQuotesFlag;
      continue;
    } else if (output[i] == '%' && output[i + 1] == 'c') {
      if (plain) {
        i++;
        continue;
      }

      skipFlag = true;

      if (!spanFlag) {
        formated.push("<span style=\"".concat(arguments[1 + spansCount], "\">"));
      } else {
        formated.push('</span>');
      }

      spanFlag = !spanFlag;
      ++spansCount;
      continue;
    }

    skipFlag = false;
    formated.push(output[i]);
  }

  output = formated.join('');
  output = output.replace(new RegExp('null', 'g'), '<span class="null">null</span>');
  terminal.self.append("<p>".concat(output, "</p>"));
  terminal.self.stop();
  terminal.self.animate({
    scrollTop: terminal.self.get(0).scrollHeight
  });
};
/**
 * Funciton initialize() : Create Instance
 */


Terminal.initialize = function () {
  new Terminal();
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGV2L212Yy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb3JlL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29yZS9jb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29yZS9jb250ZXh0LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2NvcmUvZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb3JlL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb3JlL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbGlicmFyeS9odG1sLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL2xpYnJhcnkvanF1ZXJ5LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL21vZHVsZXMvY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL21vZHVsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbW9kdWxlcy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvbW9kdWxlcy9wYWdlLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3NlcnZpY2VzL3Rlcm1pbmFsLmpzIl0sIm5hbWVzIjpbIlBhZ2VDb250YWluZXIiLCJDb3JlIiwiUGFnZSIsIkNhdGFsb2dQYWdlIiwiYWxlcnQiLCJJdGVtIiwiZXZlbnQiLCJNb2R1bGVzIiwiQ29tcG9uZW50IiwiQXBwIiwiZWxlbWVudHMiLCJyb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcCIsInBhZ2VDb250YWluZXIiLCJvbiIsIm9uUGFnZUNvbnRhaW5lclJlbmRlciIsImJpbmQiLCJob21lUGFnZSIsInJlbmRlciIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJpdGVtIiwiaW5pdGlhbGl6ZSIsIkJhc2UiLCJwYXJlbnQiLCJjb250ZXh0Iiwib3B0aW9ucyIsIkVycm9yIiwiSFRNTEVsZW1lbnQiLCJlbGVtZW50IiwiQ29udGV4dCIsImJlZm9yZUluaXQiLCJhZnRlckluaXQiLCJwcmV2ZW50RGVmYXVsdCIsImJlZm9yZVJlbmRlciIsImlzQ29ubmVjdGVkIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZSIsImFmdGVyUmVuZGVyIiwiQ29udGFpbmVyIiwiZXZlbnRzIiwib25SZW5kZXIiLCJjaGlsZCIsImNhbGxiYWNrIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYmVmb3JlQ3JlYXRlIiwibm9kZSIsIkhUTUwiLCJ0b05vZGUiLCJhZnRlckNyZWF0ZSIsIkVsZW1lbnQiLCJhdHRhY2hMaXN0ZW5lcnMiLCJtZXRob2QiLCJhZGRFdmVudExpc3RlbmVyIiwiZnJvbSIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsImF0dGFjaExpc3RlbmVyIiwibm9kZXMiLCJsZW5ndGgiLCJjaGlsZE5vZGVzIiwiaSIsImZ1bmNDb250ZW50IiwidG9TdHJpbmciLCJyZXBsYWNlIiwic3BsaXQiLCJldmFsIiwiRmFjdG9yeSIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInBhcmVudEVsZW1lbnQiLCJWaWV3IiwidGVtcGxhdGUiLCJodG1sIiwiY3JlYXRlRWxlbWVudCIsInRyaW0iLCJpbm5lckhUTUwiLCJjb250ZW50IiwiZmlyc3RDaGlsZCIsIkpRdWVyeV9HZXRTZWxlY3RvciIsIiQiLCJnZXRfc2VsZWN0b3IiLCJwaWVjZXMiLCJ0YWdOYW1lIiwidW5kZWZpbmVkIiwicGFyZW50Tm9kZSIsImNsYXNzTmFtZSIsImNsYXNzZXMiLCJoYXNPd25Qcm9wZXJ0eSIsInVuc2hpZnQiLCJpZCIsInRlc3QiLCJzbGljZSIsImpvaW4iLCJmbiIsImdldFNlbGVjdG9yIiwib25seV9vbmUiLCJtYXAiLCJlbCIsIkpRdWVyeV9BdHRyQ2hhbmdlIiwiTXV0YXRpb25PYnNlcnZlciIsIndpbmRvdyIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJNb3pNdXRhdGlvbk9ic2VydmVyIiwiYXR0cmNoYW5nZSIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwib2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJlIiwiY2FsbCIsInRhcmdldCIsImF0dHJpYnV0ZU5hbWUiLCJlYWNoIiwib2JzZXJ2ZSIsIkxpYkpRdWVyeSIsImFkZEF0dHJDaGFuZ2UiLCJhZGRHZXRTZWxlY3RvciIsIm1vZGVsIiwidmlldyIsImNvbnRyb2xsZXIiLCJhcmd1bWVudHMiLCJwcm90b3R5cGUiLCJMb2dnZXIiLCJvd25lciIsInN0YXRlIiwiX25hbWUiLCJfaW5pdGlhbGl6ZSIsImNvbG9yIiwiZ2V0UmFuZG9tQ29sb3IiLCJjb2xvcnNJblVzZSIsInB1c2giLCJvdXRwdXRIYW5kbGVyIiwiZGVmYXVsdFN0eWxlIiwiZlJldHVybiIsInR5cGUiLCJzb3VyY2UiLCJvdXRwdXQiLCJvdXQiLCJhcHBseSIsImNvbmNhdCIsImtleSIsInZhbHVlIiwiX2Z1bmN0aW9uVmlldyIsIl9wcmludEluTGluZUVsZW1lbnQiLCJzdHJpbmciLCJvYmoiLCJrZXlzIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhbGxlciIsInN0YWNrIiwibGV0dGVycyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImhleENvbG9yRGVsdGEiLCJoZXgxIiwiaGV4MiIsInIxIiwicGFyc2VJbnQiLCJzdWJzdHJpbmciLCJnMSIsImIxIiwicjIiLCJnMiIsImIyIiwiciIsImFicyIsImciLCJiIiwic2ltaWxhciIsInNvbWUiLCJhcmdzIiwiX3ByaW50RnVuY3Rpb25Ob3RpZnkiLCJfZ2V0Q2FsbGVyTmFtZSIsInBhcmFtcyIsIl9wcmludEluTGluZVN0cmluZyIsInZhbHVlcyIsIl9wcmludE5leHRsaW5lT2JqZWN0IiwiX3ByaW50SW5MaW5lRnVuY3Rpb24iLCJfcHJpbnRNdWx0aUxpbmVPYmplY3QiLCJkYXRhIiwibm90aWNlIiwidmFsIiwibG9nZ2VyIiwic2V0T3V0cHV0SGFuZGxlciIsIlNlcnZpY2VzIiwiVGVybWluYWwiLCJvbk91dHB1dCIsInN0YXJ0V2l0aCIsIkxPQ0FMX1NUT1JBR0VfS0VZIiwiY2FwdHVyZVBvc1kiLCJjYXB0dXJlSGVpZ2h0IiwiaW5zdGFuY2UiLCJzdGFydEVtcHR5IiwibG9jYWxTdG9yYWdlIiwiYm9keSIsInRlcm1pbmFsIiwic2VsZiIsImJ1dHRvbnMiLCJyZXNpemUiLCJjbG9zZSIsIkpRdWVyeSIsImtleWRvd24iLCJfb25LZXlEb3duIiwibW91c2Vtb3ZlIiwiX29uTW91c2VNb3ZlIiwibW91c2V1cCIsIl9vbk1vdXNlVXAiLCJzY3JvbGwiLCJfb25UZXJtaW5hbFNjcm9sbCIsIm1vdXNlZG93biIsIl9vblRlcm1pbmFsUmVpc3plTW91c2VEb3duIiwiX29uVGVybWluYWxSZWlzemVNb3VzZVVwIiwiY2xpY2siLCJfb25UZXJtaW5hbENsb3NlQ2xpY2siLCJzdG9yYWdlSGVpZ2h0IiwiX3N0cm9hZ2UiLCJjc3MiLCJvcGVuIiwid2hpY2giLCJvYmplY3QiLCJ4IiwicGFnZVgiLCJ5IiwicGFnZVkiLCJuZXdIZWlnaHQiLCJzZXRUaW1lb3V0IiwicExhc3RDaGlsZCIsImhlaWdodCIsInBvc2l0aW9uIiwidG9wIiwic3RvcCIsImZhZGVPdXQiLCJmYWRlSW4iLCJzZXRJdGVtIiwiZ2V0SXRlbSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJfdGhpcyIsInBsYWluIiwiZm9ybWF0ZWQiLCJvYmplY3RGbGFnIiwidGlsZGFGbGFnIiwicXVvdGVGbGFnIiwiZGJRdW90ZXNGbGFnIiwic3BhbkZsYWciLCJza2lwRmxhZyIsInNwYW5zQ291bnQiLCJqUXVlcnkiLCJFdmVudCIsInBhdGgiLCJub2RlTmFtZSIsImNsYXNzTGlzdCIsIlJlZ0V4cCIsImFwcGVuZCIsImFuaW1h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RkQsQyIsImZpbGUiOiJtdmMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kZXYvbXZjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgQ29yZSBmcm9tICcuLi8uLi9mcm9udGVuZC9jb3JlL2luZGV4LmpzJztcbmltcG9ydCBNb2R1bGVzIGZyb20gJy4uLy4uL2Zyb250ZW5kL21vZHVsZXMvaW5kZXguanMnO1xuXG5jbGFzcyBQYWdlQ29udGFpbmVyIGV4dGVuZHMgQ29yZS5Db250YWluZXIge1xuXG59XG5cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBDb3JlLkNvbnRhaW5lciB7XG5cbn1cblxuY2xhc3MgQ2F0YWxvZ1BhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBhbGVydCggJ3BhZ2UgaG9tZScpO1xuICAgIH07XG59XG5cblxuY2xhc3MgSXRlbSBleHRlbmRzIE1vZHVsZXMuQ29tcG9uZW50IHtcblx0dGVtcGxhdGUoKSB7XG5cdFx0cmV0dXJuICcnICtcblx0XHRcdCc8ZGl2IGNsYXNzXCJpdGVtXCI+JyArXG5cdFx0XHRcdCc8aDEgb25DbGljaz1cInRoaXMub25JdGVtQ2xpY2soKVwiPkl0ZW08L2gxPicgK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBvbmNoYW5nZT1cInRoaXMub25JbnB1dENoYW5nZWQoIGV2ZW50IClcIj4nICtcblx0XHRcdCc8L2Rpdidcblx0XHQ7XG5cdH1cblxuXHRvbklucHV0Q2hhbmdlZCggZXZlbnQgKSB7IC8vIGNvbnRyb2xsZXJcblx0ICAgIGRlYnVnZ2VyO1xuICAgIH1cblxuXHRvbkl0ZW1DbGljaygpIHtcblx0XHRhbGVydCgnb24gaXRlbSBoZWFkaW5nIGNsaWNrJyk7XG5cdH1cblxuXHRvbkNsaWNrID0gKCkgPT4ge1xuXHRcdGFsZXJ0KCdIZWxsbyBmcm9tIGl0ZW0gY2xhc3MgdmlldycpO1xuXHQgfVxufVxuXG5cbmNsYXNzIEFwcCB7XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JyksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgQ29yZS5FbGVtZW50KHRoaXMuZWxlbWVudHMucm9vdCwgYDxkaXYgY2xhc3M9XCJhcHBcIj5BcHA8L2Rpdj5gKTtcblxuICAgICAgICB0aGlzLnBhZ2VDb250YWluZXIgPSBuZXcgUGFnZUNvbnRhaW5lciggdGhpcy5hcHAsICc8ZGl2IGNsYXNzPVwicGFnZVwiPlBhZ2UgQ29udGFpbmVyPC9kaXY+JyApO1xuXG4gICAgICAgIHRoaXMucGFnZUNvbnRhaW5lci5vbigncmVuZGVyJywgdGhpcy5vblBhZ2VDb250YWluZXJSZW5kZXIuYmluZCggdGhpcyApICk7XG5cbiAgICAgICAgdGhpcy5ob21lUGFnZSA9IG5ldyBDYXRhbG9nUGFnZSggdGhpcy5wYWdlQ29udGFpbmVyLCAnPGRpdiBjbGFzcz1cImhvbWVwYWdlXCI+SG9tZSBQYWdlPC9kaXY+JylcblxuICAgICAgICB0aGlzLmFwcC5yZW5kZXIoKTtcblxuXHQgICAgdGhpcy5wYWdlQ29udGFpbmVyLnNldCggdGhpcy5ob21lUGFnZSApO1xuICAgICAgICB0aGlzLnBhZ2VDb250YWluZXIucmVuZGVyKCk7XG4gICAgfVxuXG5cdG9uUGFnZUNvbnRhaW5lclJlbmRlcigpIHtcbiAgICBcdGNvbnNvbGUubG9nKCAnb25QYWdlQ29udGFpbmVyUmVuZGVyJyApO1xuXG4gICAgXHRjb25zdCBpdGVtID0gbmV3IEl0ZW0oIHRoaXMuaG9tZVBhZ2UgKTtcbiAgICBcdGl0ZW0ucmVuZGVyKCk7XG5cdH1cblxufVxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5cbmFwcC5pbml0aWFsaXplKCk7XG5cblxuIiwiaW1wb3J0IENvbnRleHQgZnJvbSAnLi9jb250ZXh0LmpzJztcblxuZXhwb3J0IGNsYXNzIEJhc2Uge1xuXHQvKipcblx0ICogQHR5cGUge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0ZWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNvbnN0cnVjdG9yKCkgOiBDcmVhdGUgQ3VzdG9tIEVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV8SFRNTEVsZW1lbnR8QmFzZX0gcGFyZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8Q29udGV4dH0gY29udGV4dFxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGNvbnRleHQsIG9wdGlvbnMgKSB7XG4gICAgICAgIGlmICggISBwYXJlbnQgKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcigncGFyZW50IGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgICAgaWYgKCBjb250ZXh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG4gICAgICAgIFx0dGhpcy5lbGVtZW50ID0gY29udGV4dDtcbiAgICAgICAgfSBlbHNlIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENvbnRleHQpKSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gbmV3IENvbnRleHQoIHRoaXMuY29udGV4dCApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBcdHRocm93IEVycm9yKCAnY29udGV4dCBpcyBpbnZhbGlkJyApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuXHQgICAgdGhpcy5iZWZvcmVJbml0KCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCBvcHRpb25zICk7XG5cbiAgICAgICAgdGhpcy5hZnRlckluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCBvcHRpb25zID0ge30gKSB7fVxuXG4gICAgcmVuZGVyKCBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlICkge1xuICAgICAgICBpZiAoICEgcHJldmVudERlZmF1bHQgKSB0aGlzLmJlZm9yZVJlbmRlcigpO1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcblxuXHQgICAgaWYgKCBwYXJlbnQgaW5zdGFuY2VvZiBCYXNlICkge1xuXHRcdCAgICBwYXJlbnQgPSB0aGlzLnBhcmVudC5lbGVtZW50O1xuXHQgICAgfVxuXG5cdCAgICAvLyBJZiBpdHMgaW5zdGFuY2Ugb2YgSFRNTEVsZW1lbnQgdGhlbiB3ZSBhc3N1bWUgaXQgd2FzIHJlbmRlcmVkIGJlZm9yZS5cblx0ICAgIGlmICggdGhpcy5jb250ZXh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdGhpcy5jb250ZXh0LmlzQ29ubmVjdGVkICkge1xuXHRcdCAgICAvLyBSZS1yZW5kZXIuXG5cdFx0ICAgIHBhcmVudC5yZW1vdmVDaGlsZCggdGhpcy5jb250ZXh0ICk7XG5cblx0XHQgICAgLy8gUmVuZGVyXG5cdFx0ICAgIHBhcmVudC5hcHBlbmRDaGlsZCggdGhpcy5jb250ZXh0ICk7XG5cdCAgICB9IGVsc2UgaWYgKCB0aGlzLmNvbnRleHQgaW5zdGFuY2VvZiBDb250ZXh0ICkge1xuXHQgICAgXHQvLyBEbyBub3QgcmVtb3ZlIGlmIGl0cyBub3QgYXR0YWNoZWQgdG8gRE9NLlxuXHQgICAgXHRpZiAoIHRoaXMuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQuaXNDb25uZWN0ZWQgKSB7XG5cdFx0XHQgICAgcGFyZW50LnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcblx0XHQgICAgfVxuXG5cdCAgICBcdC8vIFJlbmRlci5cblx0XHQgICAgdGhpcy5lbGVtZW50ID0gcGFyZW50LmFwcGVuZENoaWxkKCB0aGlzLmNvbnRleHQuY3JlYXRlKCkgKTtcblx0ICAgIH1cblxuICAgICAgICBpZiAoICEgcHJldmVudERlZmF1bHQgKSB0aGlzLmFmdGVyUmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG5cbiAgICBiZWZvcmVJbml0KCkge31cbiAgICBhZnRlckluaXQoKSB7fTtcblxuICAgIGJlZm9yZVJlbmRlcigpIHt9XG4gICAgYWZ0ZXJSZW5kZXIoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlLmpzJztcblxuZXhwb3J0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2Uge1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJlbnQsIGNvbnRleHQsIG9wdGlvbnMgKSB7XG5cdFx0c3VwZXIoIHBhcmVudCwgY29udGV4dCwgb3B0aW9ucyApO1xuXG5cdH1cblxuICAgIGluaXRpYWxpemUoKSB7XG5cdCAgICB0aGlzLmV2ZW50cyA9IHtcblx0XHQgICAgb25SZW5kZXI6ICgpID0+IHt9LFxuXHQgICAgfVxuXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBhZnRlclJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJSZW5kZXIoKTtcblxuICAgICAgICBpZiAoIHRoaXMuZXZlbnRzICYmIHRoaXMuZXZlbnRzLm9uUmVuZGVyICkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMub25SZW5kZXIoIHRoaXMuY2hpbGQgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtDb250YWluZXJ9IGNoaWxkXG5cdCAqL1xuXHRzZXQoIGNoaWxkICkge1xuICAgIFx0aWYgKCAhICggY2hpbGQgaW5zdGFuY2VvZiBDb250YWluZXIgKSApIHtcbiAgICBcdCAgICB0aHJvdyBuZXcgRXJyb3IoKTtcblx0ICAgIH1cblxuXHRcdHRoaXMuY2hpbGQgPSBjaGlsZDtcblxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuYmVmb3JlUmVuZGVyKCk7XG5cdFx0c3VwZXIuYmVmb3JlUmVuZGVyKCk7XG5cblx0XHQvLyBTZWxmIFJlLXJlbmRlci5cblx0XHRzdXBlci5yZW5kZXIoIHRydWUgKTtcblxuXHRcdC8vIFJlLXJlbmRlciBvZiBjaGlsZC5cblx0XHRpZiAoIHRoaXMuY2hpbGQgKSB7XG5cdFx0XHR0aGlzLmNoaWxkLnJlbmRlcigpO1xuXHRcdH1cblxuXHRcdHRoaXMuYWZ0ZXJSZW5kZXIoKTtcblx0XHRzdXBlci5hZnRlclJlbmRlcigpO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBvbigpIDogRGVjbGFyZSBldmVudCBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHBhcmFtIHsncmVuZGVyJ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3tmdW5jdGlvbigpfX0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgICAgY2FzZSAncmVuZGVyJzoge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLm9uUmVuZGVyID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfTo6b24oKSAtPiBpbnZhbGlkIGV2ZW50IHR5cGU6ICcke2V2ZW50fSdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyO1xuIiwiaW1wb3J0IEhUTUwgZnJvbSAnLi4vbGlicmFyeS9odG1sLmpzJztcblxuZXhwb3J0IGNsYXNzIENvbnRleHRcbntcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Tm9kZX1cbiAgICAgKi9cbiAgICBub2RlO1xuXG4gICAgY29uc3RydWN0b3IoIGNvbnRleHQgKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Tm9kZX1cblx0ICovXG5cdGNyZWF0ZSgpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVDcmVhdGUoKTtcblxuICAgICAgICB0aGlzLm5vZGUgPSBIVE1MLnRvTm9kZSggdGhpcy5jb250ZXh0ICk7XG5cbiAgICAgICAgdGhpcy5hZnRlckNyZWF0ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgfVxuXG4gICAgYmVmb3JlQ3JlYXRlKCkge1xuICAgIH1cblxuICAgIGFmdGVyQ3JlYXRlKCkge1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dDtcbiIsImltcG9ydCBDb250YWluZXIgZnJvbSAnLi9jb250YWluZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudCBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVJbml0KCk7XG5cbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICggdGhpcy5jb250ZXh0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZnRlckluaXQoKTtcbiAgICB9XG5cbiAgICBiZWZvcmVJbml0KCkge1xuICAgIH1cblxuICAgIGFmdGVySW5pdCgpIHtcbiAgICB9XG5cbiAgICBhZnRlclJlbmRlcigpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJSZW5kZXIoKTtcblxuICAgICAgICB0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGF0dGFjaExpc3RlbmVyKCBtZXRob2QsIGNhbGxiYWNrICkge1xuICAgICAgICBzd2l0Y2ggKCBtZXRob2QgKSB7XG4gICAgICAgICAgICBjYXNlICdvbkNsaWNrJzoge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBjYWxsYmFjayApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNoTGlzdGVuZXJzKCBmcm9tID0gdGhpcyApIHtcbiAgICAgICAgLy8gSGFuZGxlIGFsbCBwYXJlbnQgcHJvcGVydGllcyBpZiBzdGFydHNXaXRoICdvbicgdGhlbiBhdHRhY2ggaXQgbGlzdGVuZXIuXG4gICAgICAgIC8vIEFsbG93IHlvdSBleHRlbmQgY29tcG9uZW50cyB3aXRoIGN1c3RvbSBjYWxsYmFja3MuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCBmcm9tICkuZm9yRWFjaCggKCBtZXRob2QgKSA9PiB7XG4gICAgICAgICAgICBpZiAoIG1ldGhvZC5zdGFydHNXaXRoKCAnb24nICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2hMaXN0ZW5lciggbWV0aG9kLCBmcm9tWyAnb25DbGljaycgXSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG5cbiAgICAgICAgLy8gQXR0YWNoIEFsbCBgdGhpcy5jb250ZXh0YCBlbGVtZW50cyBldmVudHMgdG8gYGZyb21gIGNvbXBvbmVudC5cbiAgICAgICAgbGV0IG5vZGVzID0gW107XG5cbiAgICAgICAgaWYgKCB0aGlzLmNvbnRleHQubm9kZSApIHtcbiAgICAgICAgICAgIG5vZGVzICA9IFsgdGhpcy5jb250ZXh0Lm5vZGUgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbm9kZXMubGVuZ3RoID4gMCAmJiB0aGlzLmNvbnRleHQubm9kZS5jaGlsZE5vZGVzICkge1xuICAgICAgICAgICAgbm9kZXMgPSBbIG5vZGVzLCAuLi4gdGhpcy5jb250ZXh0Lm5vZGUuY2hpbGROb2RlcyBdO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaCggKCBub2RlICkgPT4ge1xuICAgICAgICAgICAgLy8gTm93IHUgbmVlZCBsb29wIGFsbCBvdmVyIG9uIHNoaXQgOilcbiAgICAgICAgICAgIGZvciAoIGxldCBpIGluIG5vZGUgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpLnN0YXJ0c1dpdGgoICdvbicgKSAmJiBub2RlWyBpIF0gKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGhlcmUgdSB3YW50ZWQgdG8gZXZhbCBvbmNsaWNrLlxuICAgICAgICAgICAgICAgICAgICBsZXQgZnVuY0NvbnRlbnQgPSBub2RlWyBpIF0udG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBmdW5jQ29udGVudCA9IGZ1bmNDb250ZW50LnJlcGxhY2UoICd0aGlzJywgJ2Zyb20nICk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmNDb250ZW50ID0gZnVuY0NvbnRlbnQuc3BsaXQoICd7JyApWyAxIF0ucmVwbGFjZSggJ30nLCAnJyApO1xuICAgICAgICAgICAgICAgICAgICBmdW5jQ29udGVudCA9IGZ1bmNDb250ZW50LnJlcGxhY2UoICcoKScsICcoIC4uLiBhcmd1bWVudHMpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbm9kZVsgaSBdID0gKCkgPT4gZXZhbCggZnVuY0NvbnRlbnQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICBjbGljayggY2FsbGJhY2sgKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoTGlzdGVuZXIoICdvbkNsaWNrJywgY2FsbGJhY2sgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVsZW1lbnQ7XG4iLCJpbXBvcnQgKiBhcyBNb2R1bGVzIGZyb20gJy4vaW5kZXguanMnXG5cbmV4cG9ydCBjbGFzcyBGYWN0b3J5IHtcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoIHNlbGVjdG9yICkge1xuXHRcdHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcblxuXHRcdHJldHVybiBuZXcgTW9kdWxlcy5CYXNlKCBzZWxlY3Rvci5wYXJlbnRFbGVtZW50LCBzZWxlY3RvciApO1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZUNvbXBvbmVudCggc2VsZWN0b3IgKSB7XG5cdFx0c2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xuXG5cdFx0cmV0dXJuIG5ldyBNb2R1bGVzLkVsZW1lbnQoIHNlbGVjdG9yLnBhcmVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmFjdG9yeTtcbiIsImltcG9ydCB7Vmlld30gZnJvbSAnLi92aWV3LmpzJztcbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuL2VsZW1lbnQuanMnO1xuXG5leHBvcnQgeyBCYXNlIH0gZnJvbSAnLi9iYXNlLmpzJztcbmV4cG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vY29udGFpbmVyLmpzJztcbmV4cG9ydCB7IENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQuanMnO1xuZXhwb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeS5qcyc7XG5cbi8vIFRPRE8gbW9kZWxcbmV4cG9ydCB7XG4gICAgVmlldyxcbiAgICBFbGVtZW50LFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgVmlldyxcbiAgICBFbGVtZW50XG59XG4iLCJpbXBvcnQgRWxlbWVudCBmcm9tICcuL2VsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cdGNvbnN0cnVjdG9yKCBwYXJlbnQsIG9wdGlvbnMgPSB7IH0gKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBFbGVtZW50KFxuXHRcdFx0cGFyZW50LFxuXHRcdFx0b3B0aW9ucy50ZW1wbGF0ZSgpIHx8IHRoaXMudGVtcGxhdGUoKSxcblx0XHRcdG9wdGlvbnMsXG5cdFx0KTtcblxuXG5cdFx0dGhpcy5pbml0aWFsaXplKCBvcHRpb25zICk7XG5cdH1cblxuXHRpbml0aWFsaXplKCBvcHRpb25zICkge1xuXHQgICAgaWYgKCBvcHRpb25zLnRlbXBsYXRlICkge1xuXHQgICAgICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IEhUTUwgTWFya3VwLlxuXHQgKi9cblx0dGVtcGxhdGUoKSB7IGFsZXJ0KCdubyB0ZW1wbGF0ZScpOyB9XG5cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5yZW5kZXIoKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IEhUTUwgcmVwcmVzZW50aW5nIGEgc2luZ2xlIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuICAgIHN0YXRpYyB0b05vZGUoaHRtbCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIFxuICAgICAgICBodG1sID0gaHRtbC50cmltKCk7IC8vIE5ldmVyIHJldHVybiBhIHRleHQgbm9kZSBvZiB3aGl0ZXNwYWNlIGFzIHRoZSByZXN1bHRcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IEhUTUwgcmVwcmVzZW50aW5nIGFueSBudW1iZXIgb2Ygc2libGluZyBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge05vZGVMaXN0fSBcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9Ob2RlcyhodG1sKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgXG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGZpbGU6IGxpYnJhcnkvanF1ZXJ5LmpzXG4gKiBAYXV0aG9yOiBzZWUgZWFjaCBmdW5jdGlvbi5cbiAqIEBkZXNjcmlwdGlvbjogSlF1ZXJ5IEFkZG9uc1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBKUXVlcnlfR2V0U2VsZWN0b3IoJCkge1xuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcG9zdHMvMTU2MjMzMjIvcmV2aXNpb25zXG5cbiAgICBpZiAodHlwZW9mICQuZ2V0X3NlbGVjdG9yID09PSAnZnVuY3Rpb24nKSByZXR1cm47XG5cbiAgICB2YXIgZ2V0X3NlbGVjdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHBpZWNlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoOyBlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZSAhPT0gdW5kZWZpbmVkOyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzLmhhc093blByb3BlcnR5KGkpICYmIGNsYXNzZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlcy51bnNoaWZ0KGNsYXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2VzLnVuc2hpZnQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlkICYmICEvXFxzLy50ZXN0KGVsZW1lbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgcGllY2VzLnVuc2hpZnQoZWxlbWVudC5pZCk7XG4gICAgICAgICAgICAgICAgcGllY2VzLnVuc2hpZnQoJyMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBpZWNlcy51bnNoaWZ0KGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICAgICAgICBwaWVjZXMudW5zaGlmdCgnID4gJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGllY2VzLnNsaWNlKDEpLmpvaW4oJycpO1xuICAgIH07XG5cbiAgICAkLmZuLmdldFNlbGVjdG9yID0gZnVuY3Rpb24gKG9ubHlfb25lKSB7XG4gICAgICAgIGlmICh0cnVlID09PSBvbmx5X29uZSkge1xuICAgICAgICAgICAgcmV0dXJuIGdldF9zZWxlY3Rvcih0aGlzWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkLm1hcCh0aGlzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0X3NlbGVjdG9yKGVsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBmdW5jdGlvbiBKUXVlcnlfQXR0ckNoYW5nZSgkKSB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk1MDAzOC9qcXVlcnktZmlyZS1ldmVudC1pZi1jc3MtY2xhc3MtY2hhbmdlZFxuXG5cbiAgICB2YXIgTXV0YXRpb25PYnNlcnZlciA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgJC5mbi5hdHRyY2hhbmdlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChNdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlLnRhcmdldCwgZS5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxufVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgTGliSlF1ZXJ5ID0ge1xuICAgIGFkZEF0dHJDaGFuZ2U6IEpRdWVyeV9BdHRyQ2hhbmdlLFxuICAgIGFkZEdldFNlbGVjdG9yOiBKUXVlcnlfR2V0U2VsZWN0b3Jcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGliSlF1ZXJ5OyIsImltcG9ydCBDb3JlIGZyb20gJ0NPUkUnO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbFxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlld1xuICAgICAqIEBwYXJhbSBjb250cm9sbGVyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggcGFyZW50LCBtb2RlbCwgdmlldywgY29udHJvbGxlciwgb3B0aW9ucyA9IHt9ICkge1xuICAgICAgICAvLyBNb2RlIG1vZGVsLCB2aWV3LCBjb250cm9sbGVyPyBhc3N1bWluZyB5b3UgY3JlYXRlIE1WQyBjb21wb25lbnQuXG4gICAgICAgIGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgICAgICAgIG1vZGVsLCB2aWV3LCBjb250cm9sbGVyID0gdGhpcztcblxuICAgICAgICAgICAgdmlldyA9IG5ldyBDb3JlLlZpZXcoIHBhcmVudCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzWyd0ZW1wbGF0ZSddLFxuICAgICAgICAgICAgfSApO1xuICAgICAgICB9IGVsc2UgaWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgNCApIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdXVEYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy52aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUoIHRoaXMub3B0aW9ucyApO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoIG9wdGlvbnMgKSB7XG4gICAgICAgIC8vIEF0dGFjaCBsaXN0ZW5lcnMgb2Ygdmlldy5lbGVtZW50IHRvIHRoZSBjb250cm9sbGVyLlxuICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hdHRhY2hMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQ29yZS5FbGVtZW50LnByb3RvdHlwZS5hdHRhY2hMaXN0ZW5lcnMuY2FsbCggdGhpcy52aWV3LmVsZW1lbnQsIHRoaXMuY29udHJvbGxlciApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBmaWxlOiBqcy9tb2R1bGVzL21vZHVsZXMuanNcbiAqIEBhdXRob3I6IExlb25pZCBWaW5pa292IDxjemYubGVvMTIzQGdtYWlsLmNvbT5cbiAqIEBkZXNjcmlwdGlvbjogTW9kdWxlcyBOYW1lc3BhY2UgT19fb1xuICovXG5cbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXIuanMnO1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlLmpzJztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUGFnZSxcbiAgICBMb2dnZXIsXG4gICAgQ29tcG9uZW50LFxufVxuIiwiLyoqXHJcbiAqIEBmaWxlOiBqcy9tb2R1bGVzL2xvZ2dlci5qc1xyXG4gKiBAYXV0aG9yOiBMZW9uaWQgVmluaWtvdiA8Y3pmLmxlbzEyM0BnbWFpbC5jb20+XHJcbiAqIEBkZXNjcmlwdGlvbjpcclxuICogQHRvZG86IG9uIGNvbnN0cnVjdG9yIGFkZCBwcmVmaXggZm9yIG93bmVyXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcclxuICAgIHN0YXRpYyBjb2xvcnNJblVzZSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gY29uc3RydWN0b3IoKSA6IENyZWF0ZSBsb2dnZXIgY2xhc3NcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBvd25lciBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3RhdGUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG93bmVyLCBzdGF0ZSA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvd25lciA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gb3duZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IG93bmVyLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9pbml0aWFsaXplKCkgOiBJbml0aWFsaXplIGxvZ2dlciBjbGFzc1xyXG4gICAgICovXHJcbiAgICBfaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgICAgICBMb2dnZXIuY29sb3JzSW5Vc2UucHVzaCh0aGlzLmNvbG9yKTtcclxuXHJcbiAgICAgICAgdGhpcy5vdXRwdXRIYW5kbGVyID0gY29uc29sZS5sb2cuYmluZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRTdHlsZSA9IFtcclxuICAgICAgICAgICAgJ2NvbG9yOiBncmV5O2ZvbnQtc2l6ZTo3cHgnLFxyXG4gICAgICAgICAgICAnZGlzcGxheTogYmxvY2snLFxyXG4gICAgICAgICAgICBgY29sb3I6ICR7dGhpcy5jb2xvcn1gLFxyXG4gICAgICAgICAgICAnY29sb3I6IGJsYWNrJyxcclxuICAgICAgICAgICAgJ2ZvbnQtd2VpZ2h0OiBib2xkJyxcclxuICAgICAgICAgICAgJ2NvbG9yOiBibGFjaycsXHJcbiAgICAgICAgICAgICdmb250LXNpemU6IDE2cHg7Y29sb3I6IHJlZDtmb250LXdlaWdodDo4MDAnXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9mdW5jdGlvblZpZXcoKSA6IFJldHVybiBmdW5jdGlvbiBwcmV2aWV3XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7e2Z1bmN0aW9uKCl9fSBmbiBcclxuICAgICAqL1xyXG4gICAgX2Z1bmN0aW9uVmlldyhmbikge1xyXG4gICAgICAgIGxldCBmUmV0dXJuID0gJ2Fub255bW91cyBmdW5jdGlvbigpJztcclxuXHJcbiAgICAgICAgaWYgKGZuLm5hbWUubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGZSZXR1cm4gPSBmbi5uYW1lLnNwbGl0KCcgJylbMV0gKyAnKCknO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZSZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfcHJpbnRGdW5jdGlvbk5vdGlmeSgpIDogUHJpbnQgc2ltcGxlIGxvZyBmb3Igbm90aWZ5IHNvdXJjZSAoZnVuY3Rpb24pXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gb3V0cHV0IFxyXG4gICAgICovXHJcbiAgICBfcHJpbnRGdW5jdGlvbk5vdGlmeSh0eXBlLCBzb3VyY2UsIG91dHB1dCkge1xyXG4gICAgICAgIHRoaXMub3V0LmFwcGx5KHRoaXMsIFtgJWMoJHt0eXBlfSktPiAlYyVjJHt0aGlzLl9uYW1lfSVjOjolYyR7c291cmNlfSVjKCkgJHtvdXRwdXR9JWNgXS5jb25jYXQodGhpcy5kZWZhdWx0U3R5bGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9wcmludEluTGluZUVsZW1lbnQoKSA6IFByaW50IGluIGxpbmUgZWxlbWVudFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgX3ByaW50SW5MaW5lRWxlbWVudCh0eXBlLCBzb3VyY2UsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLm91dC5hcHBseSh0aGlzLCBbYCVjKCR7dHlwZX0pLT4gJWMlYyR7dGhpcy5fbmFtZX0lYzo6JWMke3NvdXJjZX0lYygpIC0+PiAke2tleX06ICcke3ZhbHVlfSclY2BdLmNvbmNhdCh0aGlzLmRlZmF1bHRTdHlsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gX19wcmludEluTGluZUZ1bmN0aW9uKCkgOiBQcmludCBpbiBsaW5lIGZ1bmN0aW9uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgXHJcbiAgICAgKiBAcGFyYW0ge3tmdW5jdGlvbigpfX0gZm4gXHJcbiAgICAgKi9cclxuICAgIF9wcmludEluTGluZUZ1bmN0aW9uKHR5cGUsIHNvdXJjZSwga2V5LCBmbikge1xyXG4gICAgICAgIGZuID0gdGhpcy5fZnVuY3Rpb25WaWV3KGZuKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcHJpbnRJbkxpbmVFbGVtZW50KHR5cGUsIHNvdXJjZSwga2V5LCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfcHJpbnRJbkxpbmVTdHJpbmcoKSA6IFByaW50IGluIGxpbmUgc3RyaW5nXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgXHJcbiAgICAgKi9cclxuICAgIF9wcmludEluTGluZVN0cmluZyh0eXBlLCBzb3VyY2UsIHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3ByaW50SW5MaW5lRWxlbWVudCh0eXBlLCBzb3VyY2UsICcoc3RyaW5nKScsIHN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfcHJpbnROZXh0bGluZU9iamVjdCgpIDogUHJpbnQgb2JqZWN0IGluIG5leHQgbGluZVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxyXG4gICAgICogQHBhcmFtIHt7fX0gb2JqIFxyXG4gICAgICovXHJcbiAgICBfcHJpbnROZXh0bGluZU9iamVjdCh0eXBlLCBzb3VyY2UsIGtleSwgb2JqKSB7XHJcbiAgICAgICAgdGhpcy5vdXQuYXBwbHkodGhpcywgW2AlYygke3R5cGV9KS0+ICVjJWMke3RoaXMuX25hbWV9JWM6OiVjJHtzb3VyY2V9JWMoKSAtPj4gJHtrZXl9ICVj4oaTYF0uY29uY2F0KHRoaXMuZGVmYXVsdFN0eWxlKSk7XHJcbiAgICAgICAgLy8gcHJpbnQgaW4gbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5vdXQob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9wcmludE11bHRpTGluZU9iamVjdCgpIDogUHJpbnQgb2JqZWN0IGluIG11bHRpbGluZSBmb3JtYXRcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFxyXG4gICAgICogQHBhcmFtIHt7fX0gb2JqIFxyXG4gICAgICovXHJcbiAgICBfcHJpbnRNdWx0aUxpbmVPYmplY3QodHlwZSwgc291cmNlLCBvYmopIHtcclxuICAgICAgICAvLyBwcmludCBsb25nIChtdWx0aWxpbmUpIG9iamVjdFxyXG4gICAgICAgIHRoaXMub3V0LmFwcGx5KHRoaXMsIFtgJWMoJHt0eXBlfSktPiAlYyVjJHt0aGlzLl9uYW1lfSVjOjolYyR7c291cmNlfSVjKCR7T2JqZWN0LmtleXMob2JqKS5qb2luKCcsICcpfSkgJWPihpNgXS5jb25jYXQodGhpcy5kZWZhdWx0U3R5bGUpKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBKU09OLnN0cmluZ2lmeShvYmpba2V5XSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9ialtrZXldID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdGhpcy5fZnVuY3Rpb25WaWV3KG9ialtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMub3V0LmFwcGx5KHRoaXMsIFtcIiVjXCIgKyBrZXkgKyBcIjogYFwiICsgb2JqW2tleV0gKyBcImBcIiwgJ2NvbG9yOiAjYTNhM2EzJ10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9nZXRDYWxsZXJOYW1lKCkgOiBSZXR1cm4gY2FsbGVyIG5hbWVcclxuICAgICAqL1xyXG4gICAgX2dldENhbGxlck5hbWUoKSB7XHJcbiAgICAgICAgY29uc3QgY2FsbGVyID0gRXJyb3IoKS5zdGFjay5zcGxpdCgnXFxuJylbM10udHJpbSgpO1xyXG5cclxuICAgICAgICBpZiAoY2FsbGVyLnN0YXJ0c1dpdGgoJ2F0IG5ldycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnY29uc3RydWN0b3InO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNhbGxlci5zcGxpdCgnLicpWzFdLnNwbGl0KCcgJylbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIDogUmV0dXJuIHJhbmRvbSBjb2xvclxyXG4gICAgICovXHJcbiAgICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnO1xyXG4gICAgICAgIGxldCBjb2xvciA9ICcjJztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVuY3Rpb24gaGV4Q29sb3JEZWx0YSgpIDogUmV0dXJuIGNvbG9yIGRpZmZyZW5jZSBpbiByYXRpbyBkZWNtaWFsIHBvaW50XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleDEgXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleDJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAc2VlIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvOTZzTUUvIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IGhleENvbG9yRGVsdGEgPSBmdW5jdGlvbiAoaGV4MSwgaGV4Mikge1xyXG4gICAgICAgICAgICBoZXgxID0gaGV4MS5yZXBsYWNlKCcjJywgJycpO1xyXG4gICAgICAgICAgICBoZXgyID0gaGV4Mi5yZXBsYWNlKCcjJywgJycpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHJlZC9ncmVlbi9ibHVlIGludCB2YWx1ZXMgb2YgaGV4MVxyXG4gICAgICAgICAgICB2YXIgcjEgPSBwYXJzZUludChoZXgxLnN1YnN0cmluZygwLCAyKSwgMTYpO1xyXG4gICAgICAgICAgICB2YXIgZzEgPSBwYXJzZUludChoZXgxLnN1YnN0cmluZygyLCA0KSwgMTYpO1xyXG4gICAgICAgICAgICB2YXIgYjEgPSBwYXJzZUludChoZXgxLnN1YnN0cmluZyg0LCA2KSwgMTYpO1xyXG4gICAgICAgICAgICAvLyBnZXQgcmVkL2dyZWVuL2JsdWUgaW50IHZhbHVlcyBvZiBoZXgyXHJcbiAgICAgICAgICAgIHZhciByMiA9IHBhcnNlSW50KGhleDIuc3Vic3RyaW5nKDAsIDIpLCAxNik7XHJcbiAgICAgICAgICAgIHZhciBnMiA9IHBhcnNlSW50KGhleDIuc3Vic3RyaW5nKDIsIDQpLCAxNik7XHJcbiAgICAgICAgICAgIHZhciBiMiA9IHBhcnNlSW50KGhleDIuc3Vic3RyaW5nKDQsIDYpLCAxNik7XHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHJlZHMsIGdyZWVucyBhbmQgYmx1ZXNcclxuICAgICAgICAgICAgdmFyIHIgPSAyNTUgLSBNYXRoLmFicyhyMSAtIHIyKTtcclxuICAgICAgICAgICAgdmFyIGcgPSAyNTUgLSBNYXRoLmFicyhnMSAtIGcyKTtcclxuICAgICAgICAgICAgdmFyIGIgPSAyNTUgLSBNYXRoLmFicyhiMSAtIGIyKTtcclxuICAgICAgICAgICAgLy8gbGltaXQgZGlmZmVyZW5jZXMgYmV0d2VlbiAwIGFuZCAxXHJcbiAgICAgICAgICAgIHIgLz0gMjU1O1xyXG4gICAgICAgICAgICBnIC89IDI1NTtcclxuICAgICAgICAgICAgYiAvPSAyNTU7XHJcbiAgICAgICAgICAgIC8vIDAgbWVhbnMgb3Bwb3NpdCBjb2xvcnMsIDEgbWVhbnMgc2FtZSBjb2xvcnNcclxuICAgICAgICAgICAgcmV0dXJuIChyICsgZyArIGIpIC8gMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzaW1pbGFyID0gTG9nZ2VyLmNvbG9yc0luVXNlLnNvbWUoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGl0IHJldHVybiB0aGUgcmF0aW8gb2YgZGlmZnJlbmNlLi4uIGNsb3NlciB0byAxLjAgaXMgbGVzcyBkaWZmZXJlbmNlLlxyXG5cclxuICAgICAgICAgICAgaWYgKGhleENvbG9yRGVsdGEoY29sb3IsIHZhbHVlKSA8IDAuOCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGNvbG9yIGlzIHNpbWlsYXIsIHRyeSBhZ2Fpbi5cclxuICAgICAgICBpZiAoc2ltaWxhcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IG91dHB1dCBoYW5kbGVyXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uYXJncyl9IG91dHB1dEhhbmRsZXIgXHJcbiAgICAgKi9cclxuICAgIHNldE91dHB1dEhhbmRsZXIob3V0cHV0SGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMub3V0cHV0SGFuZGxlciA9IG91dHB1dEhhbmRsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBvdXQoKSA6IFByaW50IGNvbnNvbGUgbG9nIHdpdGggc3R5bGVcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXHJcbiAgICAgKi9cclxuICAgIG91dCguLi5hcmdzKSB7XHJcbiAgICAgICAgdGhpcy5vdXRwdXRIYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gc3RhcnRFbXB0eSgpIDogTm90aWZ5IGZ1bmN0aW9uIHN0YXJ0IHdpdGhvdXQgYXJncy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG91dHB1dCBcclxuICAgICAqL1xyXG4gICAgc3RhcnRFbXB0eShvdXRwdXQgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9wcmludEZ1bmN0aW9uTm90aWZ5KCdzZScsIHRoaXMuX2dldENhbGxlck5hbWUoKSwgb3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHN0YXJ0V2l0aCgpIDogTm90aWZ5IGZ1bmN0aW9uIHN0YXJ0IHdpdGggYXJncy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHsqfSBvdXRwdXQgXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2l0aChwYXJhbXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgdHlwZSA9ICdzZSc7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5fZ2V0Q2FsbGVyTmFtZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByaW50SW5MaW5lU3RyaW5nKHR5cGUsIHNvdXJjZSwgcGFyYW1zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhwYXJhbXMpWzBdO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBPYmplY3QudmFsdWVzKHBhcmFtcylbMF07XHJcblxyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbiBjaGVjayBpcyByZXBhdGVkIGxvZ2ljLCBoYW5kbGUgaXQuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmludE5leHRsaW5lT2JqZWN0KHR5cGUsIHNvdXJjZSwga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByaW50SW5MaW5lRnVuY3Rpb24odHlwZSwgc291cmNlLCBrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJpbnRJbkxpbmVFbGVtZW50KHR5cGUsIHNvdXJjZSwga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wcmludE11bHRpTGluZU9iamVjdCh0eXBlLCBzb3VyY2UsIHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gcmVjdigpIDogTm90aWZ5IHJlY3YgZnJvbSBzZXJ2ZXJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHt7fX0gcGFyYW1zIFxyXG4gICAgICogQHBhcmFtIHt7fXxbXX0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcmVjdihwYXJhbXMsIGRhdGEpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5fZ2V0Q2FsbGVyTmFtZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3V0LmFwcGx5KHRoaXMsIFtgJWMocnYpLT4gJWMlYyR7dGhpcy5fbmFtZX0lYzo6JWMke3NvdXJjZX0lYygpIC0+PiAke2tleX06ICcke3BhcmFtc1trZXldfScgJWPihpNgXS5jb25jYXQodGhpcy5kZWZhdWx0U3R5bGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3V0KGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gb2JqZWN0KCkgOiBQcmludHMgb2JqZWN0XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7e319IHBhcmFtcyBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpY2UgXHJcbiAgICAgKi9cclxuICAgIG9iamVjdChwYXJhbXMsIG5vdGljZSA9ICcnKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuX2dldENhbGxlck5hbWUoKTtcclxuXHJcbiAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShwYXJhbXMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zW2tleV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSA9IEpTT04uc3RyaW5naWZ5KHBhcmFtc1trZXldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vdXQuYXBwbHkodGhpcywgW2AlYyhvYiktPiAlYyVjJHt0aGlzLl9uYW1lfSVjOjolYyR7c291cmNlfSVjKCkgWyR7bm90aWNlfV0gLT4+ICR7a2V5fTogJyR7cGFyYW1zW2tleV19JyVjYF0uY29uY2F0KHRoaXMuZGVmYXVsdFN0eWxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gZGVidWcoKSA6IE5vdGlmeSBkZWJ1Zy5cclxuICAgICAqIGBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvdXRwdXQgXHJcbiAgICAgKi9cclxuICAgIGRlYnVnKG91dHB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9wcmludEZ1bmN0aW9uTm90aWZ5KCdkYicsIHRoaXMuX2dldENhbGxlck5hbWUoKSwgb3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRocm93KCkgOiBUaHJvd3MgZXJyb3JcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG91dHB1dCBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbXMgXHJcbiAgICAgKi9cclxuICAgIHRocm93KG91dHB1dCwgbmFtZSA9IG51bGwsIHBhcmFtcyA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9wcmludEZ1bmN0aW9uTm90aWZ5KCd0dycsIHRoaXMuX2dldENhbGxlck5hbWUoKSwgb3V0cHV0KTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcykgdGhpcy5fcHJpbnROZXh0bGluZU9iamVjdCgndHcnLCB0aGlzLl9nZXRDYWxsZXJOYW1lKCksIG5hbWUsIHBhcmFtcyk7XHJcblxyXG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoKS5zdGFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG5hbWUodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipcbiAqIEBmaWxlOiBqcy9tb2R1bGVzL3BhZ2UuanNcbiAqIEBhdXRob3I6IExlb25pZCBWaW5pa292IDxjemYubGVvMTIzQGdtYWlsLmNvbT5cbiAqIEBkZXNjcmlwdGlvbjogTW9kdWxlcyBOYW1lc3BhY2UgT19fb1xuICovXG5cbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXIuanMnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICdDT1JFL2NvbnRhaW5lci5qcyc7XG5pbXBvcnQgU2VydmljZXMgZnJvbSAnU0VSVklDRVMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBMb2dnZXIoYE1vZHVsZXMuUGFnZWAsIHRydWUpO1xuICAgICAgICB0aGlzLmxvZ2dlci5zZXRPdXRwdXRIYW5kbGVyKFNlcnZpY2VzLlRlcm1pbmFsLm9uT3V0cHV0KTtcblxuICAgICAgICB0aGlzLmxvZ2dlci5zdGFydFdpdGgodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcblxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAZmlsZToganMvc2VydmljZXMvc2VydmljZXMuanNcbiAqIEBhdXRob3I6IExlb25pZCBWaW5pa292IDxjemYubGVvMTIzQGdtYWlsLmNvbT5cbiAqIEBkZXNjcmlwdGlvbjogU2VydmljZXMgTmFtZXNwYWNlIE9fX29cbiAqL1xuXG5pbXBvcnQgVGVybWluYWwgZnJvbSAnLi90ZXJtaW5hbC5qcyc7XG5cbmNvbnN0IFNlcnZpY2VzID0ge307XG5cblNlcnZpY2VzLlRlcm1pbmFsID0gVGVybWluYWw7XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VzO1xuXG5leHBvcnQgeyBUZXJtaW5hbCB9O1xuIiwiLyoqXHJcbiAqIEBmaWxlOiBqcy9zZXJ2aWNlcy90ZXJtaW5hbC5qc1xyXG4gKiBAYXV0aG9yOiBMZW9uaWQgVmluaWtvdiA8Y3pmLmxlbzEyM0BnbWFpbC5jb20+XHJcbiAqIEBkZXNjcmlwdGlvbjogQSBsaXZlIGNvbnNvbGUgb3BlbmQgYnkgdGlsZGEga2V5XHJcbiAqL1xyXG5cclxuaW1wb3J0IE1vZHVsZXMgZnJvbSAnTU9EVUxFUyc7XHJcblxyXG5pbXBvcnQgSlF1ZXJ5IGZyb20gJy4uL2xpYnJhcnkvanF1ZXJ5LmpzJztcclxuXHJcbmNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZID0gJ2xvY2FsX3N0b3JhZ2Vfa2V5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcm1pbmFsIHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG51bGw7XHJcblxyXG4gICAgc3RhdGUgPSBmYWxzZTtcclxuXHJcbiAgICByZXNpemUgPSB7XHJcbiAgICAgICAgc3RhdGU6IGZhbHNlLFxyXG4gICAgICAgIGNhcHR1cmVQb3NZOiAwLFxyXG4gICAgICAgIGNhcHR1cmVIZWlnaHQ6IDAsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBjb25zdHJ1Y3RvcigpIDogQ3JlYXRlIFRlcm1pbmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGlmIChUZXJtaW5hbC5pbnN0YW5jZSA9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBNb2R1bGVzLkxvZ2dlcihgU2VydmljZXMuJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLnN0YXJ0RW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgICAgICBib2R5OiAkKCdib2R5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgdGVybWluYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmOiAkKCcjdGVybWluYWwnKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemU6ICQoJyN0ZXJtaW5hbCBidXR0b24ucmVzaXplJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiAkKCcjdGVybWluYWwgYnV0dG9uLmNsb3NlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIFRlcm1pbmFsLmluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBUZXJtaW5hbC5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9pbml0aWFsaXplKCkgOiBpbml0aWFsaXplIFRlcm1pbmFsXHJcbiAgICAgKi9cclxuICAgIF9pbml0aWFsaXplKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keSwgdGVybWluYWwgfSA9IHRoaXMuZWxlbWVudHM7XHJcbiAgICAgICAgY29uc3QgeyBidXR0b25zIH0gPSB0ZXJtaW5hbDtcclxuXHJcbiAgICAgICAgLy8gYWRkIC5HZXRTZWxlY3RvciB0byBqUXVlcnlcclxuICAgICAgICBKUXVlcnkuYWRkR2V0U2VsZWN0b3IoJCk7XHJcblxyXG4gICAgICAgIGJvZHkua2V5ZG93bih0aGlzLl9vbktleURvd24uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYm9keS5tb3VzZW1vdmUodGhpcy5fb25Nb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYm9keS5tb3VzZXVwKHRoaXMuX29uTW91c2VVcC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGVybWluYWwuc2VsZi5zY3JvbGwodGhpcy5fb25UZXJtaW5hbFNjcm9sbC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gdGVybWluYWwgYnV0dG9uc1xyXG4gICAgICAgIGJ1dHRvbnMucmVzaXplLm1vdXNlZG93bih0aGlzLl9vblRlcm1pbmFsUmVpc3plTW91c2VEb3duLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGJ1dHRvbnMucmVzaXplLm1vdXNldXAodGhpcy5fb25UZXJtaW5hbFJlaXN6ZU1vdXNlVXAuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGJ1dHRvbnMuY2xvc2UuY2xpY2sodGhpcy5fb25UZXJtaW5hbENsb3NlQ2xpY2suYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VIZWlnaHQgPSB0aGlzLl9zdHJvYWdlKCdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgaWYgKHN0b3JhZ2VIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGVybWluYWwuc2VsZi5jc3MoJ2hlaWdodCcsIHN0b3JhZ2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbnVsbCBvbiBmaXJzdCB0aW1lIG9wZW5cclxuICAgICAgICBpZiAodGhpcy5fc3Ryb2FnZSgnYWN0aXZlJykgPT09IG51bGwgfCB0aGlzLl9zdHJvYWdlKCdhY3RpdmUnKSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9vbktleURvd24oKSA6IENhbGxlZCB3aGVuIGtleSBkb3duIG9uICQoJ2JvZHkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfb25LZXlEb3duKGUpIHtcclxuICAgICAgICAvL3RoaXMubG9nZ2VyLnN0YXJ0V2l0aCh7IGUgfSk7XHJcblxyXG4gICAgICAgIC8vIHRpbGRhXHJcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IDE5Mikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gX29uTW91c2VNb3ZlKCkgOiBDYWxsZWQgd2hlbiBtb3VzZSBtb3ZlIG9uICQoJ2JvZHkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfb25Nb3VzZU1vdmUoZSkge1xyXG4gICAgICAgIC8vdGhpcy5sb2dnZXIuc3RhcnRXaXRoKHsgZSB9KTtcclxuICAgICAgICAvL3RoaXMubG9nZ2VyLm9iamVjdCh7IHg6IGUucGFnZVgsIHk6IGUucGFnZVkgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZS5zdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5vYmplY3QoeyB4OiBlLnBhZ2VYLCB5OiBlLnBhZ2VZIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgeyBzZWxmIH0gPSB0aGlzLmVsZW1lbnRzLnRlcm1pbmFsO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IHRoaXMucmVzaXplLmNhcHR1cmVQb3NZIC0gZS5wYWdlWSArIHRoaXMucmVzaXplLmNhcHR1cmVIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3SGVpZ2h0IDwgNTApIHtcclxuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IDUwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmNzcygnaGVpZ2h0JywgbmV3SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCB0aW1lb3V0IGhlcmUgdG8gc2F2ZSBvbmx5IGlmIHZhbHVlIHN0YXllZCB0aGUgc2FtZSBmb3IgKHgpIHRpbWVcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3SGVpZ2h0ID09IHBhcnNlSW50KHNlbGYuY3NzKCdoZWlnaHQnKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJvYWdlKCdoZWlnaHQnLCBuZXdIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfb25Nb3VzZU1vdmUoKSA6IENhbGxlZCB3aGVuIG1vdXNlIHVwIG9uICQoJ2JvZHkpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfb25Nb3VzZVVwKGUpIHtcclxuICAgICAgICAvL3RoaXMubG9nZ2VyLnN0YXJ0V2l0aCh7IGUgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX29uVGVybWluYWxSZWlzemVNb3VzZVVwKGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIF9vblRlcm1pbmFsU2Nyb2xsKCkgOiBjYWxsZWQgd2hlbiBzY3JvbGwgb24gJCgnI3Rlcm1pbmFsJylcclxuICAgICAqL1xyXG4gICAgX29uVGVybWluYWxTY3JvbGwoKSB7XHJcbiAgICAgICAgLy90aGlzLmxvZ2dlci5zdGFydEVtcHR5KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgc2VsZiB9ID0gdGhpcy5lbGVtZW50cy50ZXJtaW5hbDtcclxuICAgICAgICBjb25zdCBwTGFzdENoaWxkID0gJChcIiN0ZXJtaW5hbCBwOmxhc3QtY2hpbGRcIik7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmhlaWdodCgpID4gcExhc3RDaGlsZC5wb3NpdGlvbigpLnRvcCArIDE1KSB7XHJcbiAgICAgICAgICAgIHBMYXN0Q2hpbGQuc3RvcCgpO1xyXG4gICAgICAgICAgICBwTGFzdENoaWxkLmZhZGVPdXQoKS5mYWRlSW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfb25UZXJtaW5hbFJlaXN6ZU1vdXNlRG93bigpIDogQ2FsbGVkIHdoZW4gbW91c2UgZG93biBvbiAkKCcjdGVybWluYWwgYnV0dG9uLnJlc2l6ZScpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAgICovXHJcbiAgICBfb25UZXJtaW5hbFJlaXN6ZU1vdXNlRG93bihlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuc3RhcnRXaXRoKHsgZSB9KTtcclxuICAgICAgICB0aGlzLmxvZ2dlci5vYmplY3QoeyB4OiBlLnBhZ2VYLCB5OiBlLnBhZ2VZIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB7IHNlbGYgfSA9IHRoaXMuZWxlbWVudHMudGVybWluYWw7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplLnN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc2l6ZS5jYXB0dXJlUG9zWSA9IGUucGFnZVk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUuY2FwdHVyZUhlaWdodCA9IHBhcnNlSW50KHNlbGYuY3NzKCdoZWlnaHQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBfb25UZXJtaW5hbFJlaXN6ZU1vdXNlVXAoKSA6IENhbGxlZCB3aGVuIG1vdXNlIHVwIG9uICQoJyN0ZXJtaW5hbCBidXR0b24ucmVzaXplJylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9vblRlcm1pbmFsUmVpc3plTW91c2VVcChlKSB7XHJcbiAgICAgICAgLy90aGlzLmxvZ2dlci5zdGFydFdpdGgoeyBlIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2l6ZS5zdGF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gX29uVGVybWluYWxDbG9zZUNsaWNrKCkgOiBDYWxsZWQgd2hlbiBtb3VzZSB1cCBvbiAkKCcjdGVybWluYWwgYnV0dG9uLmNsb3NlJylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICAgKi9cclxuICAgIF9vblRlcm1pbmFsQ2xvc2VDbGljayhlKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuc3RhcnRXaXRoKHsgZSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gX3N0b3JhZ2UoKSA6IEdldCBvciBzZXQgbG9jYWwgc3RvcmFnZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsXHJcbiAgICAgKi9cclxuICAgIF9zdHJvYWdlKHR5cGUsIHZhbCA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmxvZ2dlci5zdGFydFdpdGgoeyB0eXBlLCB2YWwgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleSA9IExPQ0FMX1NUT1JBR0VfS0VZICsgJy8nICsgdHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBvcGVuKCkgOiBPcGVuJ3MgdGhlIHRlcm1pbmFsXHJcbiAgICAgKi9cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuc3RhcnRFbXB0eSgpO1xyXG5cclxuICAgICAgICBjb25zdCB7IHRlcm1pbmFsIH0gPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuICAgICAgICB0ZXJtaW5hbC5zZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3Ryb2FnZSgnYWN0aXZlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiBjbG9zZSgpIDogQ2xvc2UncyB0aGUgdGVybWluYWxcclxuICAgICAqL1xyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuc3RhcnRFbXB0eSgpO1xyXG5cclxuICAgICAgICBjb25zdCB7IHRlcm1pbmFsIH0gPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuICAgICAgICB0aGlzLl9zdHJvYWdlKCdhY3RpdmUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICAgICAgdGVybWluYWwuc2VsZi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIG9uT3V0cHV0KCkgOiBPdXRwdXQgaGFuZGxlclxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IG91dHB1dFxyXG4gKlxyXG4gKi9cclxuVGVybWluYWwub25PdXRwdXQgPSBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IFRlcm1pbmFsLmluc3RhbmNlO1xyXG5cclxuICAgIGxldCBwbGFpbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHsgdGVybWluYWwgfSA9IF90aGlzLmVsZW1lbnRzO1xyXG5cclxuICAgIGxldCBmb3JtYXRlZCA9IFtdO1xyXG4gICAgbGV0IG9iamVjdEZsYWcsIHRpbGRhRmxhZywgcXVvdGVGbGFnLCBkYlF1b3Rlc0ZsYWcsIHNwYW5GbGFnLCBza2lwRmxhZyA9IGZhbHNlO1xyXG4gICAgbGV0IHNwYW5zQ291bnQgPSAwO1xyXG5cclxuICAgIGNvbnNvbGUubG9nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgLy8gaWYgalF1ZXJ5IGVsZW1lbnRcclxuICAgIGlmIChvdXRwdXQgaW5zdGFuY2VvZiBqUXVlcnkpIHtcclxuICAgICAgICBvdXRwdXQgPSBgW2pRdWVyeSBFbGVtZW50XTogJyR7b3V0cHV0LmdldFNlbGVjdG9yKCl9J2A7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvdXRwdXQgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAvLyBmb3IgZXZlbnRzLlxyXG4gICAgICAgIGlmIChvdXRwdXQgaW5zdGFuY2VvZiBFdmVudCkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjb25zdCBlbCA9IG91dHB1dC5wYXRoWzBdO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0b3IgPSBlbC5ub2RlTmFtZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5pZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgKz0gJyMnICsgZWwuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yICs9ICcuJyArIFsuLi5lbC5jbGFzc0xpc3RdLmpvaW4oJy4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3V0cHV0ID0gYFtFdmVudF06IHR5cGU6ICcke291dHB1dC50eXBlfScgZWxlbWVudDogJyR7c2VsZWN0b3J9J2A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gSlNPTi5zdHJpbmdpZnkob3V0cHV0LCBudWxsLCA0KTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dCA9IGA8cHJlPiR7b3V0cHV0fTwvcHJlPmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKHNraXBGbGFnKSB7XHJcbiAgICAgICAgICAgIHNraXBGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG91dHB1dFtpXSA9PT0gJ3snIHx8IG91dHB1dFtpXSA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgIGlmICghb2JqZWN0RmxhZykge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ZWQucHVzaChgPHNwYW4gY2xhc3M9XCJvYmplY3RcIj57YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZC5wdXNoKGB9PC9zcGFuPmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvYmplY3RGbGFnID0gIW9iamVjdEZsYWc7XHJcblxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKG91dHB1dFtpXSA9PT0gJ2AnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlsZGFGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZC5wdXNoKGAke291dHB1dFtpXX08c3BhbiBjbGFzcz1cInRpbGRhXCI+YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZC5wdXNoKGA8L3NwYW4+JHtvdXRwdXRbaV19YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRpbGRhRmxhZyA9ICF0aWxkYUZsYWc7XHJcblxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKG91dHB1dFtpXSA9PT0gXCInXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFxdW90ZUZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkLnB1c2goYCR7b3V0cHV0W2ldfTxzcGFuIGNsYXNzPVwidGV4dCBxdW90ZVwiPmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ZWQucHVzaChgPC9zcGFuPiR7b3V0cHV0W2ldfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBxdW90ZUZsYWcgPSAhcXVvdGVGbGFnO1xyXG5cclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvdXRwdXRbaV0gPT09ICdcIicpIHtcclxuICAgICAgICAgICAgaWYgKCFkYlF1b3Rlc0ZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkLnB1c2goYCR7b3V0cHV0W2ldfTxzcGFuIGNsYXNzPVwidGV4dCBkb3VibGUtcXVvdGVcIj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkLnB1c2goYDwvc3Bhbj4ke291dHB1dFtpXX1gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGJRdW90ZXNGbGFnID0gIWRiUXVvdGVzRmxhZztcclxuXHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3V0cHV0W2ldID09ICclJyAmJiBvdXRwdXRbaSArIDFdID09ICdjJykge1xyXG4gICAgICAgICAgICBpZiAocGxhaW4pIHtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBza2lwRmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXNwYW5GbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRlZC5wdXNoKGA8c3BhbiBzdHlsZT1cIiR7YXJndW1lbnRzWzEgKyBzcGFuc0NvdW50XX1cIj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdGVkLnB1c2goJzwvc3Bhbj4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3BhbkZsYWcgPSAhc3BhbkZsYWc7XHJcbiAgICAgICAgICAgICsrc3BhbnNDb3VudDtcclxuXHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2tpcEZsYWcgPSBmYWxzZTtcclxuICAgICAgICBmb3JtYXRlZC5wdXNoKG91dHB1dFtpXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG91dHB1dCA9IGZvcm1hdGVkLmpvaW4oJycpO1xyXG5cclxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoJ251bGwnLCAnZycpLCAnPHNwYW4gY2xhc3M9XCJudWxsXCI+bnVsbDwvc3Bhbj4nKTtcclxuXHJcbiAgICB0ZXJtaW5hbC5zZWxmLmFwcGVuZChgPHA+JHtvdXRwdXR9PC9wPmApO1xyXG5cclxuICAgIHRlcm1pbmFsLnNlbGYuc3RvcCgpO1xyXG4gICAgdGVybWluYWwuc2VsZi5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6IHRlcm1pbmFsLnNlbGYuZ2V0KDApLnNjcm9sbEhlaWdodFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jaXRvbiBpbml0aWFsaXplKCkgOiBDcmVhdGUgSW5zdGFuY2VcclxuICovXHJcblRlcm1pbmFsLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBuZXcgVGVybWluYWwoKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9