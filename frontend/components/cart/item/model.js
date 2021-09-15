/**
 * @file: components/cart/item/model.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manges cart item unit.
 */

/**
 * @memberOf components.cart.item
 */
export default class Model extends ( $core.Model ) {
	static getName() {
		return 'Components/Cart/Item/Model';
	}

	id = this.number();

	name = this.string();

	price = this.number();

	amount = this.string();

	getTotal() {
		return this.amount * this.price;
	}
}
