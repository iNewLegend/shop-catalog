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
		const component = this.getController().getComponent();

		component.elements.totalPrice.element.innerText = component.model.getTotal();
	}
}

export default UpdateTotal;
