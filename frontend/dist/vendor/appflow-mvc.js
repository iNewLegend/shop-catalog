(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('$flow')) :
typeof define === 'function' && define.amd ? define(['exports', '$flow'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["AppFlow-MVC"] = {}, global.$flow));
})(this, (function (exports, core) { 'use strict';

/**
 * based on string passed, get the integer hash value
 * through bitwise operation (based on spinoff of dbj2
 * with enhancements for reduced collisions)
 *
 * @param string the string to get the hash value for
 * @returns the hash value
 */
function getUniqueIntegerFromString(string) {
  var index = string.length;
  var hashA = 5381;
  var hashB = 52711;
  var charCode;

  while (index--) {
    charCode = string.charCodeAt(index);
    hashA = hashA * 33 ^ charCode;
    hashB = hashB * 33 ^ charCode;
  }

  return (hashA >>> 0) * 4096 + (hashB >>> 0);
}

var getClassTypes = function getClassTypes(classes, reversed) {
  return classes.reduce(function (map, className) {
    var toStringClassName = "[object " + className + "]";

    if (reversed) {
      map[toStringClassName] = className;
    } else {
      map[className] = toStringClassName;
    }

    return map;
  }, {});
};

var getFlags = function getFlags(flags) {
  return flags.reduce(function (flag, item) {
    flag[item] = true;
    return flag;
  }, {});
};

var OBJECT_CLASSES = [// self tags
'Array', 'Arguments', 'Object', // toString tags
'RegExp', 'Symbol', // iterable tags
'Map', 'Set', 'Date', 'Error', 'Event', // bailout tags
'Generator', 'Promise', 'WeakMap', 'WeakSet', 'DocumentFragment', // typed array tags
'Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'ArrayBuffer', 'DataView', 'DocumentFragment', 'Window', // primitive classes, e.g. new String()
'String', 'Number', 'Boolean', 'Function', 'Undefined', 'GeneratorFunction', 'BigInt', 'Null'];
var OBJECT_CLASS_TYPE = getClassTypes(OBJECT_CLASSES, false);
var OBJECT_CLASS = getClassTypes(OBJECT_CLASSES, true);
var BAILOUT_TAGS = getFlags([OBJECT_CLASS_TYPE.Generator, OBJECT_CLASS_TYPE.Promise, OBJECT_CLASS_TYPE.WeakMap, OBJECT_CLASS_TYPE.WeakSet]);
var ITERABLE_TAGS = getFlags([OBJECT_CLASS_TYPE.Map, OBJECT_CLASS_TYPE.Set]);
var NORMALIZED_TAGS = getFlags([OBJECT_CLASS_TYPE.Date, OBJECT_CLASS_TYPE.RegExp]);
var PRIMITIVE_TAGS = getFlags(['bigint', 'boolean', 'function', 'number', 'string', 'undefined']);
var SELF_TAGS = getFlags([OBJECT_CLASS_TYPE.Arguments, OBJECT_CLASS_TYPE.Array]);
var TO_STRING_TAGS = getFlags([OBJECT_CLASS_TYPE.RegExp, OBJECT_CLASS_TYPE.Symbol]);
var TYPED_ARRAY_TAGS = getFlags([OBJECT_CLASS_TYPE.Float32Array, OBJECT_CLASS_TYPE.Float64Array, OBJECT_CLASS_TYPE.Int8Array, OBJECT_CLASS_TYPE.Int16Array, OBJECT_CLASS_TYPE.Int32Array, OBJECT_CLASS_TYPE.Uint8Array, OBJECT_CLASS_TYPE.Uint8ClampedArray, OBJECT_CLASS_TYPE.Uint16Array, OBJECT_CLASS_TYPE.Uint32Array]);

var HAS_BUFFER_FROM_SUPPORT = typeof Buffer !== 'undefined' && typeof Buffer.from === 'function';
var HAS_UINT16ARRAY_SUPPORT = typeof Uint16Array === 'function';
/**
 * get the string value of the buffer passed based on a Buffer
 *
 * @param buffer the array buffer to convert
 * @returns the stringified buffer
 */

function getStringifiedArrayBufferFallback(buffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}
/**
 * get the string value of the buffer passed based on a Uint16Array
 *
 * @param buffer the array buffer to convert
 * @returns the stringified buffer
 */

function getStringifiedArrayBufferModern(buffer) {
  return Buffer.from(buffer).toString('utf8');
}
/**
 * return a placeholder when no arraybuffer support exists
 *
 * @returns the placeholder
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function getStringifiedArrayBufferNoSupport(buffer) {
  return '';
}
/**
 * @function getStringifiedArrayBuffer
 *
 * @description
 * get the string value of the buffer passed
 *
 * @param {ArrayBuffer} buffer the array buffer to convert
 * @returns {string} the stringified buffer
 */

var getStringifiedArrayBuffer = function () {
  if (HAS_BUFFER_FROM_SUPPORT) {
    return getStringifiedArrayBufferModern;
  }

  if (HAS_UINT16ARRAY_SUPPORT) {
    return getStringifiedArrayBufferFallback;
  }

  return getStringifiedArrayBufferNoSupport;
}();

var XML_ELEMENT_REGEXP = /\[object ([HTML|SVG](.*)Element)\]/;
var toString = Object.prototype.toString;
var keys = Object.keys;
/**
 * get the event object sorted by its properties
 *
 * @param event the event to sort
 * @returns the event object with all properties sorted
 */

function getSortedEvent(event) {
  return {
    bubbles: event.bubbles,
    cancelBubble: event.cancelBubble,
    cancelable: event.cancelable,
    composed: event.composed,
    currentTarget: event.currentTarget,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    returnValue: event.returnValue,
    target: event.target,
    type: event.type
  };
}
/**
 * get the sort result based on the two values to compare
 *
 * @param first the first value to compare
 * @param second the second value to compare
 * @returns should the value be sorted
 */


function shouldSort(first, second) {
  return first > second;
}
/**
 * get the sort result based on the two pairs to compare
 *
 * @param firstPair the first pair to compare
 * @param secondPair the second pair to compare
 * @returns should the value be sorted
 */


function shouldSortPair(firstPair, secondPair) {
  return firstPair[0] > secondPair[0];
}
/**
 * sort the array based on the fn passed
 *
 * @param array the array to sort
 * @param fn the sorting function
 * @returns the sorted array
 */


function sort(array, fn) {
  var subIndex;
  var value;

  for (var index = 0; index < array.length; ++index) {
    value = array[index];

    for (subIndex = index - 1; ~subIndex && fn(array[subIndex], value); --subIndex) {
      array[subIndex + 1] = array[subIndex];
    }

    array[subIndex + 1] = value;
  }

  return array;
}
/**
 * get the pairs in the map for stringification
 *
 * @param map the map to get the pairs for
 * @returns the sorted, stringified map
 */


function getSortedMap(map, cache, keys) {
  var entries = [];
  map.forEach(function (value, key) {
    entries.push([stringify(key, cache, keys), stringify(value, cache, keys)]);
  });
  sort(entries, shouldSortPair);

  for (var index = 0, entry; index < entries.length; ++index) {
    entry = entries[index];
    entries[index] = "[" + entry[0] + "," + entry[1] + "]";
  }

  return "Map|[" + entries.join(',') + "]";
}
/**
 * get the values in the set for stringification
 *
 * @param set the set to get the values for
 * @returns the sorted, stringified set
 */


function getSortedSet(set, cache, keys) {
  var entries = [];
  set.forEach(function (value) {
    entries.push(stringify(value, cache, keys));
  });
  sort(entries, shouldSort);
  return "Set|[" + entries.join(',') + "]";
}
/**
 * get the object with the keys sorted
 *
 * @param object the object to sort
 * @returns the sorted object
 */


function getSortedObject(object) {
  var objectKeys = sort(keys(object), shouldSort);
  var newObject = {};
  var key;

  for (var index = 0; index < objectKeys.length; ++index) {
    key = objectKeys[index];
    newObject[key] = object[key];
  }

  return newObject;
}
/**
 * build a string based on all the fragment's children
 *
 * @param fragment the fragment to stringify
 * @returns the stringified fragment
 */


function getStringifiedDocumentFragment(fragment) {
  var children = fragment.children;
  var innerHTML = [];

  for (var index = 0; index < children.length; ++index) {
    innerHTML.push(children[index].outerHTML);
  }

  return innerHTML.join(',');
}
/**
 * get the index after that of the value match in the array (faster than
 * native indexOf) to determine the cutoff index for the `splice()` call.
 *
 * @param array the array to get the index of the value at
 * @param value the value to match
 * @returns the index after the value match in the array
 */


function getCutoffIndex(array, value) {
  for (var index = 0; index < array.length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }

  return 0;
}
/**
 * get the value normalized for stringification
 *
 * @param value the value to normalize
 * @param sortedCache the cache of sorted objects
 * @param passedTag the previously-calculated tag
 * @returns the normalized value
 */


function getNormalizedValue(value, cache, keys, passedTag) {
  if (!passedTag) {
    var type = typeof value;

    if (PRIMITIVE_TAGS[type]) {
      return type + "|" + value;
    }

    if (value === null) {
      return value + "|" + value;
    }
  }

  var tag = passedTag || toString.call(value);

  if (SELF_TAGS[tag]) {
    return value;
  }

  if (tag === OBJECT_CLASS_TYPE.Object) {
    return getSortedObject(value);
  }

  if (TO_STRING_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.toString();
  }

  if (ITERABLE_TAGS[tag]) {
    return value instanceof Map ? getSortedMap(value, cache, keys) : getSortedSet(value, cache, keys);
  }

  if (tag === OBJECT_CLASS_TYPE.Date) {
    return OBJECT_CLASS[tag] + "|" + value.getTime();
  }

  if (tag === OBJECT_CLASS_TYPE.Error) {
    return OBJECT_CLASS[tag] + "|" + value.stack;
  }

  if (tag === OBJECT_CLASS_TYPE.Event) {
    return getSortedEvent(value);
  }

  if (BAILOUT_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|NOT_ENUMERABLE";
  }

  if (XML_ELEMENT_REGEXP.test(tag)) {
    return tag.slice(8, -1) + "|" + value.outerHTML;
  }

  if (tag === OBJECT_CLASS_TYPE.DocumentFragment) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedDocumentFragment(value);
  }

  if (TYPED_ARRAY_TAGS[tag]) {
    return OBJECT_CLASS[tag] + "|" + value.join(',');
  }

  if (tag === OBJECT_CLASS_TYPE.ArrayBuffer) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value);
  }

  if (tag === OBJECT_CLASS_TYPE.DataView) {
    return OBJECT_CLASS[tag] + "|" + getStringifiedArrayBuffer(value.buffer);
  }

  return value;
}
/**
 * create the replacer function used for stringification
 *
 * @param sortedCache the cache to use for sorting objects
 * @returns function getting the normalized value
 */


