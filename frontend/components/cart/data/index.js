/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request cart from backend.
 */

export class Index extends ( $flow.commandBases.CommandData ) {
	static getName() {
		return 'Components/Cart/Data/Index';
	}

	getEndpoint() {
		return 'cart/index';
	}
}

export { Add } from './add';
export { Remove } from './remove'
