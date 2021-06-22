/**
 * @file: components/cart/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart items/data.
 */

/**
 * @memberOf components.cart
 */
export default class Model extends ( $core.Model ) {
	static getNamespace() {
		return 'Components/Cart'
	}

	static getName() {
		return 'Components/Cart/Model';
	}

	/**
	 * Loaded items to be rendered.
	 *
	 * @type {ArrayClass.<components.cart.item.Component>}
	 */
	items = this.array();

	/**
	 * Function getById() : Get Item key from cart by id.
	 *
	 * @param {number} id
	 *
	 * @returns {components.cart.item.Component}
	 */
	getById( id ) {
		this.logger.startWith( { id } );

		return this.items.find( ( item ) => item.model.id === id );
	}

	getTotal() {
		let totalPriceOfAllItems = 0;

		this.items.forEach( ( item ) => {
			totalPriceOfAllItems += item.model.getTotal()
		} )

		return totalPriceOfAllItems.toFixed( 2 ).toString();
	}
}
