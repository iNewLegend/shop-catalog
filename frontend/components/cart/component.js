/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart
 */
import './cart.css';

import Controller from './controller'
import Model from './model';

/**
 * @property {components.cart.Model} model
 */
export class Component extends $flow.modules.Component {
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
		this.model.on( 'change', this.onChange.bind( this ) );

		this.logger = new $flow.modules.Logger( Component.getName(), true );

		options.logger = this.logger;

		this.elements = {
			items: () => $flow.Factory.createElement( '.cart .items' ),
			totalPrice: () => $flow.Factory.createElement( '.cart .total .price' ),
		};

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
					        onClick="$flow.commands.run( 'Components/Cart/Commands/Checkout' )">CHECKOUT</button> : null}
			</div>
		}
	}

	/**
	 * Function onChange() : Called when cart model changed.
	 */
	onChange( statesSnapshot ) {
		this.logger.startWith( statesSnapshot )

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
			item.view.element.element.style = 'animation: none';
		} );
	}

	render() {
		super.render();

		this.model.items.forEach( ( component ) => {
			component.render();
		} );
	}
}

export default Component;
