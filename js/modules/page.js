/**
 * @file: js/modules/page.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Modules Namespace O__o
 */

import Logger from './logger.js';
import Services from '../services/services.js';

export default class Page {
    /**
     * @type Logger
     */
    logger = null;

    /**
     * @type Element
     */
    dom = null;
    
    /**
     * Function constructor() : Create page module 
     */
    constructor() {
        // not good.
        this.logger = new Logger(`Modules.Page`, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith(this.constructor.name);

        this.events = {
            onReady: (pageModule) => { },
        }
    }

    /**
     * Function onReady() : Called when this.dom is ready
     */
    onReady() {
        this.logger.startWith(this.constructor.name);

        this.events.onReady();

        if (this._onReady) {
            this._onReady();
        }
    }

    /**
     * function ready() : Set ready callback
     * 
     * @param {{function()}} callback 
     */
    ready(callback) {
        this.logger.startWith({ callback });

        this.events.onReady = callback;
    }

    /**
     * Function createElement() : Create and render element.
     */
    createElement() {
        if (this._render) {
            this.dom = $(this.render());

            return this.dom;
        }

        return null;
    }

    /**
     * Function destroyElement() : Destroy the element.
     */
    destroyElement() {
        if (this.dom) {
            this.dom.remove();
        }
    }

    /**
     * Render the element.
     */
    render() {
        const element = $(this._render());

        element.ready(this.onReady.bind(this))

        return $(`
            <div class="page">
            </div>
        `).append(element);
    }
}