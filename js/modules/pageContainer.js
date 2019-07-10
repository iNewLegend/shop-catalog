/**
 * @file: js/modules/pageContainer.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: used to mange pages
 * @todo find wise alternative
 */

import Services from '../services/services.js';
import Modules from './modules.js';

export default class PageContainer {

    /**
     * Function constructor() : Create Template Module 
     * 
     * @param {$} rootDom 
     */
    constructor(rootDom) {
        this.logger = new Modules.Logger(`Modules.${this.constructor.name}`, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startWith({ rootDom });

        this.events = {
            onReady: (pageModule) => { },
        }

        /** @type {Modules.Page} */
        this.pageModule = null;

        this.rootDom = rootDom;
    }

    /**
     * Function onLoad() : Called on Inner dom loaded
     */
    onReady() {
        this.logger.startEmpty()

        this.events.onReady(this.pageModule);
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
     * Function set() : Set's pageModule
     * 
     * @param {Modules.Page} pageModule 
     */
    set(pageModule) {
        this.logger.startWith({ pageModule: pageModule.constructor.name });

        if (this.pageModule) {
            this.pageModule.destroyElement();
        }

        this.pageModule = pageModule;

        if (pageModule instanceof Modules.Page) {
            this.render();
        } else {
            this.logger.throw(`pageModule: is not instance of: 'Modules.Page`, 'pageModule', pageModule);
        }
    }

    /**
     * Function render() : Re-render inner dom.
     */
    render() {
        this.logger.startEmpty()
        
        const element = this.pageModule.createElement();

        element.ready(this.onReady.bind(this));

        this.rootDom.empty();
        this.rootDom.append(element);
    }
}