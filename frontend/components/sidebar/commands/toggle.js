/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Toggles the state.
 */

/* global $flow */

export class Toggle extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Sidebar/Commands/Toggle';
	}

	apply( args, options ) {
		const controller = $flow.managers.controllers.get( 'Components/Sidebar/Controller' ),
			model = controller.model;

		model.state = 'undefined' !== typeof args.state ? args.state : ! model.state;
	}
}