function createReplacer(cache, keys) {
  if (cache === void 0) {
    cache = [];
  }

  if (keys === void 0) {
    keys = [];
  }

  return function (key, value) {
    if (typeof value === 'object') {
      if (cache.length) {
        var thisCutoff = getCutoffIndex(cache, this);

        if (thisCutoff === 0) {
          cache.push(this);
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }

        keys.push(key);
        var valueCutoff = getCutoffIndex(cache, value);

        if (valueCutoff !== 0) {
          return "[~" + (keys.slice(0, valueCutoff).join('.') || '.') + "]";
        }

        cache.push(value);
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }

    if (key && this[key] instanceof Date) {
      return getNormalizedValue(this[key], cache, keys, OBJECT_CLASS_TYPE.Date);
    }

    return getNormalizedValue(value, cache, keys);
  };
}
/**
 * stringify the value based on the options passed
 *
 * @param value the value to stringify
 * @returns the stringified value
 */


function stringify(value, cache, keys) {
  if (!value || typeof value !== 'object') {
    return getNormalizedValue(value, cache, keys);
  }

  var tag = toString.call(value);

  if (NORMALIZED_TAGS[tag]) {
    return getNormalizedValue(value, cache, keys, tag);
  }

  return JSON.stringify(value, createReplacer(cache, keys));
}

/**
 * hash the value passed to a unique, consistent hash value
 *
 * @param value the value to hash
 * @returns the object hash
 */

function hash(value) {
  return getUniqueIntegerFromString(stringify(value));
}

function is(value, otherValue) {
  return hash(value) === hash(otherValue);
}

function isAll(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (!is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return false;
    }
  }

  return true;
}

