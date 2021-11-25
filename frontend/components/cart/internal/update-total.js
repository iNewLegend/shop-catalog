/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Internal command for update total items in cart.
 */

/**
 * @memberOf components.cart.internal
 */
export class UpdateTotal extends ( $core.internal.Command ) {
	static getName() {
		return 'Components/Cart/Internal/UpdateTotal';
	}

	apply( args, options ) {
		// The command should update state only.
		const component = this.getController().getComponent(),
			totalPrice = component.model.getTotal(),
			totalPriceElement = component.elements.totalPrice();

		if ( totalPriceElement ) {
			totalPriceElement.innerText = totalPrice
		}
	}
}

export default UpdateTotal;
