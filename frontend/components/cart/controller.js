/**
 * @file: components/cart/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import ControllerBase from 'CORE/controllers/controller';
import * as commands from "./commands/";
import * as data from "./data/";

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

	getData() {
		return data;
	}
}

export default Controller;
