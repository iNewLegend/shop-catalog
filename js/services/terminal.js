/**
 * @file: js/services/terminal.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: A live console opend by tilda key
 */

import Modules from '../modules/modules.js';

import JQuery from '../library/jquery.js';

const LOCAL_STORAGE_KEY = 'local_storage_key';

export default class Terminal {
    static instance = null;

    state = false;

    resize = {
        state: false,
        capturePosY: 0,
        captureHeight: 0,
    }

    /**
     * Function constructor() : Create Terminal
     */
    constructor() {
        if (Terminal.instance == null) {

            this.logger = new Modules.Logger(`Services.${this.constructor.name}`, true);
            this.logger.startEmpty();

            this.localStorage = window.localStorage;

            this.elements = {
                body: $('body'),

                terminal: {
                    self: $('#terminal'),

                    buttons: {
                        resize: $('#terminal button.resize'),
                        close: $('#terminal button.close'),
                    },
                }
            };

            this._initalize();

            Terminal.instance = this;
        }

        return Terminal.instance;
    }

    /**
     * Function _initalize() : Initalize Terminal
     */
    _initalize() {
        const { body, terminal } = this.elements;
        const { buttons } = terminal;

        // add .GetSelector to jQuery
        JQuery.addGetSelector($);

        body.keydown(this._onKeyDown.bind(this));
        body.mousemove(this._onMouseMove.bind(this));
        body.mouseup(this._onMouseUp.bind(this));

        terminal.self.scroll(this._onTerminalScroll.bind(this));

        // terminal buttons
        buttons.resize.mousedown(this._onTerminalReiszeMouseDown.bind(this));
        buttons.resize.mouseup(this._onTerminalReiszeMouseUp.bind(this));

        buttons.close.click(this._onTerminalCloseClick.bind(this));

        const storageHeight = this._stroage('height');

        if (storageHeight) {
            terminal.self.css('height', storageHeight);
        }

        // null on first time open
        if (this._stroage('active') === null | this._stroage('active') === 'true') {
            this.open();
        }
    }

