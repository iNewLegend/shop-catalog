(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.core = {}));
})(this, (function (exports) { 'use strict';

class ForceMethodBase extends Error {
  constructor(className, methodName) {
    super(`ForeMethod implementation: at '${className}' method: '${methodName}'`);
  }

}
class ForceMethod extends Error {
  constructor(context, methodName) {
    super(`ForeMethod implementation: at '${context.getName()}' method: '${methodName}'`);
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: is base class/object for all instances, responsible for: 'getName', implementation.
 */
let IdCounter = 0;
/**
 * Base class 4*
 */

class ObjectBase {
  virtualId = 0;

  static getName() {
    throw new ForceMethodBase("Flow/Core", "getName");
  }

  constructor() {
    this.virtualId = IdCounter;
    ++IdCounter;
  }

  getName() {
    return this.constructor.getName();
  }

}
function APIResetIdCounter() {
  IdCounter = 0;
  return 0;
}

/**
 * Function hexColorDelta() : Return color difference in ratio decimal point.
 *
 * @copyright http://jsfiddle.net/96sME/
 */
const hexColorDelta = function (hex1, hex2) {
  hex1 = hex1.replace("#", "");
  hex2 = hex2.replace("#", ""); // Get red/green/blue int values of hex1

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16); // Get red/green/blue int values of hex2

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16); // Calculate differences between reds, greens and blues

  let r = 255 - Math.abs(r1 - r2);
  let g = 255 - Math.abs(g1 - g2);
  let b = 255 - Math.abs(b1 - b2); // Limit differences between 0 and 1

  r /= 255;
  g /= 255;
  b /= 255; // 0 means opposite colors, 1 means same colors

  return (r + g + b) / 3;
};

/**
 * Function getCircularReplacer() : Reduce circular references.
 *
 * @copyright https://stackoverflow.com/a/53731154
 */
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }

      seen.add(value);
    }

    return value;
  };
};

const MAX_WRAPPING_RECURSIVE_DEPTH = 4;
class Logger {
  static wrappers = {};
  static wrapperDepth = 0;
  static sharedData = {};
  static colorsInUse = [];
  args = {};
  state = false;

  static getName() {
    return "Modules/Logger";
  }
  /**
   * Function reset() : Reset logger globals.
   */


  static reset() {
    Logger.wrappers = {};
    Logger.wrapperDepth = 0;
    Logger.colorsInUse = [];
    Logger.sharedData = {};
  }
  /**
   * Function createCustomWrapper() : Creates custom wrapper for log entities.
   */


  static createCustomWrapper(classType, callback) {
    // @ts-ignore
    if (!Logger.wrappers[classType]) {
      // @ts-ignore
      Logger.wrappers[classType.name] = [];
    } // @ts-ignore


    Logger.wrappers[classType.name].push({
      classType,
      callback
    });
  }
  /**
   * Function getCallerName() : Return caller name.
   */


  static getCallerName() {
    const error = new Error(),
          caller = error.stack ? error.stack.split("\n")[3].trim() : '_UNKNOWN_CALLER_NAME_';

    if (caller.startsWith("at new")) {
      return "constructor";
    }

    return caller.split(".")[1].split(" ")[0];
  }
  /**
   * Function functionView() : Return function preview.
   */


  static getFunctionView(fn) {
    let fReturn = "anonymous function()"; // TODO: Check if works.

    if (typeof fn !== "string" && fn.name.length !== 0) {
      fReturn = fn.name.split(" ")[1] + "()";
    }

    return fReturn;
  }
  /**
   * Function constructor() : Create logger class.
   */


  constructor(owner, isActive = false, args = {}) {
    if ('off' === globalThis.process?.env['flow/modules/logger']) {
      return;
    }

    this.state = isActive;
    this.args = args;
    this.name = "";

    if (typeof owner == "string") {
      this.name = owner;
    } else {
      this.name = owner.constructor.name;
    }

    if (isActive) {
      this.initialize();
    }
  }
  /**
   * Function initialize() : Initialize logger class.
   */


  initialize() {
    if (this.args.sameColor) {
      if (!Logger.sharedData[this.name]) {
        Logger.sharedData[this.name] = this.getRandomColor();
      }

      this.color = Logger.sharedData[this.name];
    } else {
      this.color = this.getRandomColor();
      Logger.colorsInUse.push(this.color);
    }

    this.outputHandler = console.log;
    this.defaultStyle = ["color: grey;font-size:7px", "display: block", `color: ${this.color}`, "color: black", "font-weight: bold", "color: black", "font-size: 16px;color: red;font-weight:800"];
  }
  /**
   * Function setOutputHandler() : Set custom output handler.
   */


