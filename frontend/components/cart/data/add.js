/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Request add cart item from backend.
 */
import $flow from "@appsflow/core";

export class Add extends $flow.commandBases().CommandData {
	static getName() {
		return 'Components/Cart/Data/Add';
	}

	getEndpoint() {
		return 'cart/addItem';
	}
}
