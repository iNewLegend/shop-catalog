import * as commands from "./commands/";
import ControllerBase from "CORE/controllers/controller";

/**
 * @memberOf components.cart.item
 */
export class Controller extends ControllerBase /* $core.controllers.Controller */ { // TODO: Fix external.
	static getNamespace() {
		return 'Components/Cart/Item'
	}

	static getName() {
		return 'Components/Cart/Item/Controller';
	}

	getCommands() {
		return commands;
	}
}

export default Controller;
