/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */
import './cart.css';

import CartController from './controller'

import $flow from "@appsflow/core";
import $mvc from "@appsflow/mvc";

/**
 * @name CartComponent
 * @extends {Component}
 */
export class Component extends $mvc.Component {
	static getName() {
		return 'Components/Cart/Component';
	}

	static getControllerClass() {
		return CartController;
	}

	initialize( options ) {
		this.model.on( 'change', this.onChange.bind( this ) );

		/**
		 * @type {import('@appsflow/core/src/modules/logger').Logger}
		 */
		this.logger = new ($flow.modules().Logger)( Component.getName(), true );

		options.logger = this.logger;

		// Determine View, if cart empty or not, re-render when empty-state changed, since JSx applied in `template()`.
		$flow.managers().internal.onAfterUI(
			'Components/Cart/Internal/UpdateTotal',
			( args, options ) => {
				if ( 0 === args.result ) {
					this.render();
				} else if ( args.result && ! this.prevResult ) {
					this.render();
				}

				this.prevResult = args.result;
			} );

		return super.initialize( options );
	}

	template() {
		// JSX Element callback applied on render.
		return () => {
			const isCartEmpty = !!! this.model.items.length,
				totalClass = isCartEmpty ? 'total' : 'total open';

			return <div class="cart">
				{isCartEmpty ? <h1 id="empty">Your cart is empty.</h1> : null}

				<ul class="items">
					<li class={totalClass}>
						<h2>TOTAL</h2>
						<h3><span class="price">{this.model.getTotal()}</span></h3>
					</li>
				</ul>

				{! isCartEmpty ?
					<button class="checkout bg-info"
					        onClick="$flow.managers().commands.run( 'Components/Cart/Commands/Checkout' )">CHECKOUT</button> : null}
			</div>

		}
	}

	/**
	 * Function onChange() : Called when cart model changed.
	 */
	onChange( statesSnapshot ) {
		this.logger.startWith( statesSnapshot );

		let { prevModel, currentModel } = statesSnapshot;

		if ( ! prevModel || ! currentModel ) {
			return;
		}

		if ( prevModel.state !== currentModel.state ) {
			this.onStateChange( this.model.state );
		}
	}

	onStateChange( state ) {
		state ? this.open() : this.close();
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
			item.view.element.getElement().style = 'animation: none';
		} );
	}

	render() {
		super.render();

		this.elements = {
			items: $mvc.Factory.createElementRef(
				'.cart .items',
				'Components/Cart/Component/Items'
			),
			totalPrice: $mvc.Factory.createElementRef(
				'.cart .total .price',
				'Components/Cart/Component/TotalPrice'
			),
		};

		this.model.items.forEach( ( component ) => {
			component.render();
		} );
	}
}

export default Component;
