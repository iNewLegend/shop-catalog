/**
 * @file: components/cart/data/index.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Get the catalog from the server and cache it.
 */

/**
 * @memberOf components.cart.data
 */
export class Index extends $core.data.Command {
	static getName() {
		return 'Components/Cart/Data/Index';
	}

	getEndpoint() {
		return 'cart/index';
	}
}

export { Add } from './add';
export { Remove } from './remove'
