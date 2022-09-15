/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: For each cart item update amount,sum in DOM.
 */
import $flow from "@appsflow/core";

export class UpdateAmount extends $flow.commandBases().CommandInternal {
	static getName() {
		return 'Components/Cart/Item/Internal/UpdateAmount';
	}

	apply( args, options ) {
		const { amount, component, sum } = args;

		// TODO: Check if this accepted in MVC rules.
		component.elements.amount.innerHTML = amount;
		component.elements.sum.innerHTML = (parseFloat( sum.toString() ).toFixed( 2 ));
	}
}

export default UpdateAmount;
