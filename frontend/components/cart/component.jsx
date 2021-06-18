/**
 * @file: components/cart/component.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */
import './cart.css';

import Controller from './controller'
import Model from './model';

/**
 * @memberOf components.cart
 * @property {components.cart.Model} model
 */
export class Component extends $core.Component {
	static openCartOnUpdate = true;
	static reloadCartEachOpen = false; // Highlight of new cart item, while this option set to true, will not work.

	/**
	 * @inheritDoc
	 *
	 * @param {API.Cart} options.cart
	 * @param {API.Catalog} options.catalog
	 */
	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onCartRequest: () => {},
			onCartReceived: () => {},
			onAmountChange: ( amount ) => {},
			onStateEmpty: ( state ) => {},
			onCheckout: () => {}
		};
	}

	static getNamespace() {
		return 'Components/Cart'
	}

	static getName() {
		return 'Components/Cart/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	static getModelClass() {
		return Model;
	}

	initialize( options ) {
		this.logger = new $core.modules.Logger( Component.getName(), true );

		this.apiCatalog = options.catalog;

		options.logger = this.logger;

		return super.initialize( options );
	}

	template() {
		const isCartEmpty = !! this.model.items.length,
			totalToggleClass = isCartEmpty ? 'open' : '';

		return (
			<div class="cart">
				{ isCartEmpty || ( <h1 id="empty" style="text-align: center">Your cart is empty.</h1> ) }
				<ul class="items">
					<li class={`total ${ totalToggleClass }`}>
						<h2>TOTAL</h2>
						<h3>$<span class="price">{ this.model.getTotal() }</span></h3>
					</li>
				</ul>

				<button class="checkout bg-info" onclick="this.events.onCheckout()">CHECKOUT</button>
			</div>
		);
	}

	afterRender() {
		super.afterRender();

		this.logger.startEmpty();

		this.elements = {
			self: $core.Factory.createElement( 'div.cart' ),
			empty: $core.Factory.createElement( '.cart #empty' ),
			items: $core.Factory.createElement( '.cart .items' ),
			itemsTotal: $core.Factory.createElement( '.cart .items .total' ),
			totalPrice: $core.Factory.createElement( '.cart .total .price' ),
			checkout: $core.Factory.createElement( '.cart .checkout' )
		};

		this.model.on( 'change', this.onChange.bind( this ) );

		this.request();
	}

	/**
	 * Function onChange() : Called when cart changed
	 */
	onChange() {
		this.logger.startEmpty();

		const price = this.context.querySelector( '.price' )

		price.innerText = this.model.getTotal();

		this.efficientEmptyState( Boolean( this.model.items.length ) );

		this.events.onAmountChange( this.model.items.length );
	}

	/**
	 * Function request() : Request cart from server
	 */
	request() {
		this.logger.startEmpty();

		this.events.onCartRequest();

		// Clear toggle amount
		this.events.onAmountChange( 0 );

		// Clear visual cart.
		this.model.items.clear();

		$core.data.get( 'Components/Cart/Data/Index' );
	}

	/**
	 * Function open() :  Open the cart
	 */
	open() {
		this.logger.startEmpty();

		if ( Component.reloadCartEachOpen ) {
			this.request();
		}
	}

	/**
	 * Function close() : close the cart
	 */
	close() {
		this.logger.startEmpty();

		// Clear highlight.
		this.model.items.forEach( ( item ) => {
			item.view.element.element.style = 'animation: none';
		} );
	}

	/**
	 * Function efficientEmptyState() : Update when cart have items or not.
	 *
	 * @param {boolean} state
	 */
	efficientEmptyState( state ) {
		this.logger.startWith( { state } );

		const { empty, checkout, itemsTotal } = this.elements;

		if ( state ) {
			empty.hide();

			checkout.addClass( 'open' );
			itemsTotal.addClass( 'open' );
		} else {
			empty.show();

			checkout.removeClass( 'open' );
			itemsTotal.removeClass( 'open' );
		}

		this.events.onStateEmpty( state );
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'ui:checkout'|'cart:request'|'cart:received'|'amount:change'|'state:empty'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'ui:checkout':
				return this.events.onCheckout = callback;

			case 'cart:request':
				return this.events.onCartRequest = callback;

			case 'amount:change':
				return this.events.onAmountChange = callback;

			case 'state:empty':
				return this.events.onStateEmpty = callback;
		}

		return super.on( event, callback );
	}
}

export default Component;
