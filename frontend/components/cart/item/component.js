/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one item unit.
 */
import Controller from './controller';

import $mvc from "@appsflow/mvc";

/**
 * @property {Model} model
 */
export class Component extends $mvc.Component {
	static getName() {
		return 'Components/Cart/Item/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	initialize( options ) {
		const { id, name, price, amount } = options;

		this.model.id = id;
		this.model.name = name;
		this.model.price = price;
		this.model.amount = amount;

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
	                    <button class="color-primary close" onclick="$flow.managers().commands.run( 'Components/Cart/Item/Commands/Remove', { model: this.model } )">&times;</button>
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
			amount: this.getView().element.getElement().querySelector( '.amount' ),
			sum: this.getView().element.getElement().querySelector( '.sum .value' ),
		}

		this.model.on( 'change', this.onChange.bind( this ) );
	}

	onChange( states ) {
		if ( ! states.prevModel ) {
			return;
		}

		if ( states.currentModel.amount !== states.prevModel.amount ) {
			$flow.managers().internal.run( 'Components/Cart/Item/Internal/UpdateAmount', {
				component: this,
				amount: states.currentModel.amount,
				sum: this.model.getTotal(),
			} );
		}
	}

	/**
	 * Function highlightItem() : highlight item in cart
	 *
	 */
	highlightItem() {
		this.getView().element.getElement().style = 'animation: highlight 3s';
	}
}

export default Component;
