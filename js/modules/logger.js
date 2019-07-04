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

    setOutputHandler(outputHandler) {
        this.outputHandler = outputHandler;
    }

    /**
     * Function out() : Print console log with style
     * 
     * @param {string} text 
     */
    out(text, plain = false) {
        if (plain) {
            this.outputHandler(text, 'plain');

            return;
        }

        this.outputHandler(text, 
            'color: grey;font-size:7px',
            'display: block',
            `color: ${this.color}`,
            'color: black',
            'font-weight: bold',
            'color: black',
            'font-size: 16px;color: red;font-weight:800'
        );
    }

    /**
     * Function startEmpty() : Notify function start without args.
     * 
     * @param {string} output 
     */
    startEmpty(output = '') {
        if (! this.state) return;
        
        const source = this.getCallerName();

        this.out(`%c(se)-> %c%c${this.name}%c::%c${source}%c() ${output}%c`);
    }

    /**
     * Function startWith() : Notify function start with args.
     * 
     * @param {*} output 
     */
    startWith(params) {
        if (! this.state) return;

        const source = this.getCallerName();

        if (typeof params == "string") {
            console.log(`%c(sw)-> %c%c${this.name}%c::${source}() ->> string '${params}'`, `color: ${this.color}`, 'color: black');

            return;
        }

        if (Object.keys(params).length === 1) {
            const key = Object.keys(params)[0];
            const value = Object.values(params)[0];

            if (typeof value === 'object') {
                // print in next line
                this.out(`%c(sw)-> %c%c${this.name}%c::%c${source}%c() ->> ${key} %c↓`);
                console.dir(value);


            } else {
                // print in same line
                this.out(`%c(sw)-> %c%c${this.name}%c::%c${source}%c() ->> ${key}: '${value}'%c`);
            }

            return;
        }

        this.out(`%c(sw)-> %c%c${this.name}%c::%c${source}%c(${Object.keys(params).join(', ')}) %c↓`);

        for (let key in params) {
            if (typeof params[key] === 'object') {
                params[key] = JSON.stringify(params[key]);
            } else if (typeof params[key] == 'function') {
                params[key] = params[key].name.split(' ')[1] + '()';
            }

            // print long (multiline) object
            this.out("%c" + key + ": `" + params[key] + "`", "color: grey", true);
        }

    }

    /**
     * Function recv() : Notify recv from server
     * 
     * @param {{}} params 
     * @param {{}|[]} data 
     */
    recv(params, data) {
        if (! this.state) return;

        const source = this.getCallerName();

        for (let key in params) {
            this.out(`%c(rv)-> %c%c${this.name}%c::%c${source}%c() ->> ${key}: '${params[key]}' %c↓`);
        }

        this.out(data, true);
    }

    /**
     * Function object() : Prints object
     * 
     * @param {{}} params 
     * @param {string} notice 
     */
    object(params, notice = '') {
        if (! this.state) return;
        
        const source = this.getCallerName();

        params = Object.create(params);

        for (let key in params) {
            if (typeof params[key] === 'object') {
                params[key] = JSON.stringify(params[key]);
            }
            
            this.out(`%c(ob)-> %c%c${this.name}%c::%c${source}%c() [${notice}] ->> ${key}: '${params[key]}'%c`);
        }
    }
}