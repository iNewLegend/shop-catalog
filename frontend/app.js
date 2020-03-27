/**
 * @file: app.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Main File
 */
import "@babel/polyfill"

import * as core from 'CORE'
import * as api from 'API';
import * as modules from 'MODULES';
import * as services from 'SERVICES';
import * as components from 'COMPONENTS';
import * as pages from 'PAGES';

class App {
    /**
     * Function constructor() : Create App
     */
    constructor() {
        services.Terminal.initialize();

        this.logger = new modules.Logger( this, true );
        this.logger.setOutputHandler( services.Terminal.onOutput );

        this.logger.startEmpty();

        const remoteAddress = window.location.href.substring( 0, window.location.href.lastIndexOf( "/" ) ) + '/../api/?cmd=',
            http = new api.Http( remoteAddress );

        this.apis = {
            catalog: new api.Catalog( http ),
            cart: new api.Cart( http ),
        };

        this.elements = {
            header: {
                logo: core.Factory.createElement( 'header #logo' ),
                toggle: core.Factory.createElement( 'header #toggle' ),

                cart: core.Factory.createElement( 'header #toggle .cart' ),
                amount: core.Factory.createElement( 'header #toggle .amount' ),
                spinner: core.Factory.createElement( 'header #toggle .spinner' )
            },

            sidebar: {
                self: core.Factory.createElement( '#sidebar' ), // Self should not be exist, if you use self, it should be component.
                closeButton: core.Factory.createElement( '#sidebar #close' ),
            },

            overlay: core.Factory.createElement( '#overlay' ),

            sections: {
                main: $( "section.main" )[ 0 ]
            }
        };

        this.container = new core.Container( this.elements.sections.main, '<div class="page container"></div>' );

        this.pages = {
            catalog: new pages.Catalog( this.container, '<div class="pages catalog"></div>', {
                api: this.apis.catalog,
            } ),
            checkout: new pages.Checkout( this.container, '<div class="pages checkout">' +
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

        this.container.on( 'render:after', this._onContainerRender.bind( this ) );

        overlay.click( () => this.sidebarToggle( false ) );

        header.toggle.click( () => this.sidebarToggle( true ) );

        header.logo.click( () => {
            this.container.set( this.pages.catalog );
            this.container.render();
        } );

        sidebar.closeButton.click( () => this.sidebarToggle( false ) );

        this.container.set( this.pages.catalog );
        this.container.render();
    }

    /**
     * Function _onContainerReady() : Called when container ready.
     *
     * @param {modules.Page} pageModule
     */
    _onContainerRender( pageModule ) {
        this.logger.startWith( { pageModule: pageModule.constructor.name } );

        if ( pageModule instanceof pages.Catalog ) {
            this.pages.catalog.on( 'productAdd', this._onCatalogProductAdd.bind( this ) );

            if ( !this.cart ) {
                this.cart = new components.Cart( this.apis.cart, this.apis.catalog );

                this.cart.on( 'get', this._onCartGet.bind( this ) );
                this.cart.on( 'received', this._onCartReceived.bind( this ) );
                this.cart.on( 'amountChange', this._onCartAmountChange.bind( this ) );
                this.cart.on( 'emptyState', this._onCartEmptyState.bind( this ) );
                this.cart.on( 'checkout', this._onCartCheckout.bind( this ) );

                // TODO: should use 'this.elements.sidebar.self' instead of 'this.elements.sidebar.self.element'
                // TODO: FIX ASAP.
                this.cart.render( this.elements.sidebar.self.element );
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
    _onCartAmountChange( count ) {
        this.logger.startWith( { count } );

        const { amount } = this.elements.header;

        amount.html( count );
    }

    /**
     * Function _onCartEmptyState() : Called on cart empty state change (cart have items|cart does have items)
     *
     * @param {Boolean} state
     */
    _onCartEmptyState( state ) {
        this.logger.startWith( { state } );

        const { amount } = this.elements.header;

        state ? amount.show() : amount.hide();
    }

    /**
     * Function _onCartCheckout() : Called on cart checkout
     */
    _onCartCheckout() {
        this.logger.startEmpty();

        this.sidebarToggle( false );

        this.container.set( this.pages.checkout );

        this.pages.checkout.on( 'render:after', () => {
            console.log( 'onCartCheckout this.page.checkout rendered' );
        } );

        this.container.render();
    }

    /**
     * Function _onCatalogProductAdd() : Called on catalog item add
     */
    _onCatalogProductAdd( product ) {
        this.logger.startWith( { product } );

        this.cart.itemAdd( product, () => {
            if ( components.Cart.openCartOnUpdate ) {
                this.sidebarToggle( true );
            }
        } );
    }

    /**
     * Function sidebarToggle() : Change the sidebar state
     *
     * @param {boolean} state
     */
    sidebarToggle( state ) {
        this.logger.startWith( { state } );

        const { sidebar, overlay } = this.elements;

        if ( state ) {
            overlay.fadeIn();
            sidebar.self.addClass( 'show' );

            this.cart.open();
        } else {
            overlay.fadeOut();
            sidebar.self.removeClass( 'show' );

            this.cart.close();
        }
    }

}

(new App().initialize());