function isAny(value) {
  for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); ++index) {
    if (is(value, index + 1 < 1 || arguments.length <= index + 1 ? undefined : arguments[index + 1])) {
      return true;
    }
  }

  return false;
}

function isNot(value, otherValue) {
  return hash(value) !== hash(otherValue);
}

is.all = isAll;
is.any = isAny;
is.not = isNot;
hash.is = is;

let privateCounter = 0;
class ArrayClass extends Array {
  constructor(parent, value = null) {
    super();

    if (value) {
      Array.prototype.push.apply(this, value);
    }

    this._virtualId = privateCounter;
    this._isCollectionModel = true;

    if (parent instanceof Model) {
      this._parent = parent;
    }

    privateCounter++;
  }

  filter(callback) {
    const result = super.filter(callback),
          newInstance = new ArrayClass(this._parent, result);
    modelRefresh(this._parent);
    return newInstance;
  }

  push(...items) {
    // TODO: Add silence.
    const result = super.push(...items);
    modelRefresh(this._parent);
    return result;
  }

  pushSilent(item) {
    return super.push(item);
  }

  clear() {
    // TODO: Check if it works, how it works, maybe test for it.
    if (this.length) {
      Object.values(this).forEach(prop => {
        // TODO: It may not work since maybe, the prop is external declared.
        if (prop instanceof Component) {
          prop.remove();
        }
      });
      modelRefresh(this._parent);
    }

    this.length = 0;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Model, which contains all data for each controller, it should automatically detect changes within the model.
 */
const objectHash = obj => {
  return hash(obj);
};
/**
 * Function modelRefresh().
 *
 * Get current model state, and compare it with the previous state.
 * If changes detected, then tell the model about it own changes.
 *
 * @param {Model} model
 */

const modelRefresh = model => {
  if (!model.getModelData) {
    debugger;
  }

  const data = model.getModelData();

  if (!data) {
    return;
  }

  const dataHash = objectHash(data);

  if (dataHash === model._prevModelHash) {
    return;
  } // @ts-ignore


  model._events?.onChange.forEach(event => event({
    modelOnChange: data.virtualId,
    prevModel: model._prevModel,
    currentModel: data
  }));
  model._prevModel = Object.assign(data);
  model._prevModelHash = dataHash;
};
/**
 * @name $flow.Model
 */

class Model extends core.getObjectBase() {
  get logger() {
    return this._logger;
  }

  set logger(value) {
    this._logger = value;
  }

  _cache = {};
  _cacheHash = {};
  _prevModel = {};
  _prevModelHash = {};
  _events = {
    onChange: []
  };

  static getName() {
    return 'Flow/MVC/Model';
  }

  constructor(options = {}) {
    super();
    this._logger = new (core.getLoggerModule())(this.getName(), true, {
      sameColor: true
    }); // @ts-ignore

    if (options.owner) {
      // @ts-ignore
      this._logger.startWith({
        owner: options.owner.getName()
      }); // @ts-ignore

    } else if (Object.keys(this._options).length) {
      this._logger.startWith({
        options
      });
    } else {
      this._logger.startEmpty();
    }

    this.initialize();
    const self = this; // @ts-ignore

    let timeout; // TODO: Somehow model losing changes when logger is enabled ( JS Toke more time to handle ).
    // @ts-ignore

    return new Proxy(this, {
      set: function (target, key, value) {
        // @ts-ignore
        target[key] = value; // @ts-ignore

        if (!key.startsWith('_')) {
          // @ts-ignore
          if (timeout) {
            // @ts-ignore
            clearTimeout(timeout);
          } // @ts-ignore


          const cacheExist = self._cache[key]; // @ts-ignore

          self._cache[key] = value;

          if (value instanceof Object) {

            try {
              // @ts-ignore
              self._cacheHash[key] = objectHash(value);
            } catch (e) {}

            setTimeout(() => modelRefresh(self));
            return true;
          } else if (value !== -1 && value !== '-1' && cacheExist !== undefined && cacheExist !== value) {
            timeout = setTimeout(() => modelRefresh(self));
            return true;
          }
        }

        return true;
      }
    });
  }

  initialize() {
    modelRefresh(this);
  }

  getModelData() {
    const result = {},
          propertyNames = Object.getOwnPropertyNames(this);
    propertyNames.forEach(property => {
      if ('string' === typeof property && property.startsWith('_')) {
        return;
      } // @ts-ignore


      const prop = this[property];

      if (prop instanceof ArrayClass) {
        // If its array of components.
        // @ts-ignore
        if (prop.some(instance => instance instanceof $flow.Component)) {
          // @ts-ignore
          result[property] = prop.map(prop => prop.model.getModelData());
          return;
        }

        if (!prop.length) {
          return;
        }
      } // @ts-ignore


      result[property] = prop;
    });
    return result;
  }

  destroy() {
    Object.getOwnPropertyNames(this).forEach(key => {
      // @ts-ignore
      if (this[key]?._isCollectionModel) {
        // @ts-ignore
        this[key].forEach(item => {
          item.model.destroy();
        });
      }
    });
  }
  /**
   * @returns {[]}
   */


  array() {
    return new ArrayClass(this);
  }
  /**
   * @returns String
   */


  string() {
    return String(-1);
  }
  /**
   * @returns Number
   */


  number() {
    return Number(-1);
  }
  /**
   * @returns boolean
   */


  boolean() {
    return Boolean(false);
  }
  /**
   * Function on() : Declare event callback
   *
   * @param {'change'} event
   * @param {{function()}} callback
   */
  // @ts-ignore


  on(event, callback) {
    this.logger.startWith({
      event,
      callback
    });

    switch (event) {
      case 'change':
        // @ts-ignore
        return this._events.onChange.push(callback);
    }

    throw new Error(`event: '${event}' not found.' `);
  }

}

class HTML {
  static getName() {
    return 'Flow/MVC/Library/HTML';
  }

  static toNode(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result

    template.innerHTML = html;
    return template.content.firstChild;
  }

  static toNodes(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
/**
 * @name @mvc.Context
 */

class Context {
  static getName() {
    return 'Flow/MVC/Context';
  }

  constructor(context) {
    this.context = context;
  }
  /**
   *
   * @returns {Node}
   */


  create() {
    this.beforeCreate(); // Support JSX.

    if ('function' === typeof this.context) {
      this.node = this.context();
    } else if (this.context instanceof Element) {
      this.node = this.context.context;
    } else {
      this.node = HTML.toNode(this.context);
    }

    this.afterCreate();
    return this.node;
  }

  beforeCreate() {}

  afterCreate() {}

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
class ElementBase extends core.getObjectBase() {
  static getName() {
    return 'Flow/MVC/Base/Element';
  }
  /**
   * Function constructor() : Create Custom Element.
   */


  constructor(parent, context, options = {}) {
    super();

    if (!parent) {
      throw Error('parent is required.');
    }

    this.context = context;
    this.parent = parent;
    this.options = options;

    if (context instanceof HTMLElement) {
      this.element = context;
    } else if (!(context instanceof Context)) {
      context = new Context(this.context);
    } else {
      throw Error('context is invalid');
    }

    this.context = context;
    this.beforeInit();
    this.initialize(options);
    this.afterInit();
  }

  initialize(options = {}) {}

  render(preventDefault = false) {
    if (!preventDefault) this.beforeRender();
    let parent = this.parent;

    if (parent instanceof ElementBase) {
      // @ts-ignore
      parent = this.parent.element;
    } // If its instance of HTMLElement then we assume it was rendered before.


    if (this.context instanceof HTMLElement && this.context.isConnected) {
      // Re-render.
      // @ts-ignore
      parent.removeChild(this.context); // Render
      // @ts-ignore

      parent.appendChild(this.context);
    } else if (this.context instanceof Context) {
      // Do not remove if its not attached to DOM.
      if (this.element && this.element.isConnected) {
        // @ts-ignore
        parent.removeChild(this.element);
      } // Support JSX callbacks.


      if ('function' === typeof parent) {
        // @ts-ignore
        const _parent = parent(); // Temporary work around for non existing elements.


        if (!_parent) {
          this.context.create(); // @ts-ignore

          this.element = this.context.node;
        } else {
          this.element = _parent.element.appendChild(this.context.create());
        }
      } else {
        // Render.
        // @ts-ignore
        this.element = parent.appendChild(this.context.create());
      }
    }

    if (!preventDefault) this.afterRender();
    return this.element;
  }

  beforeInit() {}

  afterInit() {}

  beforeRender() {}

  afterRender() {}

  getElement() {
    return this.element;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
class Container extends ElementBase {
  static RENDER_WITHOUT_CHILD = 'RENDER_WITHOUT_CHILD';

  static getName() {
    return 'Flow/MVC/Container';
  }

  initialize() {
    this.events = {
      onBeforeRender: container => {},
      onAfterRender: Container => {}
    };
  }

  beforeRender() {
    const {
      onBeforeRender
    } = this.events;

    if (onBeforeRender) {
      onBeforeRender(this.child || Container.RENDER_WITHOUT_CHILD);
    }

    super.beforeRender();
  }

  render(preventDefault = false) {
    if (!preventDefault) this.beforeRender(); // Self Re-render.

    super.render(true); // Re-render of child.

    if (this.child) {
      // TODO THIS IS FINE?
      this.child.render(false);
    }

    if (!preventDefault) this.afterRender();
  }

  afterRender() {
    super.afterRender();
    const {
      onAfterRender
    } = this.events;

    if (onAfterRender) {
      onAfterRender(this.child || Container.RENDER_WITHOUT_CHILD);
    }
  }

  set(child) {
    if (!(child instanceof Container)) {
      throw new Error('Child required to be container');
    }

    this.child = child;
  }
  /**
   * Function on() : Declare event callback
   *
   * @param {'render:before'|'render:after'} event
   * @param {{function()}} callback
   *
   * @returns {Boolean}
   */


  on(event, callback) {
    switch (event) {
      case 'render:before':
        return !!(this.events.onBeforeRender = callback);

      case 'render:after':
        return !!(this.events.onAfterRender = callback);

      default:
        throw new Error(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
    }
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: WIP.
 */
/**
 * @name $flow.Element
 */

class Element extends Container {
  static getName() {
    return 'Flow/MVC/Element';
  }

  initialize() {
    this.beforeInit();
    super.initialize();
    this.children = [];
    this.afterInit();
  }

  beforeInit() {}

  afterInit() {}

  afterRender(attachListeners = true) {
    super.afterRender();
    this.parseChildren();
  }

  attachListener(method, callback) {
    switch (method) {
      case 'onClick':
        {
          this.element.addEventListener('click', callback);
        }
        break;
    }
  } // @ts-ignore


  attachListenersFromHTMLElement(element, controller = this) {
    let elements = {};

    if (element.childNodes) {
      elements = {
        element,
        ...element.childNodes
      };
    } else {
      elements = {
        element
      };
    }

    Object.values(elements).forEach(currentElement => {
      if (currentElement !== element) {
        if (currentElement instanceof HTMLElement) {
          this.attachListenersFromHTMLElement(currentElement, controller);
        } // @ts-ignore


        for (const entity in currentElement) {
          if (entity.startsWith('on')) {
            // @ts-ignore
            currentElement[entity] = this.evalHandlers(currentElement[entity], controller);
          }
        }
      }
    });
  }

  attachListenersFromContext(context, controller) {
    // Attach All `context` element events, to `target` component.
    let nodes = [];

    if (context.node) {
      nodes = [context.node];
    }

    if (nodes.length > 0 && context.node.childNodes) {
      nodes = [nodes, ...context.node.childNodes];
    } else {
      // Support JSX.
      nodes = context.childNodes;
    } // @ts-ignore


    const handleNode = node => {
      for (let i in node) {
        if (node[i] instanceof HTMLElement) {
          this.attachListenersFromHTMLElement(node[i], controller);
        }

        if (i.startsWith('on') && node[i]) {
          this.evalHandlers(node[i], controller);
        }
      }
    };

    nodes.forEach(node => {
      handleNode(node);
    });
  }

  evalHandlers(property, controller) {
    if (!controller) {
      return;
    }

    if (property && property.toString().includes('this')) {
      let funcContent = property.toString();
      funcContent = funcContent.replace(new RegExp('this', 'g'), 'from');
      funcContent = funcContent.substring(funcContent.indexOf("{") + 1); // Get function body.

      funcContent = funcContent.replace(/}$/, ''); // Remove the '}' of body.
      // In other words recreate the callback.

      property = (event, from = controller) => {
        eval(funcContent);
      };
    }

    return property;
  }

  parseChildren() {
    this.children = [];

    for (const children of this.element.children) {
      // @ts-ignore
      this.children.push(new Element(this.element, children));
    }
  }

  click(callback) {
    this.attachListener('onClick', callback);
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  html(content) {
    this.element.innerHTML = content.toString();
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }
  /**
   * @source: https://gist.github.com/chrisbuttery/cf34533cbb30c95ff155
   */


  fadeIn(sensitivity = .1) {
    const el = this.element; // @ts-ignore

    el.style.opacity = 0;
    el.style.display = "block";

    (function fade() {
      let val = parseFloat(el.style.opacity);

      if (!((val += sensitivity) > 1)) {
        // @ts-ignore
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
  /**
   * @source: https://gist.github.com/chrisbuttery/cf34533cbb30c95ff155
   */


  fadeOut(sensitivity = .1) {
    const el = this.element; // @ts-ignore

    el.style.opacity = 1;

    (function fade() {
      // @ts-ignore
      if ((el.style.opacity -= sensitivity) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
/**
 * @name $flow.View
 */

class View extends core.getObjectBase() {
  isRenderOnce = false;

  static getName() {
    return 'Flow/MVC/View';
  }

  constructor(parent, options = {}) {
    super();
    this.element = new Element(parent, // @ts-ignore
    options.template || this.template(), options);
    this.initialize(options);
  }

  initialize(options) {}

  template() {
    throw new core.ForceMethodError(this, 'template');
  }

  render() {
    this.isRenderOnce = true;
    this.element.render();
  }

  destroy() {
    // @ts-ignore
    const element = this.element.element;

    if (element.isConnected) {
      element.remove();
    }
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
core.getController();
/**
 * Builder of MVC pattern.
 *
 * @name $flow.Component
 */

class Component extends core.getObjectBase() {
  static getName() {
    return 'Flow/MVC/Component';
  }

  static getControllerClass() {
    // @ts-ignore
    return null;
  }

  constructor(parent, options = {}) {
    super();
    this.parent = parent;
    this.options = options;
    this.controller = this.getController();

    if (this.controller === null) {
      this.controller = new class NullController {}();
    }

    if (this.controller) {
      // @ts-ignore
      let {
        model
      } = options;

      if (!model) {
        const ModelClass = this.controller.constructor.getModelClass?.call(),
              modelOptions = {
          owner: this
        };

        if (ModelClass) {
          model = new ModelClass(modelOptions);
        } else {
          model = new Model(modelOptions);
        }
      }

      this.model = model; // TODO Add to interface or smth like that.

      this.controller.model = this.model;
    }

    this.initialize(this.options);
  }

  initialize(options) {
    let {
      view
    } = options;

    if (!view) {
      // @ts-ignore
      const template = this.template() || this.options.template || '<div>_EMPTY_TEMPLATE_</div>';
      this.options.template = template;
      view = new View(this.parent, {
        template
      });
    }
    /**
     * @type {$flow.View}
     */


    this.view = view; // Link context.

    this.context = view.element.context;
    this.hookAttachListeners();
  }

  hookAttachListeners() {
    if (this.context.isConnected) {
      Element.prototype.attachListenersFromContext.call(this.view.element, this.context, this);
    }

    this.view.element.afterRender = () => {
      Element.prototype.afterRender.call(this.view.element, false);
      Element.prototype.attachListenersFromContext.call(this.view.element, this.context, this);
    };
  }

  beforeRender() {}

  template() {}

  render() {
    this.beforeRender();
    this.view.render();
    this.afterRender();
  }

  afterRender() {}

  show() {
    this.view.element.show();
  }

  hide() {
    this.view.element.hide();
  }

  remove() {
    if (this.view) {
      this.view.destroy();
    }

    if (this.model) {
      this.model.destroy();
    }
  }

  getController() {
    let ControllerClass = this.constructor.getControllerClass(); // Bypass by null.

    if (null === ControllerClass) {
      return null;
    }

    if (ControllerClass) {
      // @ts-ignore
      return core.getControllersManager().get(ControllerClass.getName()) || // @ts-ignore
      core.getControllersManager().register(new ControllerClass(this), this.model);
    }

    throw new Error('Controller not valid.'); // TODO: Error? External class part of $flow
  }

  getView() {
    return this.view;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 */
class Factory {
  static sharedReferences = {};

  static getName() {
    return 'Flow/MVC/Factory';
  }
  /**
   * @returns {$flow.Element|false}
   */


  static createElement(selector) {
    selector = document.querySelector(selector);

    if (!selector?.parentElement) {
      return false;
    }

    return new Element(selector.parentElement, selector);
  }

  static createElementRef(selector, reference) {
    const element = this.createElement(selector); // @ts-ignore

    this.sharedReferences[reference] = element;
    return element;
  }

  static getElementRef(reference) {
    // @ts-ignore
    return this.sharedReferences[reference];
  }

}

function JsxElement(tag, attributes, ...children) {
  const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
      child.forEach(nestedChild => appendChild(parent, nestedChild));
    } else {
      parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
    }
  };

  const createElement = (tag, props, children) => {
    const element = document.createElement(tag);
    Object.entries(props || {}).forEach(([name, value]) => {
      // @ts-ignore
      element.setAttribute(name, value.toString());
    });
    children = children.filter(item => null !== item); // @ts-ignore

    children.forEach(function (current) {
      if (current) {
        appendChild(element, current);
      }
    });
    return element;
  };

  if ('string' === typeof tag) {
    return createElement(tag, attributes, children);
  }

  return Element;
}

if (globalThis.$flow.$mvc) {
  throw new Error('$flow.mvc is already defined');
}

const getComponent = () => Component;
const getContainer = () => Container;
const getContext = () => Context;
const getElement = () => Element;
const getFactory = () => Factory;
const getJsxElement = () => JsxElement;
const getModel = () => Model;
const getView = () => View; // @ts-ignore

globalThis.$flow.$mvc = {
  getComponent,
  getContainer,
  getContext,
  getElement,
  getFactory,
  getJsxElement,
  getModel,
  getView,
  Component,
  Container,
  Context,
  Element,
  Factory,
  JsxElement,
  Model,
  View
}; // @ts-ignore

globalThis.$flow = { // @ts-ignore$
  ...globalThis.$flow,
  // @ts-ignore
  ...globalThis.$flow.$mvc
}; // @ts-ignore

window.mvc = globalThis.$mvc;

exports.getComponent = getComponent;
exports.getContainer = getContainer;
exports.getContext = getContext;
exports.getElement = getElement;
exports.getFactory = getFactory;
exports.getJsxElement = getJsxElement;
exports.getModel = getModel;
exports.getView = getView;

Object.defineProperty(exports, '__esModule', { value: true });

}));
