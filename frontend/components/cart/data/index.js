/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request cart from backend.
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
