import * as Modules from '../modules/logger.js';

class Services { }

class Terminal {
    static instance = null;

    state = false;
    
    resize = {
        state: false,
        capturePosY: 0, 
        captureHeight: 0,
    }

    static onOutput(text) {
        const _this = Terminal.instance;

        console.log.apply(this, arguments)

        const { terminal } = _this.elements;

        let formated = [];
        let objectFlag, tildaFlag, quoteFlag, dbQuotesFlag, spanFlag, skipFlag = false;
        let spansCount = 0;

        if (typeof text == 'object') {
            text = JSON.stringify(text, null, 2);

            text = `<pre>${text}</pre>`;
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
                if (arguments[1] === 'plain') {
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

        if (arguments[1] === 'plain') {
            text = '<span class="plain">' + text + '</span>';
        }

        terminal.self.append(`<p>${text}</p>`);

        terminal.self.stop();
        terminal.self.animate({
            scrollTop: terminal.self.get(0).scrollHeight
        });
    }

    constructor() {
        if (Terminal.instance == null) {
            this.logger = new Modules.Logger('Services.Terminal', true);
            this.logger.startEmpty();

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

            this.initalize();
            this.open();

            Terminal.instance = this;
        }

        return Terminal.instance;
    }

    initalize() {
        const { body, terminal } = this.elements;
        const { resize, close } = terminal.buttons;
 
        body.keydown(this.onKeyDown.bind(this));
        body.mousemove(this.onMouseMove.bind(this));

        body.mouseup(this.onReiszeMouseUp.bind(this));

        resize.mousedown(this.onReiszeMouseDown.bind(this));
        resize.mouseup(this.onReiszeMouseUp.bind(this));

        close.click(this.onCloseButton.bind(this));

        terminal.self.scroll(this.onScroll.bind(this));
    }

    onKeyDown(e) {
        this.logger.startWith({ e });

        // tilda
        if (e.which === 192) {
            this.state ? this.close() : this.open();
        }
    }

    onMouseMove(e) {
        //this.logger.startWith({ e });
        //this.logger.object({ x: e.pageX, y: e.pageY });

        if (this.resize.state) {
            const { self } = this.elements.terminal;
            
            let newHeight = this.resize.capturePosY - e.pageY + this.resize.captureHeight;

            if (newHeight < 20) {
                newHeight = 20;
            }

            self.css('height', newHeight);
        }

    }

    onReiszeMouseDown(e) {
        this.logger.startWith({ e });
        //this.logger.object({ x: e.pageX, y: e.pageY });

        const { self } = this.elements.terminal; 

        this.resize.state = true;
        this.resize.capturePosY = e.pageY;
        this.resize.captureHeight = parseInt(self.css('height').replace('px', ''));
    }

    onReiszeMouseUp(e) {
        this.logger.startWith({ e });

        this.resize.state = false;
    }

    onCloseButton(e) {
        this.logger.startWith({ e });

        this.close();
    }

    onScroll() {
        this.logger.startEmpty();
        
        const { self } = this.elements.terminal;
        const pLastChild = $("#terminal p:last-child");

        if(self.height() > pLastChild.position().top + 15) {
            pLastChild.stop();
            pLastChild.fadeOut().fadeIn();
        }
    }

    open() {
        this.logger.startEmpty();

        const { terminal } = this.elements;

        terminal.self.addClass('active');

        this.state = true;
    }

    close() {
        this.logger.startEmpty();

        const { terminal } = this.elements;

        terminal.self.removeClass('active');

        this.state = false;
    }
}

export { Terminal }
