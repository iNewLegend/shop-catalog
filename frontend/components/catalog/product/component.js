/**
 * @file: components/catalog/product/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit.
 */
import './product.css';
import Controller from './controller';

/**
 * @memberOf components.catalog
 */
export class Component extends $core.Component {
	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onProductAdd: ( product ) => {},
			onProductChange: ( product, amount ) => {},
		};
	}

	static getNamespace() {
		return 'Components/Catalog/Product'
	}

	static getName() {
		return 'Components/Catalog/Product/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		const { id, name, price } = this.options;

		/**
		 * Item id.
		 *
		 * @type {Number}
		 */
		this.id = id;

		/**
		 * Item name.
		 *
		 * @type {string}
		 */
		this.name = name;

		/**
		 * Price of current product.
		 *
		 * @type {number}
		 */
		this.price = price;

		/**
		 * @type {core.modules.Logger}
		 */
		this.logger = options.logger;

		// If parent logger 'Components/Catalog' passed, clone and extend its name.
		if ( this.logger ) {
			this.logger = this.logger.clone();
			this.logger.name = Component.getName() + '/' + id;

			this.logger.startWith( { id, name, price } );
		}

		this.apis = {
			catalog: options.api.catalog,
		}

		return super.initialize( options );
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			amount: this.view.element.element.querySelector( '.amount' ),
		}
	}

	template() {
		const { id, name, price } = this.options;

		return (`
				<div class="product">
					<img src="img/product-${id}.jpg" alt="product-${id}" />
					<h4 class="name color-secondary">${name}</h4>
					
					<div class="footer">
						<h5>Price: <span class="price">${price}$</span></h5>
						<div class="row">
							<button onclick="$core.commands.run( 'Components/Catalog/Product/Commands/Add', { component: this } );" class="bg-primary">Add To Cart</button>
							<input onchange="this.onProductChange( event )" class="amount" type="number" name="amount"	value="1" min="1">
						</div>
					</div>
				</div>
	    `);
	}

	onProductChange( e ) {
		if ( this.logger ) {
			this.logger.startWith( { e } );
		}

		const val = e.currentTarget.value;

		if ( this.logger ) {
			this.logger.debug( `val: '${val}'` );
		}

		this.events.onProductChange( this, parseInt( val ) );
	}

	setAmount( amount ) {
		if ( this.logger ) {
			this.logger.startWith( { amount } );
		}

		this.elements.amount.value = amount;
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'product:add'|'product:change'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		switch ( event ) {
			case 'product:add': {
				this.events.onProductAdd = callback;
			}
				break;

			case 'product:change': {
				this.events.onProductChange = callback;
			}
				break;

			default: {
				alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
	}
}

export default Component;
