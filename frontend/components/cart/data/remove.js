/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request remove cart item from backend.
 */
export class Remove extends ( $flow.commandBases.CommandData ) {
	static getName() {
		return 'Components/Cart/Data/Remove';
	}

	getEndpoint() {
		return 'cart/removeItem';
	}
}
