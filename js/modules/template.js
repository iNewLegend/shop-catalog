/**
 * @file: modules/template.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Used as pages mechanism
 */

const debug = true;

export default class Template {

    /**
     * Function constructor() : Create Template 
     * 
     * @param {*} entangleDom 
     */
    constructor(entangleDom) {
        if (debug) {
            console.log(`${this.constructor.name}::constructor() -> `);
            console.dir(entangleDom[0]);
        }

        this.events = {
            entangleLoad: null,
            innerLoad: null
        }

        this.innerHtml = '';
        this.innerDom = null;
        this.entangleDom = entangleDom;

        this.innerIntitalDom = $(this.entangleDom.html());

        $(this.entangleDom).ready(() => {
            this._onEntangleLoad();
        });
    }

    /**
     * Function _onEntangleLoad() : Called on Entagle Dom ready
     */
    _onEntangleLoad() {
        if (debug) console.log(`${this.constructor.name}::_onEntangleLoad()`);

        if (this.events.entangleLoad) {
            this.events.entangleLoad();
        }
    }

    /**
     * Function _onInnerLoad() : Called on Inner dom loaded
     */
    _onInnerLoad() {
        if (debug) console.log(`${this.constructor.name}::_onInnerLoad()`);

        if (this.events.innerLoad) {
            this.events.innerLoad();
        }
    }

    /**
     * Function on() : Delcare event callback
     * 
     * @param {'entangleLoad'|'innerLoad'} event 
     * @param {{function()} } callback 
     */
    on(event, callback) {
        console.log(`${this.constructor.name}::on(event: '${event}'`);

        switch (event) {
            case 'entangleLoad': {
                this.events.entangleLoad = callback;
            } break;

            case 'innerLoad': {
                this.events.innerLoad = callback;
            } break;

            default:
                alert(`${this.constructor.name}::on() -> invalid event type: '${event}'`);
        }
    }

    /**
     * Function set() : Set's inner html
     * 
     * @param {string} innerHtml 
     */
    set(innerHtml) {
        if (debug) {
            console.log(`${this.constructor.name}::set() -> `);
            console.dir([innerHtml]);
        }

        this.innerHtml = innerHtml;

        this.render();
    }

    /***
     * Function append() : Append's inner html
     */
    append(innerHtml) {
        this.innerHtml += innerHtml;

        this.render();
    }

    /**
     * Function render() : Re-render inner dom.
     */
    render() {
        if (debug) console.log(`${this.constructor.name}::render()`);

        this.innerDom = $(this.innerHtml);

        this.innerDom.ready(() => this._onInnerLoad());

        this.entangleDom.empty();
        this.entangleDom.append(this.innerIntitalDom);
        this.entangleDom.append(this.innerDom);
    }
}