  setOutputHandler(outputHandler) {
    this.outputHandler = outputHandler;
  }
  /**
   * Function useWrapper() : Search for customized log view, each instance,
   * that typeof the instance was registered wrapper will have unique output
   * according to the registered callback.
   */


  useWrapper(obj, shouldHandleChildren = true) {
    if (!obj || 'object' !== typeof obj || Array.isArray(obj)) {
      return obj;
    }

    Logger.wrapperDepth++; // Result will lose classType (instanceOf will not work), now based on obj.

    let result = { ...obj
    }; // @ts-ignore

    Object.values(Logger.wrappers).forEach(([wrapper]) => {
      if (obj instanceof wrapper.classType) {
        result = wrapper.callback(obj) || result;
      }
    });

    if (Logger.wrapperDepth >= MAX_WRAPPING_RECURSIVE_DEPTH) {
      Logger.wrapperDepth--;
      return result;
    }

    if (shouldHandleChildren && result) {
      Object.entries(result).forEach(([key, value]) => {
        result[key] = this.useWrapper(value, true);
      });
    }

    Logger.wrapperDepth--;
    return result;
  }
  /**
   * Function startEmpty() : Notify function start without args.
   *
   * @param {string} output
   */


  startEmpty(output = "") {
    if (!this.state) return;
    this.printFunctionNotify("se", Logger.getCallerName(), output);
  }
  /**
   * Function startWith() : Notify function start with args.
   *
   * TODO: Rename to startsWith
   */


  startWith(params) {
    if (!this.state) return;
    params = Object.assign({}, params);
    const type = "se";
    const source = Logger.getCallerName();

    if (typeof params == "string") {
      this.printInLineString(type, source, params);
    } else if (Object.keys(params).length === 1) {
      const key = Object.keys(params)[0];
      let value = Object.values(params)[0]; // TODO: Check is repeated logic, handle it.

      if (typeof value === "object") {
        this.printNextLineObject(type, source, key, value || {});
      } else if (typeof value == "function") {
        this.printInLineFunction(type, source, key, value);
      } else {
        this.printInLineElement(type, source, key, value);
      }
    } else {
      this.printMultiLineObject(type, source, params);
    }
  }
  /**
   * Function object() : Prints object.
   **/


  object(params = {}, notice = "") {
    if (!this.state) return;
    const source = Logger.getCallerName();
    params = Object.create(params);

    for (let key in params) {
      if (typeof params[key] === "object") {
        params[key] = JSON.stringify(this.useWrapper(params[key]), getCircularReplacer());
      }

      this.out.apply(this, [`%c(ob)-> %c%c${this.name}%c::%c${source}%c() [${notice}] ->> ${key}: '${params[key]}'%c`].concat(this.defaultStyle));
    }
  }
  /**
   * Function debug() : Notify debug.
   */


  debug(output) {
    if (!this.state) return;
    this.printFunctionNotify("db", Logger.getCallerName(), output);
  }
  /**
   * Function drop : Preview as continue of log which drop ite.
   */


  drop(according, data) {
    if (!this.state) return;
    const source = Logger.getCallerName();

    for (let key in according) {
      this.out.apply(this, [`%c(dr)-> %c%c${this.name}%c::%c${source}%c() ->> corresponding ${key}: '${according[key]}' RESULT: %c↓`].concat(this.defaultStyle));
    }

    this.out(data);
  }
  /**
   * Function throw() : Throws logged error.
   */


  throw(output, name = 'null', params = {}) {
    this.printFunctionNotify("tw", Logger.getCallerName(), output);
    if (params) this.printNextLineObject("tw", Logger.getCallerName(), name, params);
    throw new Error().stack;
  }
  /**
   * Function clone() : Create clone instance.
   */


  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
  /**
   * Function printFunctionNotify() : Print simple log for notify source (function).
   *
   */


