/**
 * @file: components/cart/data/remove.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request remove from backend.
 */

/**
 * @memberOf components.cart.data
 */
export class Remove extends $core.data.Command {
	static getName() {
		return 'Components/Cart/Data/Remove';
	}

	getEndpoint() {
		return 'cart/removeItem';
	}
}

export default Remove;
