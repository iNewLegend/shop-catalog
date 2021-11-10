/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */
import Pagination from './pagination/pagination';
import Product from './product/component';
import Spinner from './spinner/spinner';
import Controller from './controller';
import Model from './model';

/**
 * @memberOf components.catalog
 */
export class Comonent extends ( $core.Component ) {
	static amountMaxValue = 999;
	static amountMinValue = 1;

	static getName() {
		return 'Components/Catalog/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	static getModelClass() {
		return Model
	}

	initialize( options ) {
		this.logger = new $core.modules.Logger( Comonent.getName(), true, { sameColor: true } );
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

	afterRender() {
		super.afterRender();

		this.elements = {
			row: this.view.element.children[ 0 ],
		};

		this.components = {
			pagination: new Pagination( this.view.element ),
			spinner: new Spinner( this.elements.row ),
		};

		const { pagination, spinner } = this.components;

		spinner.render();

		pagination.render();

		pagination.on( 'page:change', ( page ) => {
			$core.data.get( 'Components/Catalog/Data/Index', { page: page - 1 } )
				.then( this.onCatalogReceived.bind( this ) );
		});

		$core.data.get( 'Components/Catalog/Data/Index', { page: 0 } )
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
	 * @param {components.catalog.product.Component.Component} product
	 * @param {number} amount
	 */
	onProductAmountChange( product, amount ) {
		this.logger.startWith( { amount } );

		if ( amount > Comonent.amountMaxValue ) {
			amount = Comonent.amountMaxValue;
		} else if ( amount < Comonent.amountMinValue ) {
			amount = Comonent.amountMinValue;
		}

		product.setAmount( amount );
	}

	/**
	 * Function addProduct() : Add's a product.
	 *
	 * Function Create product component and push it `this.products`.
	 *
	 * @param {components.catalog.product.Component} product
	 *
	 * @returns {components.catalog.product.Component}
	 */
	addProduct( product ) {
		const productComponent = new Product( this.elements.row, {
			api: {
				catalog: this.apis.catalog,
			},

			logger: this.logger,

			...product,
		} );

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

export default Comonent;
