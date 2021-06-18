/**
 * @file: components/cart/item.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one item unit.
 */
import Controller from "COMPONENTS/cart/item/controller";
import Model from './model';

/**
 * @memberOf components.cart.item
 */
export class Component extends $core.Component {
	static getNamespace() {
		return 'Components/Cart/Item'
	}

	static getName() {
		return 'Components/Cart/Item/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	static getModelClass() {
		return Model;
	}

	/**
	 * @param {Object} options
	 * @param {number} options.id
	 * @param {string} options.name
	 * @param {number} options.price
	 * @param {string} options.amount
	 */
	initialize( options ) {
		const { id, name, price, amount } = options;

		this.model.id = id;
		this.model.name = name;
		this.model.price = price;
		this.model.amount = amount;

		this.logger = options.logger;

		// If parent logger 'Components/Cart' passed, clone and extend its name.
		// TODO: If this code is require and become duplicate over time hold a method to cover it. like `cloneWithName`.
		if ( this.logger ) {
			this.logger = this.logger.clone();
			this.logger.name = Component.getName() + '/' + id;

			this.logger.startWith( { id, name, price } );
		}

		return super.initialize( options );
	}

	template() {
		const { id, name, amount, price } = this.model,
			sum = (amount * price).toFixed( 2 );

		return (`
	            <li class="item" data-id="${id}">
	                <div class="thumbnail"><img alt="item" src="img/product-${id}.jpg" /></div>
	                <div class="info">
	                    <h2>${name}</h2>
	                    <button class="color-primary close" onclick="$core.commands.run( 'Components/Cart/Item/Commands/Remove', { virtualId: this.virtualId, model: this.model } )">&times;</button>
	                    <div class="amount-price">
	                        <span class="amount">${amount}</span> x <strong>${price}</strong>
	                        <p class="sum">$<span class="value">${sum}</span></p>
	                    </div>
	                </div>
	                <div class="clearfix"></div>
	            </li>
		`);
	}

	afterRender() {
		this.elements = {
			amount: this.view.element.element.querySelector( '.amount' ),
			sum: this.view.element.element.querySelector( '.sum .value' ),
		}
	}

	updateAmount( amountOfItems ) {
		// This method should not exist, model should handle it.
		// The model will act like a state.
		this.model.amount += amountOfItems;

		const { amount, sum } = this.elements;

		// TODO: Change via model.
		amount.innerHTML = this.model.amount;
		sum.innerHTML = (parseFloat( this.model.getTotal().toString() ).toFixed( 2 ));
	}

	/**
	 * Function highlightItem() : highlight item in cart
	 *
	 */
	highlightItem() {
		// this.logger.startWith( { domItem } );

		this.view.element.element.style = 'animation: highlight 3s';
	}
}

export default Component;