  printFunctionNotify(type, source, output) {
    this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ${output}%c`].concat(this.defaultStyle));
  }
  /**
   * Function printInLineElement() : Print in line element.
   */


  printInLineElement(type, source, key, value) {
    this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ->> ${key}: '${value}'%c`].concat(this.defaultStyle));
  }
  /**
   * Function printInLineFunction() : Print in line function.
   */


  printInLineFunction(type, source, key, fn) {
    fn = Logger.getFunctionView(fn);
    this.printInLineElement(type, source, key, fn);
  }
  /**
   * Function printInLineString() : Print in line string.
   */


  printInLineString(type, source, string) {
    this.printInLineElement(type, source, "(string)", string);
  }
  /**
   * Function printNextLineObject() : Print object in next line.
   */


  printNextLineObject(type, source, key, obj) {
    obj = this.useWrapper(obj);
    this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ->> ${key} %c↓`].concat(this.defaultStyle)); // print in next line

    this.out(obj);
  }
  /**
   * Function printMultiLineObject() : Print object in multiline format.
   */


  printMultiLineObject(type, source, obj) {
    this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c(${Object.keys(obj).join(", ")}) %c↓`].concat(this.defaultStyle));

    for (let key in obj) {
      let value = obj[key];

      if (typeof value === "object") {
        value = JSON.stringify(this.useWrapper(value), getCircularReplacer());
      } else if (typeof obj[key] == "function") {
        value = Logger.getFunctionView(value);
      }

      this.out.apply(this, ["%c" + key + ": `" + this.useWrapper(value) + "`", "color: #a3a3a3"]);
    }
  }
  /**
   * Function getRandomColor() : Return random color.
   */


  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    let similar = Logger.colorsInUse.some(value => {
      // it returns the ratio of difference... closer to 1.0 is less difference.
      return hexColorDelta(color, value) >= 0.8;
    }); // if the color is similar, try again.

    if (similar) {
      return this.getRandomColor();
    }

    return color;
  }
  /**
   * Function out() : Print console log with style
   */


  out(...args) {
    this.outputHandler.apply(this, args);
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Base for all commands, that can be managed by any commands' manager.
 */
/**
 * @name $flow.commandBases.CommandBase
 */

class CommandBase$1 extends ObjectBase {
  args = {};
  options = {};

  constructor(args = {}, options = {}) {
    super();

    if (!CommandBase$1.logger) {
      CommandBase$1.logger = new Logger(this.constructor.getName(), true, {
        sameColor: true
      });
    }

    this.logger = CommandBase$1.logger;
    this.logger.startWith({
      args,
      options
    });
    this.initialize(args, options);
  }

  initialize(args, options = {}) {
    this.args = args;
    this.options = options;
  }

  apply(args = this.args, options = this.options) {
    throw new ForceMethod(this, "apply");
  }

  run() {
    return this.apply(this.args, this.options);
  }

  getArgs() {
    return this.args;
  }

  getOptions() {
    return this.options;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: CommandPublic, is used everytime the act should represent a user action.
 * */
/**
 * @name $flow.commandBases.CommandPublic
 */

class CommandPublic$1 extends CommandBase$1 {
  static getName() {
    return "Flow/Core/CommandBases/CommandPublic";
  }

}

var modules = /*#__PURE__*/Object.freeze({
__proto__: null,
Logger: Logger
});

class CommandAlreadyRegistered$1 extends Error {
  constructor(command) {
    super(`Command: '${command.getName()}' is already registered`);
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
class CommandNotFound$1 extends Error {
  constructor(command) {
    super(`Command: '${command}' is not found`);
  }

}

class ControllerAlreadyRegistered$1 extends Error {
  constructor(controller) {
    super(`Controller: '${controller.getName()}' is already registered`);
  }

}

var errors = /*#__PURE__*/Object.freeze({
__proto__: null,
CommandAlreadyRegistered: CommandAlreadyRegistered$1,
CommandNotFound: CommandNotFound$1,
ControllerAlreadyRegistered: ControllerAlreadyRegistered$1,
ForceMethod: ForceMethod
});

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging/running/hooking commands.
 */
class Commands extends ObjectBase {
  commands = {};
  onBeforeHooks = {};
  onBeforeUIHooks = {};
  onAfterHooks = {};
  onAfterOnceHooks = {};
  onAfterUIHooks = {};
  onAfterAffectHooks = {};

  static getName() {
    return "Flow/Core/Managers/Commands";
  }

  static runCallbacks(callbacks, args = {}, options = {}) {
    if (callbacks) {
      for (let i = 0; i != callbacks.length; ++i) {
        const callback = options.pop === false ? callbacks[i] : callbacks.pop();

        if (!callback) {
          break;
        }

        callback(args, options);
      }
    }
  }

  static hookCommand(stack, hookCommand, context) {
    if (!stack[hookCommand]) {
      stack[hookCommand] = [];
    }

    stack[hookCommand].push(context);
  }

  constructor() {
    super();
    this.logger = new Logger(this.getName(), true);
    this.logger.startEmpty();
  }

  run(command, args = {}, options = {}) {
    if (typeof command === "string") {
      command = this.getCommandInstance(command, args, options);
    }

    return this.runInstance(command, args, options);
  }

  register(commands, controller) {
    const result = [];
    Object.values(commands).forEach(command => {
      const commandName = command.getName();

      if (this.commands[commandName]) {
        throw new CommandAlreadyRegistered$1(command);
      }

      this.commands[commandName] = command;
      result.push(command);
    });
    return result;
  }

  get(name) {
    return this.commands[name];
  }

  getAll() {
    return this.commands;
  }

  getLogger() {
    return this.logger;
  }

  getCommandInstance(name, args = {}, options = {}) {
    const CommandClass = this.commands[name];

    if (!CommandClass) {
      throw new CommandNotFound$1(name);
    } // @ts-ignore


    return new CommandClass(args, options);
  }
  /**
   * Used to set hooks that effects only data and not UI.
   */


  onBefore(hookCommand, callback) {
    Commands.hookCommand(this.onBeforeHooks, hookCommand, callback);
  }
  /**
   * Used to set hooks that effects only UI.
   */


  onBeforeUI(hookCommand, callback) {
    Commands.hookCommand(this.onBeforeUIHooks, hookCommand, callback);
  }
  /**
   * Used to set hooks that effects only data and not UI.
   */


  onAfter(hookCommand, callback) {
    Commands.hookCommand(this.onAfterHooks, hookCommand, callback);
  }
  /**
   * Used to set hooks that effects only UI.
   */


  onAfterUI(command, callback) {
    Commands.hookCommand(this.onAfterUIHooks, command, callback);
  }
  /**
   * Used to set hooks that effects only data and not UI.
   */


  onAfterOnce(command, callback) {
    Commands.hookCommand(this.onAfterOnceHooks, command, callback);
  }
  /**
   * Used to register a trigger that runs command after `hookCommand` run's.
   */


  onAfterAffect(hookCommand, affectCommand) {
    Commands.hookCommand(this.onAfterAffectHooks, hookCommand, affectCommand);
  }

  onBeforeRun(command, args = {}, options = {}) {
    if (this.onBeforeHooks[command.getName()]) {
      const callbacks = this.onBeforeHooks[command.getName()];
      callbacks.forEach(callback => callback(args, options));
    }

    if (this.onBeforeUIHooks[command.getName()]) {
      const callbacks = this.onBeforeUIHooks[command.getName()];
      callbacks.forEach(callback => callback(args, options));
    }
  }

  runInstance(command, args = {}, options = {}) {
    let result = null; // TODO: Maybe a logger method to handle such cases.

    if (Object.keys(args).length) {
      this.logger.startWith({
        command: command.getName(),
        options,
        CommandArgs: "->"
      });
      this.logger.debug("CommandArgs:");
      this.logger.object(args);
    } else {
      this.logger.startWith({
        command: command.getName(),
        options,
        args
      });
    }

    this.onBeforeRun(command, args, options);
    result = command.run();

    if (result instanceof Promise) {
      result.then(_result => this.onAfterRun(command, args, options, _result));
    } else {
      this.onAfterRun(command, args, options, result);
    }

    return result;
  }

  onAfterRun(command, args, options, result) {
    if (this.onAfterAffectHooks[command.getName()]) {
      this.onAfterAffectHooks[command.getName()].forEach(command => {
        args.result = result;
        result = this.run(command.toString(), args, options);
      });
    }

    if (this.onAfterHooks) {
      args.result = result;
      Commands.runCallbacks(Object.assign([], this.onAfterHooks[command.getName()]), args, options);
    }

    if (this.onAfterOnceHooks) {
      const callbacks = this.onAfterOnceHooks[command.getName()];
      Commands.runCallbacks(callbacks);
      delete this.onAfterOnceHooks[command.getName()];
    }

    if (this.onAfterUIHooks) {
      Commands.runCallbacks(Object.assign([], this.onAfterUIHooks[command.getName()]), args, { ...options,
        pop: false // Delete after run.

      });
    }

    return result;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging controllers, each controller is global singleton instance.
 */
class Controllers extends ObjectBase {
  controllers = {};

  static getName() {
    return "Flow/Core/Managers/Controllers";
  }

  get(name) {
    return this.controllers[name];
  }

  register(controller) {
    if (this.controllers[controller.getName()]) {
      throw new ControllerAlreadyRegistered$1(controller);
    } // Register.


    this.controllers[controller.getName()] = controller;
    return controller;
  }

}

var HTTPMethodEnum;

(function (HTTPMethodEnum) {
  HTTPMethodEnum["DELETE"] = "DELETE";
  HTTPMethodEnum["GET"] = "GET";
  HTTPMethodEnum["OPTIONS"] = "OPTIONS";
  HTTPMethodEnum["PATCH"] = "PATCH";
  HTTPMethodEnum["POST"] = "POST";
  HTTPMethodEnum["PUT"] = "PUT";
  HTTPMethodEnum["__EMPTY__"] = "";
})(HTTPMethodEnum || (HTTPMethodEnum = {}));

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Providing a simple wrapper for fetch API.
 */
class Http extends ObjectBase {
  static getName() {
    return 'Flow/Core/Clients/Http';
  }
  /**
   * Function constructor() : Create the http.
   */


  constructor(apiBaseUrl = 'http://localhost') {
    super();
    this.logger = new Logger(Http.getName(), true);
    this.logger.startWith({
      apiBaseUrl
    });
    this.apiBaseUrl = apiBaseUrl + '/';
  }

  getLogger() {
    return this.logger;
  }
  /**
   * Function fetch() : Fetch api.
   */


  async fetch(path, method, body = null) {
    this.logger.startWith({
      path,
      method,
      body
    });
    const params = {
      'credentials': 'include'
    },
          // Support cookies.
    headers = {};

    if ([HTTPMethodEnum.POST, HTTPMethodEnum.PUT, HTTPMethodEnum.PATCH].includes(method)) {
      Object.assign(headers, {
        'Content-Type': 'application/json'
      });
      Object.assign(params, {
        method,
        headers: headers,
        body: JSON.stringify(body)
      });
    } else {
      Object.assign(params, {
        headers
      });
    }

    const response = await globalThis.fetch(this.apiBaseUrl + path, params);
    let data = undefined;

    try {
      data = await response.json();
    } catch (e) {
      console.error(e);
      return false;
    } // TODO: This is part should be modular and not hard coded.


    if (data.error && data.global && data.message) {
      throw new Error(data.message);
    }

    this.logger.drop({
      path
    }, data);
    return data;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging data commands.
 */
class Data extends Commands {
  static getName() {
    return 'Flow/Core/Managers/Data';
  }

  constructor() {
    super(); // @ts-ignore

    Data.client = new Http($flowConfig.baseURL);
  }

  getClient() {
    return Data.client;
  }

  get(command, args = {}, options = {}) {
    this.currentHttpMethod = HTTPMethodEnum.GET;
    return super.run(command, args, options);
  }

  update(command, args = {}, options = {}) {
    this.currentHttpMethod = HTTPMethodEnum.PATCH;
    return super.run(command, args, options);
  }

  delete(command, args = {}, options = {}) {
    this.currentHttpMethod = HTTPMethodEnum.DELETE;
    return super.run(command, args, options);
  }

  create(command, args = {}, options = {}) {
    this.currentHttpMethod = HTTPMethodEnum.POST;
    return super.run(command, args, options);
  }

  async runInstance(command, args = {}, options = {}) {
    if (!this.currentHttpMethod) {
      throw new Error('Cannot run directly');
    } // New args.


    const newArgs = {
      type: this.currentHttpMethod,
      args: {
        query: {},
        data: {}
      }
    };

    if (HTTPMethodEnum.GET === this.currentHttpMethod) {
      newArgs.args.query = args;
    } else {
      newArgs.args.data = args;
    }

    args.result = await super.runInstance(command, newArgs, options); // Clear method type.

    this.currentHttpMethod = HTTPMethodEnum.__EMPTY__;
    return args.result;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Responsible for manging internal commands.
 * @propose: To serve commands that are not triggered by user.
 */
class Internal extends Commands {
  static getName() {
    return "Flow/Core/Managers/Internal";
  }

}

let commands$1 = new Commands();
let controllers$1 = new Controllers();
let data$1 = new Data();
let internal$1 = new Internal();

var managers = /*#__PURE__*/Object.freeze({
__proto__: null,
commands: commands$1,
controllers: controllers$1,
data: data$1,
internal: internal$1
});

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Each data command should represent a final REST endpoint.
 */
/**
 * @name $flow.commandBases.CommandData
 */

class CommandData$1 extends CommandPublic$1 {
  static getName() {
    return 'Flow/Core/CommandBases/CommandData';
  }
  /**
   * @description: Override this method is required to determine endpoint and magic query params.
   * eg:
   * args = { query: { id: 1 }  };
   * getEndpoint() = '/api/v1/users/{id}';
   * result = '/api/v1/users/1';
   */


  getEndpoint() {
    throw new ForceMethod(this, 'getEndpoint');
  }

  apply(args = this.args, options = this.options) {
    const endpoint = this.applyEndpointFormat(this.getEndpoint(), args);
    return data$1.getClient().fetch(endpoint, data$1.currentHttpMethod, args || null);
  }

  applyEndpointFormat(endpoint, data = {}) {
    // Replace query with `magic` placeholders.
    if (endpoint.includes('{')) {
      endpoint = endpoint.split('/').map(endpointPart => {
        const match = endpointPart.match('\\{(.*?)\\}');

        if (match?.length) {
          if (undefined !== typeof data[match[1]]) {
            return data[match[1]];
          }
        }

        return endpointPart;
      }).join('/');
    }

    return endpoint;
  }

}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: CommandInternal, is used when part of the logic needed to be command but not represent a User command.
 */
/**
 * @name $flow.commandBases.CommandInternal
 */

class CommandInternal$1 extends CommandPublic$1 {
  static getName() {
    return "Flow/Core/CommandBases/CommandInternal";
  }

}

var commandBases = /*#__PURE__*/Object.freeze({
__proto__: null,
CommandPublic: CommandPublic$1,
CommandData: CommandData$1,
CommandBase: CommandBase$1,
CommandInternal: CommandInternal$1
});

var types$1 = /*#__PURE__*/Object.freeze({
__proto__: null
});

var utils = /*#__PURE__*/Object.freeze({
__proto__: null,
getCircularReplacer: getCircularReplacer,
hexColorDelta: hexColorDelta
});

var name = "@appflux/core";
var version = "1.0.2-alpha.17";
var description = "Commands management API";
var scripts = {
	test: "jest",
	build: "rollup -c",
	watch: "rollup -c -w"
};
var repository = {
	type: "git",
	url: "git+https://github.com/appflow/core.git"
};
var keywords = [
	"commands",
	"commander",
	"flux",
	"flow",
	"AppFlow"
];
var author = "Leonid Vinikov <czf.leo123@gmail.com> (https://github.com/iNewLegend)";
var license = "MIT";
var files = [
	"dist",
	"src"
];
var publishConfig = {
	access: "public"
};
var types = "dist/index.d.ts";
var devDependencies = {
	"@babel/core": "^7.18.10",
	"@babel/plugin-transform-runtime": "^7.18.10",
	"@babel/preset-env": "^7.18.10",
	"@babel/preset-typescript": "^7.18.6",
	"@rollup/plugin-babel": "^5.3.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.3.0",
	"@rollup/plugin-replace": "^4.0.0",
	"@types/jest": "^28.1.6",
	"@typescript-eslint/eslint-plugin": "^5.32.0",
	"@typescript-eslint/parser": "^5.32.0",
	"babel-jest": "^28.1.3",
	rollup: "^2.77.2",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.32.1",
	"ts-jest": "^28.0.7"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	files: files,
	publishConfig: publishConfig,
	types: types,
	devDependencies: devDependencies
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 * @TODO: Remove - Its better to redeclare the whole API.
 */

function APIRestart$1() {
  // @ts-ignore
  commands = new Commands(); // @ts-ignore

  controllers = new Controllers(); // @ts-ignore

  data = new Data(); // @ts-ignore

  internal = new Internal();
}

/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Controller is part of MVC concept, responsible for actions.
 */
class Controller extends ObjectBase {
  commands = {};
  data = {};
  internal = {};

  static getName() {
    return "Flow/Core/Controller";
  }

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.register();
    this.setupHooks();
  }

  setupHooks() {}

  register() {
    const commands = Object.values(this.getCommands()),
          data = Object.values(this.getData()),
          internal = Object.values(this.getInternal());
    this.commands = commands$1.register(commands, this);
    this.data = data$1.register(data, this);
    this.internal = internal$1.register(internal, this);
  }

  getCommands() {
    return {};
  }

  getData() {
    return {};
  }

  getInternal() {
    return {};
  }

}

if (globalThis?.$flow) {
  throw new Error('$flow is already defined');
} // API Config.


const config = { // @ts-ignore
  ...globalThis?.$flowConfig,
  version: pkg.version
}; // Remove the injection if it was injected.
// @ts-ignore

if (globalThis?.$flowConfig) {
  // @ts-ignore
  delete globalThis?.$flowConfig;
}
/**
 * After fighting too much with IDE to make it work with automatic declarations, in order to have with long namespaces like:
 * `$flow.modules.Logger`, without success I decided to use "names" to get all the declarations works outofbox.
 */
// export namespace $flow {


const getCommandBases = () => commandBases;
const getCommandBase = () => CommandBase$1;
const getCommandPublic = () => CommandPublic$1;
const getCommandData = () => CommandData$1;
const getCommandInternal = () => CommandInternal$1;
const CommandBase = CommandBase$1;
const CommandPublic = CommandPublic$1;
const CommandData = CommandData$1;
const CommandInternal = CommandInternal$1;
const getErrors = () => errors;
const CommandAlreadyRegistered = CommandAlreadyRegistered$1;
const CommandNotFound = CommandNotFound$1;
const ControllerAlreadyRegistered = ControllerAlreadyRegistered$1;
const ForceMethodError = ForceMethod;
const getManagers = () => managers;
const getCommandsManager = () => commands$1;
const getDataManager = () => data$1;
const getInternalManager = () => internal$1;
const getControllersManager = () => controllers$1;
const getModules = () => modules;
const getLoggerModule = () => Logger;
const getTypes = () => types$1;
const getUtils = () => utils;
const getObjectBase = () => ObjectBase;
const getController = () => Controller;
const APIRestart = () => {
  APIRestart$1();
  APIResetIdCounter();
  Logger.reset();
}; // }

const API = {
  config,
  getCommandBases,
  getCommandBase,
  getCommandPublic,
  getCommandData,
  getCommandInternal,
  CommandBase,
  CommandPublic,
  CommandData,
  CommandInternal,
  getErrors,
  CommandAlreadyRegistered,
  CommandNotFound,
  ControllerAlreadyRegistered,
  ForceMethodError,
  getManagers,
  getCommandsManager,
  getDataManager,
  getInternalManager,
  getControllersManager,
  getModules,
  getLoggerModule,
  getTypes,
  getObjectBase,
  getController,
  APIRestart,
  commandBases,
  errors,
  managers,
  modules,
  types: types$1,
  utils,
  ObjectBase,
  Controller
}; // @ts-ignore

if (globalThis?.$flow) globalThis.$flow = API; // @ts-ignore

if ('undefined' !== typeof window) window.$flow = API;

exports.API = API;
exports.APIRestart = APIRestart;
exports.CommandAlreadyRegistered = CommandAlreadyRegistered;
exports.CommandBase = CommandBase;
exports.CommandData = CommandData;
exports.CommandInternal = CommandInternal;
exports.CommandNotFound = CommandNotFound;
exports.CommandPublic = CommandPublic;
exports.ControllerAlreadyRegistered = ControllerAlreadyRegistered;
exports.ForceMethodError = ForceMethodError;
exports.config = config;
exports.getCommandBase = getCommandBase;
exports.getCommandBases = getCommandBases;
exports.getCommandData = getCommandData;
exports.getCommandInternal = getCommandInternal;
exports.getCommandPublic = getCommandPublic;
exports.getCommandsManager = getCommandsManager;
exports.getController = getController;
exports.getControllersManager = getControllersManager;
exports.getDataManager = getDataManager;
exports.getErrors = getErrors;
exports.getInternalManager = getInternalManager;
exports.getLoggerModule = getLoggerModule;
exports.getManagers = getManagers;
exports.getModules = getModules;
exports.getObjectBase = getObjectBase;
exports.getTypes = getTypes;
exports.getUtils = getUtils;

Object.defineProperty(exports, '__esModule', { value: true });

}));
