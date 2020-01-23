/**
 * @file: js/app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */
import "@babel/polyfill"

import * as Core from 'CORE'
import API from 'API';
import Modules from 'MODULES';
import Services from 'SERVICES';
import Components from 'COMPONENTS';
import Pages from 'PAGES';


class App {
    /**
     * Function constructor() : Create App
     */
    constructor() {
        Services.Terminal.initialize();

        this.logger = new Modules.Logger(this, true);
        this.logger.setOutputHandler(Services.Terminal.onOutput);

        this.logger.startEmpty();

        const remoteAddress = window.location.href.substring(0, window.location.href.lastIndexOf("/")) + '/../api/?cmd=',
            http = new API.Http(remoteAddress);

        this.apis = {
            catalog: new API.Catalog(http),
            cart: new API.Cart(http),
        }

        this.elements = {
            header: {
                logo: Core.Factory.createElement('header #logo'),
                toggle: Core.Factory.createElement( 'header #toggle'),

                cart: Core.Factory.createElement('header #toggle .cart'),
                amount: Core.Factory.createElement('header #toggle .amount'),
                spinner: Core.Factory.createElement('header #toggle .spinner')
            },

            sidebar: {
                self: Core.Factory.createElement('#sidebar'), // Self should not be exist, if you use self, it should be component.
                closeButton: Core.Factory.createElement('#sidebar #close'),
            },

            overlay: $('#overlay'),

            sections: {
                main: $("section.main")[ 0 ]
            }
        }

	    this.container = new Core.Container(this.elements.sections.main, '<div class="page container"></div>');

	    this.pages = {
		    catalog: new Pages.Catalog( this.container, '<div class="pages catalog"></div>', {
			    api: this.apis.catalog,
		    } ),
		    checkout: new Pages.Checkout( this.container, '<div class="pages checkout">' +
			    '   <h1>Check OUT.</h1>' +
			    '</div>'
		    ),
	    }
    }

    /**
     * Function initialize() : Initialize App
     */
    initialize() {
        this.logger.startEmpty();

        const { header, overlay, sidebar } = this.elements;

	    this.container.on('render', this._onContainerRender.bind(this));

        overlay.click(() => this.sidebarToggle(false));

        header.toggle.click(() => this.sidebarToggle(true));

        header.logo.click(() => {
        	// TODO: Handle with view, when container will be view, then you will have extend page-container view, and extend it like this page-container.set( page ) // auto render.
	        this.container.set(this.pages.catalog)
	        this.container.render();
        });

        sidebar.closeButton.click(() => this.sidebarToggle(false));

	    this.container.set(this.pages.catalog);
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

                // TODO: should use 'this.elements.sidebar.self' instead of 'this.elements.sidebar.self.element'
                // TODO: FIX ASAP.
                this.cart.render(this.elements.sidebar.self.element);
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

        this.pages.checkout.on( 'render', () => {
        	console.log( 'onCartCheckout this.page.checkout rendered');
        } );

        this.container.render();
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