    /**
     * Function _onKeyDown() : Called when key down on $('body)
     *
     * @param {Event} e 
     */
    _onKeyDown(e) {
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
    _onMouseMove(e) {
        //this.logger.startWith({ e });
        //this.logger.object({ x: e.pageX, y: e.pageY });

        if (this.resize.state) {
            this.logger.object({ x: e.pageX, y: e.pageY });

            const { self } = this.elements.terminal;

            let newHeight = this.resize.capturePosY - e.pageY + this.resize.captureHeight;

            if (newHeight < 50) {
                newHeight = 50;
            }

            self.css('height', newHeight);

            // set timeout here to save only if value stayed the same for (x) time
            setTimeout(() => {
                if (newHeight == parseInt(self.css('height'))) {
                    this._stroage('height', newHeight);
                }
            }, 500);

        }
    }

    /**
     * Function _onMouseMove() : Called when mouse up on $('body)
     *
     * @param {Event} e 
     */
    _onMouseUp(e) {
        //this.logger.startWith({ e });

        this._onTerminalReiszeMouseUp(e);
    }


    /**
     * Function _onTerminalScroll() : called when scroll on $('#terminal')
     */
    _onTerminalScroll() {
        //this.logger.startEmpty();

        const { self } = this.elements.terminal;
        const pLastChild = $("#terminal p:last-child");

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
    _onTerminalReiszeMouseDown(e) {
        this.logger.startWith({ e });
        this.logger.object({ x: e.pageX, y: e.pageY });

        const { self } = this.elements.terminal;

        this.resize.state = true;
        this.resize.capturePosY = e.pageY;
        this.resize.captureHeight = parseInt(self.css('height'));
    }

    /**
     * Function _onTerminalReiszeMouseUp() : Called when mouse up on $('#terminal button.resize')
     *
     * @param {Event} e 
     */
    _onTerminalReiszeMouseUp(e) {
        //this.logger.startWith({ e });

        this.resize.state = false;
    }

    /**
     * Function _onTerminalCloseClick() : Called when mouse up on $('#terminal button.close')
     *
     * @param {Event} e 
     */
    _onTerminalCloseClick(e) {
        this.logger.startWith({ e });

        this.close();
    }

    /**
     * Function _storage() : Get or set local storage
     * 
     * @param {string} type 
     * @param {any} val 
     */
    _stroage(type, val = null) {
        this.logger.startWith({ type, val });

        const key = LOCAL_STORAGE_KEY + '/' + type;

        if (val !== null) {
            this.localStorage.setItem(key, val);
        }

        return this.localStorage.getItem(key);
    }

    /**
     * Function open() : Open's the terminal
     */
    open() {
        this.logger.startEmpty();

        const { terminal } = this.elements;

        terminal.self.addClass('active');

        this._stroage('active', 'true');

        this.state = true;
    }

    /**
     * Function close() : Close's the terminal
     */
    close() {
        this.logger.startEmpty();

        const { terminal } = this.elements;

        this._stroage('active', 'false');

        terminal.self.removeClass('active');

        this.state = false;
    }
}


/**
 * Function onOutput() : Output handler
 * 
 * @param {string} text 
 * 
 * @todo change paramter text to something else.
 */
Terminal.onOutput = function (text) {
    const _this = Terminal.instance;

    let plain = false;

    const { terminal } = _this.elements;

    let formated = [];
    let objectFlag, tildaFlag, quoteFlag, dbQuotesFlag, spanFlag, skipFlag = false;
    let spansCount = 0;

    console.log.apply(this, arguments);

    // if jQuery element
    if (text instanceof jQuery) {
        text = `[jQuery Element]: '${text.getSelector()}'`;
    } else if (typeof text == 'object') {
        // for events.
        if (text.hasOwnProperty('originalEvent')) {
            text = `[Event]: type: '${text.type}' selector: '${text.handleObj.selector}'`;
            
        } else {
            text = JSON.stringify(text, null, 4);

            text = `<pre>${text}</pre>`;
        }
    }

    for (let i = 0; i < text.length; ++i) {
        if (skipFlag) {
            skipFlag = false;
            continue;
        }

        if (text[i] === '{' || text[i] === '}') {
            if (!objectFlag) {
                formated.push(`<span class="object">{`);
            } else {
                formated.push(`}</span>`);
            }

            objectFlag = !objectFlag;

            continue;
        } else if (text[i] === '`') {
            if (!tildaFlag) {
                formated.push(`${text[i]}<span class="tilda">`);
            } else {
                formated.push(`</span>${text[i]}`);
            }

            tildaFlag = !tildaFlag;

            continue;
        } else if (text[i] === "'") {
            if (!quoteFlag) {
                formated.push(`${text[i]}<span class="text quote">`);
            } else {
                formated.push(`</span>${text[i]}`);
            }

            quoteFlag = !quoteFlag;

            continue;
        } else if (text[i] === '"') {
            if (!dbQuotesFlag) {
                formated.push(`${text[i]}<span class="text double-quote">`);
            } else {
                formated.push(`</span>${text[i]}`);
            }

            dbQuotesFlag = !dbQuotesFlag;

            continue;
        } else if (text[i] == '%' && text[i + 1] == 'c') {
            if (plain) {
                i++;
                continue;
            }

            skipFlag = true;

            if (!spanFlag) {
                formated.push(`<span style="${arguments[1 + spansCount]}">`);
            } else {
                formated.push('</span>');
            }

            spanFlag = !spanFlag;
            ++spansCount;

            continue;
        }

        skipFlag = false;
        formated.push(text[i]);
    }


    text = formated.join('');

    text = text.replace(new RegExp('null', 'g'), '<span class="null">null</span>');

    terminal.self.append(`<p>${text}</p>`);

    terminal.self.stop();
    terminal.self.animate({
        scrollTop: terminal.self.get(0).scrollHeight
    });
}

/**
 * Funciton initalize() : Create Instance
 */
Terminal.initalize = function () {
    new Terminal();
}
