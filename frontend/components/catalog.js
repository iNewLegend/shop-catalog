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

        this.logger.startWith( { options } );

        /**
         * @type {API.Catalog}
         */
        this.apiCatalog = options.api;

	    /**
	     * @type {Array.<components.Product>}
	     */
	    this.products = [];

	    this.page = 0;

        this.events = {
            onRecvOnce: () => {},
            onProductAdd: ( product ) => {},
        };

        this.components = {
	        pagination: new Pagination( this.view.element ),
        };

	    this.afterRender = () => {
		    super.afterRender();

		    this.elements = {
			    catalog: {
				    self: $( '#catalog' ),
				    spinner: $( '#catalog .spinner' ),
			    },
		    };

		    this.getProducts( 0, this.onRecvOnce.bind( this ) );
	    }
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Catalog';
    }

    /**
     * Function onPageChange() : Called on page change
     *
     * @param {number} page
     */
    onPageChange( page ) {
        this.logger.startWith( { page } );

        const { catalog } = this.elements;

        --page;

        catalog.self.children( '.product' ).remove();
        catalog.spinner.show();

        this.getProducts( page, () => {
	        this.renderProducts();
        } );
    }

    /**
     * Function onProductAdd() : Called on "Add to cart button"
     *
     * @param {Product} product
     */
    onProductAdd( product ) {
    	this.logger.startWith( { product } );

        // call callback
        this.events.onProductAdd( product );
    }

    /**
     * Function onProductAmountChange() : Called on "Product Amount Change".
     *
     * @param {components.Product} product
     * @param {number} amount
     */
    onProductAmountChange( product, amount ) {
        this.logger.startWith( { amount } );

        if ( amount > Catalog.amountMaxValue ) {
            amount = Catalog.amountMaxValue;
        } else if ( amount < Catalog.amountMinValue ) {
            amount = Catalog.amountMinValue;
        }

	    product.setAmount( amount );
    }

	/**
	 * Function addProduct() : Add's a product.
	 *
	 * @param {Product} product
	 *
	 * @returns {Product}
	 */
	addProduct( product ) {
	    const rowCatalog = this.view.element.children[ 0 ],
		    productComponent = new Product( rowCatalog, {
			    api: {
				    catalog: this.apiCatalog,
			    },
			    ...product,
		    } );

	    productComponent.on( 'product:add', this.onProductAdd.bind( this ) );
	    productComponent.on( 'product:change', this.onProductAmountChange.bind( this ) );

	    this.products.push( productComponent );

		return productComponent;
    }

    /**
     * Function getCatalog() : Get catalog from the server.
     *
     * @param {number} page
     * @param {{function()}} onSuccess
     */
    getProducts( page, onSuccess ) {
        this.logger.startWith( { page, onSuccess } );

        const { catalog } = this.elements;

        this.apiCatalog.get( data => {
        	// Clear old products.
	        this.products = [];

            // Used 'slow' here to fake loading.
            catalog.spinner.fadeOut( 'slow', () => {
                if ( ! data.error ) {
                    this.components.pagination.set( data.pagination );

                    data.result.forEach( ( product ) =>
	                    this.addProduct( product )
                    );

                    if ( onSuccess ) onSuccess();
                }
            } );
        }, page );
    }

    template() {
        // TODO: spinner should be component.
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
    	const { pagination } = this.components;

    	super.render();

    	pagination.render();
	    pagination.on( 'page:change', this.onPageChange.bind( this ) );
    }

	/**
	 * Function renderProducts() : Render products.
	 */
	renderProducts() {
	    this.products.forEach( ( product ) => {
		    product.render();
	    } );
    }

	/**
	 * Function onRecvOnce() : Called on success of initial getCatalog request
	 */
	onRecvOnce() {

	    this.renderProducts();

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
