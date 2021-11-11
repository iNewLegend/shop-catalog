/**
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
export class Component extends ( $core.Component ) {
	static openCartOnUpdate = true;

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
		const { prevModel } = statesSnapshot;

		if ( ! prevModel ) {
			// In cases the cart empty from the beginning.
			return $core.internal.run( 'Components/Cart/Internal/ToggleEmptyState', {
				state: !! this.model.items.length
			} );
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

		let cartEfficientEmptyState = null;

		// Guess when the cart become empty or become full or not changed = null.
		if ( "undefined" === typeof this.itemEmptyState ) {
			cartEfficientEmptyState = !! this.model.items.length;
		} else if ( this.itemEmptyState !== !! this.model.items.length ) {
			cartEfficientEmptyState = !! this.model.items.length;
		}

		if ( null !== cartEfficientEmptyState ) {
			$core.internal.run( 'Components/Cart/Internal/ToggleEmptyState', {
				state: cartEfficientEmptyState
			} );
		}

		this.itemEmptyState = cartEfficientEmptyState;

		$core.internal.run( 'Components/Cart/Internal/UpdateTotal' );
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

	clearHighlight() {
		// Clear highlight.
		this.model.items.forEach( ( item ) => {
			item.view.element.element.style = 'animation: none';
		} );
	}
}

export default Component;
