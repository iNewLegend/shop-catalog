import ControllerBase from 'CORE/controllers/controller';
import * as commands from "./commands/";

/**
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {
	constructor() {
		super();

		$core.commands.onAfterAffect( 'Components/Cart/Item/Commands/Remove', 'Components/Cart/Commands/Remove' );
	}

	static getNamespace() {
		return 'Components/Cart'
	}

	static getName() {
		return 'Components/Cart/Controller';
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
