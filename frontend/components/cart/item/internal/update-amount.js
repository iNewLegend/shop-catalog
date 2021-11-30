/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: For each cart item update amount,sum in DOM.
 */

/**
 * @memberOf components.cart.item.internal
 */
export class UpdateAmount extends ( $core.internal.Command ) {
	static getName() {
		return 'Components/Cart/Item/Internal/UpdateAmount';
	}

	apply( args ) {
		const component = this.getController().getComponent(),
			{ amount, sum } = args;

		component.elements.amount.innerHTML = amount;
		component.elements.sum.innerHTML = (parseFloat( sum.toString() ).toFixed( 2 ));
	}
}

export default UpdateAmount;
