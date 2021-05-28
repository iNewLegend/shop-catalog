/**
 * @file: api/cart.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 */
import * as services from 'SERVICES';

/**
 * @memberOf API
 */
export class Cart {
	/**
	 * Function constructor() Create Cart Api
	 *
	 * @param {Http} http
	 */
	constructor( http ) {
		this.logger = new $core.modules.Logger( Cart.getName(), true );
		this.logger.setOutputHandler( services.Terminal.onOutput );

		this.logger.startWith( { http } );

		this.http = http;
	}

	static getNamespace() {
		return 'API'
	}

	static getName() {
		return 'API/Cart';
	}

	/**
	 * Function get() : Get cart
	 *
	 * @param {{function()}} callback
	 */
	get( callback ) {
		this.logger.startWith( { callback } );

		this.http.get( 'cart/index' ).then( data => callback( data ) );
	}

	/**
	 * Function addItem() : Add item to cart
	 *
	 * @param {{function()}} callback
	 * @param {number} id
	 * @param {number} amount
	 */
	addItem( callback, id, amount = 1 ) {
		this.logger.startWith( { callback, id, amount } );

		const params = { id, amount };

		this.http.post( 'cart/addItem', params ).then( ( data ) => callback( data ) );
	}

	/**
	 * Function removeItem() : Remove item from cart
	 *
	 * @param {{function()}} callback
	 * @param {number} id
	 */
	removeItem( callback, id ) {
		this.logger.startWith( { callback, id } );

		this.http.post( 'cart/removeItem', { id } ).then( ( data ) => callback( data ) );
	}
}

export default Cart;
