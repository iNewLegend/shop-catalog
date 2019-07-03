/**
 * @file: js/app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
import API from './api/api.js';
import API_Catalog from './api/catalog.js';
import API_Cart from './api/cart.js';


import Page from './modules/page.js';

import Catalog from './catalog.js';
import Cart from './cart.js';

import * as Services from './services/terminal.js';
import * as Modules from './modules/logger.js';

//import Logger from './services/terminal.js'

const debug = true;

class App {
    static openCartOnUpdate = true;

    /**
     * Function constructor() : Create App
     */
    constructor() {
        // change to Services.Terminal.Initalize();
        this.services = {
            terminal: new Services.Terminal()
        };
        
        this.logger = new Modules.Logger(this, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startEmpty();

        const remoteAdress = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/api/?cmd='

        const api = new API(remoteAdress);

        this.apis = {
            catalog: new API_Catalog(api),
            cart: new API_Cart(api),
        }
        

        this.elements = {
            header: {
                toggler: $('header #toggler')
            },

            sidebar: {
                self: $('#sidebar'),
                closeButton: $('#sidebar #close'),
            },

            overlay: $('#overlay'),

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

        this.page = new Page(this.elements.sections.main);
    }

    /**
     * Function initialize() : Initialize App
     */
    initialize() {
        this.logger.startEmpty();

        const { header, overlay, sidebar, template } = this.elements;

        overlay.click(() => this.sidebarToggle(false));

        header.toggler.click(() => this.sidebarToggle(true));
        
        sidebar.closeButton.click(() => this.sidebarToggle(false));

        this.page.set(template.page.main.html());
        this.page.ready(this.onCatalogLoad.bind(this));
    }

    /**
     * Function onCatalogLoad() : Called on catalog load
     */
    onCatalogLoad() {
        this.logger.startEmpty();

        this.catalog = new Catalog(this.apis.catalog);
        this.catalog.on('initialize', this.onCatalogInitialize.bind(this));
        this.catalog.on('itemAdd', this.onCatalogItemAdd.bind(this));

        this.catalog.initialize();
    }

    /**
     * Function onCatalogInitialize() : Called on catalog Initialized
     */
    onCatalogInitialize() {
        this.logger.startEmpty();

        this.cart = new Cart(this.apis.cart, this.apis.catalog);
        this.cart.on('checkout', this.onCartCheckout.bind(this));
        this.cart.initialize();
    }

    /**
     * Function onCatalogItemAdd() : Called on catalog item add
     */
    onCatalogItemAdd(product) {
        this.logger.startWith({ product });

        this.cart.itemAdd(product, () => {
            if (App.openCartOnUpdate) {
                this.sidebarToggle(true);
            }
        });
    }

    /**
     * Function onCartCheckout() : Called on cart checkout
     */
    onCartCheckout() {
        this.logger.startEmpty();

        this.sidebarToggle(false);

        const { template } = this.elements;

        this.page.set(template.page.checkout.html());
        this.page.ready(() => {
            if (debug) console.log(`${this.constructor.name}::onCheckout() -> load !`);
        });
    }

    /**
     * Function sidebarToggle() : Change the sidebar state
     * 
     * @param {boolean} state 
     */
    sidebarToggle(state) {
        this.logger.startWith({ state });

        const { sidebar, overlay } = this.elements;

        if (state) {
            overlay.fadeIn();
            sidebar.self.addClass('show');

            this.cart.open();

            return;
        }

        overlay.fadeOut();
        sidebar.self.removeClass('show');

        this.cart.close();
    }

}

(new App().initialize());