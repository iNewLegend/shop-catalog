/**
 * @file: components/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */
import * as services from 'SERVICES';
import { Component, Logger } from 'MODULES';

import Pagination from './catalog/pagination';
import Product from './catalog/product';
import Spinner from './catalog/spinner';

/**
 * @memberOf components
 */
export class Catalog extends Component {
    static amountMaxValue = 999;
    static amountMinValue = 1;

    /**
     * Current page number.
     *
     * @type {number}
     */
    page = 0;

    /**
     * Loaded products to be rendered.
     *
     * @type {Array.<components.catalog.Product>}
     */
    products = [];

    constructor( parent, options ) {
        super( parent, options );

        this.events = {
            onRecvOnce: () => {},
            onProductAdd: ( product ) => {},
        };

        this.components = {
            pagination: new Pagination( this.view.element ),
        };
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Catalog';
    }

    initialize( options ) {
	    this.logger = new Logger( Catalog.getName(), true );
	    this.logger.setOutputHandler( services.Terminal.onOutput );
	    this.logger.startWith( { options } );

	    this.apis = {
		    catalog: options.api,
	    };

	    return super.initialize( options );
    }

	template() {
		return (`
            <div class="container" style="max-width: 1080px;">
                <div id="catalog" class="row">
                </div>
            </div>
        `);
	}

	render() {
		super.render();

		const { pagination, spinner } = this.components;

		spinner.render();

		pagination.render();
		pagination.on( 'page:change', this.onPageChange.bind( this ) );
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			row: this.view.element.children[ 0 ],
		};

		this.components.spinner = new Spinner( this.elements.row );

		this.getProducts( 0, this.onRecvOnce.bind( this ) );
	}

	/**
     * Function onPageChange() : Called on page change.
     *
     * @param {number} page
     */
    onPageChange( page ) {
        this.logger.startWith( { page } );

        const { spinner } = this.components;

        // Remove all products.
        this.products.forEach( ( product ) =>
            product.remove()
        );

        // Show spinner.
        spinner.show();

        this.getProducts( page - 1, () => {
            this.renderProducts();
        } );
    }

    /**
     * Function onProductAdd() : Called on "Add to cart button".
     *
     * @param {Product} product
     */
    onProductAdd( product ) {
        this.logger.startWith( { product } );

        // Call callback.
        this.events.onProductAdd( product );
    }

    /**
     * Function onProductAmountChange() : Called on "Product Amount Change".
     *
     * Function override amount ( Used as filter ).
     *
     * @param {components.catalog.Product} product
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
	 * Function onRecvOnce() : Called on success of initial getCatalog request.
	 */
	onRecvOnce() {
		this.renderProducts();

		this.events.onRecvOnce();
	}

    /**
     * Function addProduct() : Add's a product.
     *
     * Function Create product component and push it `this.products`.
     *
     * @param {components.catalog.Product} product
     *
     * @returns {components.catalog.Product}
     */
    addProduct( product ) {
        const productComponent = new Product( this.elements.row, {
            api: {
                catalog: this.apis.catalog,
            },

            logger: this.logger,

            ... product,
        } );

        productComponent.on( 'product:add', this.onProductAdd.bind( this ) );
        productComponent.on( 'product:change', this.onProductAmountChange.bind( this ) );

        this.products.push( productComponent );

        return productComponent;
    }

    /**
     * Function getProducts() : Get products from catalog endpoint.
     *
     * @param {number} page
     * @param {{function()}} onSuccess
     */
    getProducts( page, onSuccess ) {
        this.logger.startWith( { page, onSuccess } );

        const { spinner } = this.components;

        this.apis.catalog.get( data => {
            // Clear old products.
            this.products = [];

            // Used '1000' ms here to fake loading.
            spinner.fadeOut( 1000, () => {
                if ( !data.error ) {
                    this.components.pagination.set( data.pagination );

                    data.result.forEach( ( product ) =>
                        this.addProduct( product )
                    );

                    if ( onSuccess ) onSuccess();
                }
            } );
        }, page );
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
     * Function on() : Declare event callback.
     *
     * @param {'product:add','recv:once'|} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        switch ( event ) {
            case 'product:add':
            	return this.events.onProductAdd = callback;

            case 'recv:once':
            	return this.events.onRecvOnce = callback;
        }

        // Handle situations when there is require to call parent 'on' because this method is already the callback.
        return false;
    }
}

export default Catalog;
