/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Toggles the state.
 */

export class Toggle extends ( $flow.commandBases.CommandPublic ) {
	static getName() {
		return 'Components/Sidebar/Commands/Toggle';
	}

	apply( args ) {
		const model = this.getController().getModel();

		model.state = 'undefined' !== typeof args.state ? args.state : ! model.state;
	}
}
