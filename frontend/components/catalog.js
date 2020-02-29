/**
 * @file: components/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */
import * as services from 'SERVICES';
import {
    Component,
    Logger,
} from 'MODULES';

import Pagination from "./catalog/pagination";

/**
 * @memberOf components
 */
export class Catalog extends Component {
    static amountMaxValue = 999;
    static amountMinValue = 1;

    constructor( parent, options ) {
        super( parent, options );

        this.logger = new Logger( Catalog.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );

        this.logger.startWith( { parent, options } );

        /**
         * @type {API.Catalog}
         */
        this.apiCatalog = options.api;

        this.page = 0;

        this.events = {
            onInitialRecv: () => {},
            onProductAdd: ( product ) => {},
        };

        this.afterRender = () => {
            super.afterRender();

            this.elements = {
                catalog: {
                    self: $( '#catalog' ),
                    spinner: $( '#catalog .spinner' ),
                },
            };

            this.elements.catalog.self.on( 'change', '.product .amount', (( e ) => this._onProductAmountChange( e )) );
            this.elements.catalog.self.on( 'click', '.product button', (( e ) => this._onProductAdd( e )) );

            this._getCatalog( 0, this._onInitialRecv.bind( this ) );
        }
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Catalog';
    }

    initialize( options ) {
        super.initialize( options );

        this.components = {
            pagination: new Pagination( this.view.element ),
        };
    }

    /**
     * Function onInitialRecv() : Called on success of intial getCatalog request
     */
    _onInitialRecv() {
        this.events.onInitialRecv();
    }

    /**
     * Function _onPageChange() : Called on page change
     *
     * @param {number} page
     */
    _onPageChange( page ) {
        this.logger.startWith( { page } );

        const { catalog } = this.elements;

        --page;

        catalog.self.children( '.product' ).remove();
        catalog.spinner.show();

        this._getCatalog( page );
    }

    /**
     * Function _onProductAdd() : Called on "Add to cart button"
     *
     * @param {event} e
     */
    _onProductAdd( e ) {
        this.logger.startWith( { e } );

        // maybe there is better way.
        const el = $( e.currentTarget );
        const domProduct = el.parentsUntil( '.product' ).parent();

        const id = parseInt( domProduct.attr( 'data-id' ) );
        const amount = parseInt( domProduct.find( '.amount' ).val() );

        let product = this.apiCatalog.getLocalProductById( id );

        Object.assign( product, { id, amount } );

        // call callback
        this.events.onProductAdd( product );

        // put it back to 1.
        domProduct.find( '.amount' ).val( '1' );
    }

    /**
     * Function _onProductAmountChange() : Called on "Product Amount Change"
     *
     * @param {Event} e
     */
    _onProductAmountChange( e ) {
        this.logger.startWith( { e } );

        // maybe there is better way.
        const el = $( e.currentTarget );

        let val = el.val();

        this.logger.debug( `val: '${val}'` );

        if ( val > Catalog.amountMaxValue ) {
            val = Catalog.amountMaxValue;
        } else if ( val < Catalog.amountMinValue ) {
            val = Catalog.amountMinValue;
        }

        el.val( val );
    }

    /**
     * Function _getCatalog() : Get catalog from the server.
     *
     * @param {number} page
     * @param {{function()}} onSuccess
     */
    _getCatalog( page, onSuccess = null ) {
        this.logger.startWith( { page, onSuccess } );

        const { catalog } = this.elements;

        this.apiCatalog.get( data => {
            // used slow here to fake loading
            catalog.spinner.fadeOut( 'slow', () => {

                if ( !data.error ) {

                    this.components.pagination.set( data.pagination );

                    data.result.map( ( product ) => {
                        catalog.self.append( this.productTemplate( product ) );
                    } );

                    if ( onSuccess ) onSuccess();
                }
            } );
        }, page );
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'initialRecv'|'productAdd'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        switch ( event ) {
            case 'initialRecv': {
                this.events.onInitialRecv = callback;
            }
            break;

            case 'productAdd': {
                this.events.onProductAdd = callback;
            }
            break;

            default: {
                alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
            }
        }
    }

    /**
     * Function productTemplate() : Return html markup for product
     *
     * @param {{}} product
     */
    productTemplate( product ) {
        const { id, name, price } = product;

        return (`
            <div class="product" data-id="${id}">
                <img src="img/product-${id}.jpg">
                <h4 class="name color-secondary">${name}</h4>

                <div class="footer">
                    <h5>Price: <span class="price">${price}$</span></h5>
                    <div class="row">
                        <button class="bg-primary">Add To Cart</button>
                        <input class="amount" type="number" name="amount"
                            value="1" min="1">
                    </div>
                </div>
            </div>
        `)
    }

    template() {
        // TODO: spinner and pagination should be components.
        const markup = (`
            <div class="container" style="max-width: 1080px;">
                <div id="catalog" class="row">
                    <div class="spinner" style="border-top-color: lightskyblue"></div>
                </div>
            </div>
        `);

        return markup;
    }

    render() {
        super.render();

        this.components.pagination.render();

        this.components.pagination.on( 'page:change', this._onPageChange.bind( this ) );
    }
}

export default Catalog;
