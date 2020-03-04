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

import Pagination from './catalog/pagination';
import Product from './catalog/product';

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
            onRecvOnce: () => {},
            onProductAdd: ( product ) => {},
        };
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Catalog';
    }

    initialize( options ) {
        super.initialize( options );

	    /**
	     * @type {Array.<Product>}
	     */
	    this.products = [];

        this.components = {
            pagination: new Pagination( this.view.element ),
        };
    }

    /**
     * Function onInitialRecv() : Called on success of intial getCatalog request
     */
    _onInitialRecv() {
        this.events.onRecvOnce();
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
     * @param {Product} product
     */
    _onProductAdd( product ) {
    	this.logger.startWith( { product } );

        // call callback
        this.events.onProductAdd( product );
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
	                    // TODO: Create function add product.
	                    const rowCatalog = this.view.element.children[ 0 ],
		                    productComponent = new Product( rowCatalog, {
			                    api: {
				                    catalog: this.apiCatalog,
			                    },
			                    ...product,
		                    } );

	                    productComponent.on( 'product:add', this._onProductAdd.bind( this ) );

	                    this.products.push( productComponent );
	                    // TODO: Stop extract.
                    } );

                    if ( onSuccess ) onSuccess();
                }
            } );
        }, page );
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

    afterRender() {
	    super.afterRender();

	    this.elements = {
		    catalog: {
			    self: $( '#catalog' ),
			    spinner: $( '#catalog .spinner' ),
		    },
	    };

	    this.elements.catalog.self.on( 'change', '.product .amount', (( e ) => this._onProductAmountChange( e )) );
	    //this.elements.catalog.self.on( 'click', '.product button', (( e ) => this._onProductAdd( e )) );

	    this._getCatalog( 0, this.onRecvOnce.bind( this ) );
    }

	onRecvOnce() {
		this.products.forEach( ( product ) => {
			product.render();
		} );

		this.events.onRecvOnce();
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
				this.events.onRecvOnce = callback;
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
}

export default Catalog;
