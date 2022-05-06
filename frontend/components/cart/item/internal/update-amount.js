/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: For each cart item update amount,sum in DOM.
 */

export class UpdateAmount extends ( $flow.commandBases.CommandInternal ) {
	static getName() {
		return 'Components/Cart/Item/Internal/UpdateAmount';
	}

	apply( args ) {
		const { amount, component, sum } = args;

		component.elements.amount.innerHTML = amount;
		component.elements.sum.innerHTML = (parseFloat( sum.toString() ).toFixed( 2 ));
	}
}

export default UpdateAmount;
