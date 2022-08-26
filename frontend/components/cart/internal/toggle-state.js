/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Toggle cart state shown/hidden, used to update the cart about it own view state,
 * to allow it to manged by external sources.
 */

/* global $flow */

export class ToggleState extends ( $flow.commandBases.CommandInternal ) {
	static getName() {
		return 'Components/Cart/Internal/ToggleState';
	}

	apply( args, options ) {
		const controller = $flow.managers.controllers.get( 'Components/Cart/Controller' ),
			{ state = ! controller.model.state } = args;

		controller.model.state = state;
	}
}

export default ToggleState;
