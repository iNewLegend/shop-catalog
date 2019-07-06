/**
 * @file: modules/logger.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description:
 * @todo: on constructor add prefix for owner
 */

export default class Logger {
    /**
     * Function constructor() : Create logger class
     * 
     * @param {*} owner 
     * @param {*} state 
     */
    constructor(owner, state = false) {
        this.state = state;
        this.name = '';

        if (typeof owner == 'string') {
            this.name = owner;
        } else {
            this.name = owner.constructor.name;
        }

        this.color = this.getRandomColor();

        this.outputHandler = console.log.bind();

        this.defaultStyle = [
            'color: grey;font-size:7px',
            'display: block',
            `color: ${this.color}`,
            'color: black',
            'font-weight: bold',
            'color: black',
            'font-size: 16px;color: red;font-weight:800'
        ];
    }

    _functionView(fn) {
        let fReturn = 'anonymous function()';

        if (fn.name.length !== 0) {
            fReturn = fn.name.split(' ')[1] + '()';
        }

        return fReturn;
    }

    _printFunctionNotify(type, source, output) {
        this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ${output}%c`].concat(this.defaultStyle));
    }

    _printInLineElement(type, source, key, value) {
        this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ->> ${key}: '${value}'%c`].concat(this.defaultStyle));
    }

    _printInLineFunction(type, source, key, fn)  {
        fn = this._functionView(fn);

        this._printInLineElement(type, source, key, fn);
    }

    _printInLineString(type, source, string) {
        this._printInLineElement(type, source, '(string)', string);
    }

    _printNextlineObject(type, source, key, obj) {
        this.out.apply(this, [`%c(${type})-> %c%c${this.name}%c::%c${source}%c() ->> ${key} %c↓`].concat(this.defaultStyle));
        // print in next line
        this.out(obj);
    }

    _printMultiLineObject(source, obj) {
        // print long (multiline) object
        this.out.apply(this, [`%c(sw)-> %c%c${this.name}%c::%c${source}%c(${Object.keys(obj).join(', ')}) %c↓`].concat(this.defaultStyle));

        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                obj[key] = JSON.stringify(obj[key]);
            } else if (typeof obj[key] == 'function') {
                obj[key] = this._functionView(obj[key]);                
            }

            
            this.out.apply(this, ["%c" + key + ": `" + obj[key] + "`", 'color: #a3a3a3']);
        }
    }
    
    /**
     * Function getRandomColor() : Return random color
     */
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    /**
     * Function getCallerName() : Return caller name
     */
    getCallerName() {
        const caller = Error().stack.split('\n')[3].trim();

        if (caller.startsWith('at new')) {
            return 'constructor';
        }

        return caller.split('.')[1].split(' ')[0];
    }

    /**
     * Set output handler
     * 
     * @param {function(...args)} outputHandler 
     */
    setOutputHandler(outputHandler) {
        this.outputHandler = outputHandler;
    }

    /**
     * Function out() : Print console log with style
     * 
     * @param {string} text 
     */
    out(...args) {
        this.outputHandler.apply(this, args);
    }

    /**
     * Function startEmpty() : Notify function start without args.
     * 
     * @param {string} output 
     */
    startEmpty(output = '') {
        if (!this.state) return;

        this._printFunctionNotify('se', this.getCallerName(), output);
    }

    /**
     * Function startWith() : Notify function start with args.
     * 
     * @param {*} output 
     */
    startWith(params) {
        if (!this.state) return;

        const type = 'se';
        const source = this.getCallerName();

        if (typeof params == "string") {
            this._printInLineString(type, source, params);

        } else if(Object.keys(params).length === 1) {
            const key = Object.keys(params)[0];
            let value = Object.values(params)[0];

            // function check is repated logic, handle it.
            if (typeof value === 'object') {
                this._printNextlineObject(type, source, key, value);
            } else if (typeof value == 'function') {
                this._printInLineFunction(type, source, key, value)
            } else {
                this._printInLineElement(type, source, key, value);
            }
        } else {
            this._printMultiLineObject(source, params);
        }
    }

    /**
     * Function recv() : Notify recv from server
     * 
     * @param {{}} params 
     * @param {{}|[]} data 
     */
    recv(params, data) {
        if (!this.state) return;

        const source = this.getCallerName();

        for (let key in params) {
            this.out.apply(this, [`%c(rv)-> %c%c${this.name}%c::%c${source}%c() ->> ${key}: '${params[key]}' %c↓`].concat(this.defaultStyle));
        }

        this.out(data);
    }

    /**
     * Function object() : Prints object
     * 
     * @param {{}} params 
     * @param {string} notice 
     */
    object(params, notice = '') {
        if (!this.state) return;

        const source = this.getCallerName();

        params = Object.create(params);

        for (let key in params) {
            if (typeof params[key] === 'object') {
                params[key] = JSON.stringify(params[key]);
            }

            this.out.apply(this, [`%c(ob)-> %c%c${this.name}%c::%c${source}%c() [${notice}] ->> ${key}: '${params[key]}'%c`].concat(this.defaultStyle));
        }
    }

    /**
     * Function debug() : Notify debug.
     * `
     * @param {string} output 
     */
    debug(output) {
        if (!this.state) return;

        this._printFunctionNotify('db', this.getCallerName(), output);
    }

}