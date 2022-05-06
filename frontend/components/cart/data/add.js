/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request add cart item from backend.
 */

/**
 * @memberOf components.cart.data
 */
export class Add extends ($flow.data.Command) {
	static getName() {
		return 'Components/Cart/Data/Add';
	}

	getEndpoint() {
		return 'cart/addItem';
	}
}

export default Add;
