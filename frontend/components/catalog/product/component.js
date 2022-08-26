/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages one product unit.
 */
import './product.css';
import Controller from './controller';
import { getComponent } from "@appflux/mvc";

/* global $flow */

/**
 * @name CatalogProductComponent
 * @extends {Component}
 */
export class Component extends getComponent() {
	static getName() {
		return 'Components/Catalog/Product/Component';
	}

	static getControllerClass() {
		return Controller;
	}

	constructor( parent, options ) {
		super( parent, options );

		this.events = {
			onProductChange: ( product, amount ) => {},
		};
	}

	initialize( options ) {
		const { id, name, price } = this.options;

		this.model.id = id;
		this.model.name = name;
		this.model.price = price;

		return super.initialize( options );
	}

	afterRender() {
		super.afterRender();

		this.elements = {
			amount: this.getView().element.getElement().querySelector( '.amount' ),
		}
	}

	template() {
		const { id, name, price } = this.model;

		return (`
				<div class="product">
					<img src="img/product-${id}.jpg" alt="product-${id}" />
					<h4 class="name color-secondary">${name}</h4>
					
					<div class="footer">
						<h5>Price: <span class="price">${price}$</span></h5>
						<div class="row">
							<button onclick="$flow.managers.commands.run( 'Components/Catalog/Product/Commands/Add', { component: this } );" class="bg-primary">Add To Cart</button>
							<input onchange="this.onProductChange( event )" class="amount" type="number" name="amount"	value="1" min="1">
						</div>
					</div>
				</div>
	    `);
	}

	onProductChange( e ) {
		const val = e.currentTarget.value;

		this.events.onProductChange( this, parseInt( val ) );
	}

	/**
	 * Function on() : Declare event callback
	 *
	 * @param {'product:change'} event
	 * @param {{function()}} callback
	 */
	on( event, callback ) {
		switch ( event ) {
			case 'product:change': {
				this.events.onProductChange = callback;
			}
			break;

			default: {
				throw new Error( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
			}
		}
	}

	setAmount( amount ) {
		this.elements.amount.value = amount;
	}
}

export default Component;
