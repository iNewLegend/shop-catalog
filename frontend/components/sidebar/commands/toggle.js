/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Toggles the state.
 */

/**
 * @memberOf components.sidebar.commands
 */
export class Toggle extends ( $core.commands.Command ) {
	static getName() {
		return 'Components/Sidebar/Commands/Toggle';
	}

	apply( args ) {
		const model = this.getController().getModel();

		model.state = 'undefined' !== typeof args.state ? args.state : ! model.state;
	}
}
