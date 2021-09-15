/**
 * @file: components/cart/data/add.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request add to cart from backend.
 */

/**
 * @memberOf components.cart.data
 */
export class Add extends $core.data.Command {
	static getName() {
		return 'Components/Cart/Data/Add';
	}

	getEndpoint() {
		return 'cart/addItem';
	}
}

export default Add;
