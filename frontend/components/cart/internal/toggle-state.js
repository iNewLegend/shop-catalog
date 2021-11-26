/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Toggle cart state shown/hidden, used to update the cart about it own view state,
 * to allow it to manged by external sources.
 */

/**
 * @memberOf components.cart.internal
 */
export class ToggleState extends ( $core.internal.Command ) {
	static getName() {
		return 'Components/Cart/Internal/ToggleState';
	}

	apply( args ) {
		const component = this.getController().getComponent(),
			{ state = ! component.model.state } = args;

		component.model.state = state;
	}
}

export default ToggleState;
