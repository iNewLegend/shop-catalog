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

	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onCartRequest: () => {},
			onAmountChange: ( amount ) => {},
			onStateEmpty: ( state ) => {},
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

		options.logger = this.logger;

		return super.initialize( options );
	}

	template() {
		return (`
			<div class="cart">
				<h1 id="empty"  style="text-align: center">Your cart is empty.</h1>
				<ul class="items">
					<li class="total open">
						<h2>TOTAL</h2>
						<h3>$<span class="price">${ this.model.getTotal() }</span></h3>
					</li>
				</ul>

				<button class="checkout bg-info" onclick="$core.commands.run( 'Components/Cart/Commands/Checkout' )">CHECKOUT</button>
			</div>
		`);
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
	}

	/**
	 * Function onChange() : Called when cart model changed.
	 */
	onChange( statesSnapshot ) {
		this.logger.startEmpty();
		this.logger.object( statesSnapshot );

		const { prevModel } = statesSnapshot;

		if ( ! prevModel ) {
			this.onEmptyStateChange( this.model.items.length );

			return;
		}

		if ( prevModel.state !== this.model.state ) {
			this.onStateChange( this.model.state );
		}

		if ( statesSnapshot.currentModel.items?.__currentSnapshot !== prevModel.items?.__currentSnapshot ) {
			this.onItemsChange();
		}
	}

	onStateChange( state ) {
		state ? this.open() : this.close();
	}

	/**
	 * Function onItemsChange() : Update when cart items changed.
	 */
	onItemsChange() {
		this.logger.startEmpty();

		this.events.onAmountChange( this.model.items.length );

		let cartEfficientEmptyState = null;

		// Guess when the cart become empty or become full.
		if ( "undefined" === typeof this.itemEmptyState ) {
			cartEfficientEmptyState = !! this.model.items.length;
		} else if ( this.itemEmptyState !== !! this.model.items.length ) {
			cartEfficientEmptyState = !! this.model.items.length;
		}

		if ( null !== cartEfficientEmptyState ) {
			this.onEmptyStateChange( cartEfficientEmptyState )
		}

		this.itemEmptyState = cartEfficientEmptyState;

		this.setTotal();
	}

	onEmptyStateChange( state ) {
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
	 * Function request() : Request cart from server
	 */
	request() {
		this.logger.startEmpty();

		this.events.onCartRequest();

		// Clear toggle amount.
		this.events.onAmountChange( 0 );

		// Clear visual cart.
		this.model.items.clear();

		return $core.data.get( 'Components/Cart/Data/Index' );
	}

	/**
	 * Function open() :  Open the cart
	 */
	open() {
		this.logger.startEmpty();
	}

	/**
	 * Function close() : close the cart
	 */
	close() {
		this.logger.startEmpty();

		this.clearHighlight();
	}

	setTotal() {
		this.elements.totalPrice.element.innerText = this.model.getTotal();
	}

	clearHighlight() {
		// Clear highlight.
		this.model.items.forEach( ( item ) => {
			item.view.element.element.style = 'animation: none';
		} );
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'cart:request'|'amount:change'|'state:empty'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
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
