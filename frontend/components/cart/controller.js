/**
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import * as commands from "./commands/";
import * as data from "./data/";
import * as internal from "./internal/";

/**
 * @memberOf components.cart
 */
export class Controller extends ( $core.controllers.Controller ) {
	static getName() {
		return 'Components/Cart/Controller';
	}

	getCommands() {
		return commands;
	}

	getData() {
		return data;
	}

	getInternal() {
		return internal;
	}

	setupHooks() {
		$core.commands.onAfterAffect(
			'Components/Cart/Item/Commands/Remove',
			'Components/Cart/Commands/Remove'
		);

		$core.commands.onAfter( 'Components/Cart/Commands/Remove', ( args ) => {
			this.getComponent().render();
		} )

		$core.internal.onAfter( 'Components/Cart/Internal/Add', ( args ) => {
			this.getComponent().render();
		} );
	}
}

export default Controller;
