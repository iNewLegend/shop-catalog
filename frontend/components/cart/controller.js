/**
 * @file: components/cart/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages cart commands.
 */
import ControllerBase from 'CORE/controllers/controller';
import * as commands from "./commands/";
import * as data from "./data/";
import * as internal from "./internal/";

/**
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {
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

	getInternal() {
		return internal;
	}

	setupHooks() {
		$core.commands.onAfterAffect(
			'Components/Cart/Item/Commands/Remove',
			'Components/Cart/Commands/Remove'
		);

		$core.commands.onAfter( 'Components/Cart/Commands/Remove', ( args ) => {
			// TODO: The element should automatically know that he has been deleted and remove its own view.
			args.model._options.owner.remove();
		} )
	}
}

export default Controller;
