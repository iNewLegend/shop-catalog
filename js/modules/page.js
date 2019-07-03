/**
 * @file: modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: 
 */

//import * as Services from '../services/terminal.js';
import * as Modules from '../modules/logger.js';

export default class Page {

    /**
     * Function constructor() : Create Template 
     * 
     * @param {$} rootDom 
     */
    constructor(rootDom) {
        this.logger = new Modules.Logger(this, true);
        //this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith({ rootDom });

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
        this.logger.startEmpty()
            
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
        this.logger.startWith({ innerHtml });

        this.innerHtml = innerHtml;

        this.render();
    }

    /**
     * Function render() : Re-render inner dom.
     */
    render() {
        this.logger.startEmpty()

        this.innerDom = $(this.innerHtml);

        this.innerDom.ready(() => this.onReady());

        this.rootDom.empty();
        this.rootDom.append(this.innerIntitalDom);
        this.rootDom.append(this.innerDom);
    }
}