/**
 * @file: js/app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */

import API from './api/api.js';
import Catalog from './catalog.js';

import Template from './modules/template.js';

const debug = true;

class App {
    constructor() {
        if (debug) console.log(`${this.constructor.name}::constructor()`);

        const remoteAdress = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/api/?cmd='

        this.api = new API(remoteAdress);

        this.elements = {
            sections: {
                main: $("section.main")
            },

            template: {
                page: {
                    main: $('template#page-main'),
                    checkout: $('template#page-checkout')
                }
            }
        }
        
        this.mainTemplate = new Template(this.elements.sections.main);
    }

    initialize() {
        if (debug) console.log(`${this.constructor.name}::initialize()`);

        const { template } = this.elements;

        this.mainTemplate.set(template.page.main.html());
        this.mainTemplate.on('innerLoad', () => {
            const catalog = new Catalog(this.api);
            
            catalog.on('checkout', this.onCheckout.bind(this));
            catalog.initialize();
        });
    }

    onCheckout() {
        if (debug) console.log(`${this.constructor.name}::onCheckout()`);

        const { template } = this.elements;

        this.mainTemplate.set(template.page.checkout.html());
        this.mainTemplate.on('innerLoad', () => {
            if (debug) console.log(`${this.constructor.name}::onCheckout() -> innerLoad !`);
        });
    }
}

(new App().initialize());