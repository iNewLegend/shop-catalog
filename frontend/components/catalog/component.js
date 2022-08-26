/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */
import Pagination from './pagination/pagination';
import CatalogProductComponent from './product/component';
import Spinner from './spinner/spinner';
import Controller from './controller';
import { getComponent } from "@appflux/mvc";

/* global $flow */

/**
 * @name CatalogComponent
 */
export class Component extends getComponent() {
	static amountMaxValue = 999;
	static amountMinValue = 1;

	static getName() {
		return 'Components/Catalog/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		this.logger = new $flow.modules.Logger( Component.getName(), true, { sameColor: true } );
		this.logger.startWith( { options } );

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

	afterRender() {
		super.afterRender();

		this.elements = {
			row: this.getView().element.children[ 0 ],
		};

		this.components = {
			pagination: new Pagination( this.getView().element ),
			spinner: new Spinner( this.elements.row ),
		};

		const { pagination, spinner } = this.components;

		spinner.render();

		pagination.render();

		pagination.on( 'page:change', ( page ) => {
			$flow.managers.data.get( 'Components/Catalog/Data/Index', { page: page - 1 } )
				.then( this.onCatalogReceived.bind( this ) );
		} );

		$flow.managers.data.get( 'Components/Catalog/Data/Index', { page: 0 } )
			.then( this.onCatalogReceived.bind( this ) );
	}

	onCatalogReceived( data ) {
		this.model.products.clear();

		const { spinner, pagination } = this.components;

		spinner.fadeOut();

		pagination.set( data.pagination );

		data.result.forEach( ( product ) =>
			this.addProduct( product )
		);

		this.renderProducts();
	}

	/**
	 * Function onProductAmountChange() : Called on "Product Amount Change".
	 *
	 * Function override amount ( Used as filter ).
	 *
	 * @param {CatalogProductComponent} product
	 * @param {number} amount
	 */
	onProductAmountChange( product, amount ) {
		this.logger.startWith( { amount } );

		if ( amount > Component.amountMaxValue ) {
			amount = Component.amountMaxValue;
		} else if ( amount < Component.amountMinValue ) {
			amount = Component.amountMinValue;
		}

		product.setAmount( amount );
	}

	/**
	 * Function addProduct() : Adds a product.
	 *
	 * Function Create product component and push it `this.products`.
	 *
	 * @param {CatalogProductComponent} product
	 *
	 * @returns {CatalogProductComponent}
	 */
	addProduct( product ) {
		const productComponent = new CatalogProductComponent( this.elements.row, product );

		productComponent.on( 'product:change', this.onProductAmountChange.bind( this ) );

		this.model.products.push( productComponent );

		return productComponent;
	}

	/**
	 * Function renderProducts() : Render products.
	 */
	renderProducts() {
		this.model.products.forEach( ( product ) => {
			product.render();
		} );
	}
}

export default Component;
