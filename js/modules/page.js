/**
 * @file: modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: 
 */

const debug = true;

export default class Page {

    /**
     * Function constructor() : Create Template 
     * 
     * @param {$} rootDom 
     */
    constructor(rootDom) {
        if (debug) {
            console.log(`${this.constructor.name}::constructor() -> `);
            console.dir(rootDom[0]);
        }

        this.events = {
            onReady: () => {},
        }

        this.innerHtml = '';
        this.innerDom = null;
        this.rootDom = rootDom;

        this.innerIntitalDom = $(this.rootDom.html());
    }

    /**
     * Function onLoad() : Called on Inner dom loaded
     */
    onReady() {
        if (debug) console.log(`${this.constructor.name}::onReady()`);
            
        this.events.onReady();
    }

    /**
     * function ready() : Set ready callback
     * @param {{function()} } callback 
     */
    ready(callback) {
        this.events.onReady = callback;
    }

    /**
     * Function set() : Set's inner html
     * 
     * @param {string} innerHtml 
     */
    set(innerHtml) {
        if (debug) console.log(`${this.constructor.name}::set('innerHtml: '${Boolean(innerHtml)}')`);

        this.innerHtml = innerHtml;

        this.render();
    }

    /**
     * Function render() : Re-render inner dom.
     */
    render() {
        if (debug) console.log(`${this.constructor.name}::render()`);

        this.innerDom = $(this.innerHtml);

        this.innerDom.ready(() => this.onReady());

        this.rootDom.empty();
        this.rootDom.append(this.innerIntitalDom);
        this.rootDom.append(this.innerDom);
    }
}