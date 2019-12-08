/**
 * @file: js/app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */

import API from './api/api.js';
import Modules from './modules/modules.js';
import Services from './services/services.js';
import Components from './components/components.js';
import Pages from './pages/pages.js';

class App {
    /**
     * Function constructor() : Create App
     */
    constructor() {
        Services.Terminal.initialize();

        this.logger = new Modules.Logger(this, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startEmpty();

        const remoteAddress = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/api/?cmd=',
            http = new API.Http(remoteAddress);

        this.apis = {
            catalog: new API.Catalog(http),
            cart: new API.Cart(http),
        }

        this.elements = {
            header: {
                logo: $('header #logo'),
                toggler: $('header #toggler'),

                cart: $('header #toggler .cart'),
                amount: $('header #toggler .amount'),
                spinner: $('header #toggler .spinner')
            },

            sidebar: {
                self: $('#sidebar'),
                closeButton: $('#sidebar #close'),
            },

            overlay: $('#overlay'),

            sections: {
                main: $("section.main")[ 0 ]
            }
        }

        this.container = new Modules.PageContainer(this.elements.sections.main, '<div class="page container"></div>');

        this.container.on('render', this._onContainerRender.bind(this));

        this.pages = {
            catalog: new Pages.Catalog( this.container, '<div class="_Pages.Catalog"></div>', {
                api: this.apis.catalog,
            } ),
            checkout: new Pages.Checkout( this.container, '<div class="_Pages.Checkout"><h1>Check OUT.</h1></div>')
        }
    }

    /**
     * Function initialize() : Initialize App
     */
    initialize() {
        this.logger.startEmpty();

        const { header, overlay, sidebar } = this.elements;

        overlay.click(() => this.sidebarToggle(false));

        header.toggler.click(() => this.sidebarToggle(true));

        header.logo.click(() => this.container.set(this.pages.catalog));

        sidebar.closeButton.click(() => this.sidebarToggle(false));

        this.container.setChild(this.pages.catalog);

        this.container.render();
    }

    /**
     * Function _onContainerReady() : Called when container ready.
     *
     * @param {Modules.Page} pageModule
     */
    _onContainerRender(pageModule) {
        this.logger.startWith({ pageModule: pageModule.constructor.name });

        if (pageModule instanceof Pages.Catalog) {
            this.pages.catalog.on('productAdd', this._onCatalogProductAdd.bind(this));

            if (! this.cart) {
                this.cart = new Components.Cart(this.apis.cart, this.apis.catalog);

                this.cart.on('get', this._onCartGet.bind(this));
                this.cart.on('received', this._onCartReceived.bind(this));
                this.cart.on('amountChange', this._onCartAmountChange.bind(this));
                this.cart.on('emptyState', this._onCartEmptyState.bind(this));
                this.cart.on('checkout', this._onCartCheckout.bind(this));

                this.cart.render(this.elements.sidebar.self[0]);
            }
        }
    }

    /**
     * Function _onCartGet() : Called on request cart from the server
     */
    _onCartGet() {
        this.logger.startEmpty();

        const { spinner } = this.elements.header;

        spinner.show();
    }

    /**
     * Function _onCartReceived() : Called after cart received
     */
    _onCartReceived() {
        this.logger.startEmpty();

        const { cart, spinner } = this.elements.header;

        cart.show();
        spinner.hide();
    }

    /**
     * Function _onCartAmountChange() : Called on cart amount change.
     *
     * @param {Number} count
     */
    _onCartAmountChange(count) {
        this.logger.startWith({ count });

        const { amount } = this.elements.header;

        amount.html(count);
    }

    /**
     * Function _onCartEmptyState() : Called on cart empty state change (cart have items|cart does have items)
     *
     * @param {Boolean} state
     */
    _onCartEmptyState(state) {
        this.logger.startWith({ state });

        const { amount } = this.elements.header;

        state ? amount.show() : amount.hide();
    }

    /**
     * Function _onCartCheckout() : Called on cart checkout
     */
    _onCartCheckout() {
        this.logger.startEmpty();

        this.sidebarToggle(false);

        this.container.set(this.pages.checkout);
        this.pages.checkout.ready(function onCheckoutLoaded() {
            this.logger.debug(`i was loaded`);
        }.bind(this));
    }

    /**
     * Function _onCatalogProductAdd() : Called on catalog item add
     */
    _onCatalogProductAdd(product) {
        this.logger.startWith({ product });

        this.cart.itemAdd(product, () => {
            if (Components.Cart.openCartOnUpdate) {
                this.sidebarToggle(true);
            }
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
        } else {
            overlay.fadeOut();
            sidebar.self.removeClass('show');

            this.cart.close();
        }
    }

}

(new App().initialize());
