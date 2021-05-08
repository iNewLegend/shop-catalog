/**
 * @file: components/cart/item.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one item unit.
 */
import { Component } from 'MODULES';

/**
 * TODO: This is will be rule example of coding standards in terms of methods order.
 * @memberOf components.cart
 */
export class Item extends Component {
	/**
	 * @inheritDoc
	 *
	 * @param {modules.Logger} options.logger
	 */
	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onItemRemove: ( /* components.cart.Item */ item ) => {},
		}
	}

	static getNamespace() {
		return 'Components/Cart'
	}

	static getName() {
		return 'Components/Cart/Item';
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

		// TODO: Those should be at CLASS Level and not create in 'initialize' and they will work state like using model that hold them and who trigger the change of the state will be the controller.
		// How model will know about the change of them? easy 'the will start with '$' name and using proxy you will find out.
		this.id = id;
		this.name = name;
		this.price = price;
		this.amount = amount;

		this.logger = options.logger;

		// If parent logger 'Components/Cart' passed, clone and extend its name.
		// TODO: If this code is require and become duplicate over time hold a method to cover it. like `cloneWithName`.
		if ( this.logger ) {
			this.logger = this.logger.clone();
			this.logger.name = Item.getName() + '/' + id;

			this.logger.startWith( { id, name, price } );
		}

		return super.initialize( options );
	}

	template() {
		const { id, name, amount, price } = this,
			sum = (amount * price).toFixed( 2 );

		return (`
	            <li class="item" data-id="${id}">
	                <div class="thumbnail"><img alt="item" src="img/product-${id}.jpg" /></div>
	                <div class="info">
	                    <h2>${name}</h2>
	                    <button class="color-primary close" onclick="this.events.onItemRemove(this)">&times;</button>
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
		this.amount += amountOfItems;

		const { amount, sum } = this.elements;

		// TODO: Change via model.
		amount.innerHTML = this.amount;
		sum.innerHTML = ( parseFloat( this.getTotal().toString() ).toFixed( 2 ));
	}

	/**
	 * Function highlightItem() : highlight item in cart
	 *
	 */
	highlightItem() {
		// this.logger.startWith( { domItem } );

		this.view.element.element.style = 'animation: highlight 3s';
	}

	getTotal() {
		return this.amount * this.price;
	}

	/**
	 * Function on() : Declare event callback.
	 *
	 * @param {'item:remove'|} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		this.logger.startWith( { event, callback } );

		switch ( event ) {
			case 'item:remove':
				return this.events.onItemRemove = callback;
		}

		return false;
	}
}

export default Item;
